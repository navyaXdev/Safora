from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import math
from collections import Counter
from phishing_rules_fixed_v2 import get_reasons
import os

app = Flask(__name__)
CORS(app)

# Loaded once at startup — not inside predict(). See train.py comment
# for why this matters (retraining vs loading a saved model).
model = joblib.load('model.pkl') # copied model.pkl to this folder for a good flow in deployment

feature_cols = ['url_length', 'num_dots', 'has_https', 'has_ip',
                'num_subdirs', 'num_params', 'suspicious_words',
                'suspicious_tld', 'special_char_count',
                'digits_count', 'entropy']

suspicious = ['login', 'verify', 'secure', 'account', 'update',
              'bank', 'confirm', 'signin', 'password', 'free',
              'lucky', 'winner', 'support', 'service', 'submit',
              'authenticate', 'validation', 'click', 'alert',
              'suspend', 'recover', 'unlock', 'limited', 'urgent']

suspicious_tlds = ['tk', 'pw', 'xyz', 'top', 'gq', 'ml', 'cf', 'ga']

# Duplicated from train.py deliberately — importing train.py directly
# would execute its full training pipeline on every app.py startup.
# Keep both copies in sync if a feature calculation changes.
def calculate_entropy(url):
    counts = Counter(url)
    length = len(url)
    return -sum((c/length) * math.log2(c/length) for c in counts.values())

def extract_features(url):
    features = {}
    url_lower = url.lower()
    features['has_https'] = int(url.startswith('https'))
    features['num_dots'] = url.count('.')
    features['url_length'] = len(url)
    features['digits_count'] = sum(char.isdigit() for char in url)
    features['special_char_count'] = sum(char in '-_@?=&' for char in url)
    features['has_ip'] = int(bool(re.search(r'\d+\.\d+\.\d+\.\d+', url)))
    features['num_subdirs'] = url.count('/') - 2
    features['suspicious_words'] = sum(word in url_lower for word in suspicious)
    features['num_params'] = url.count('?') + url.count('&')
    features['suspicious_tld'] = int(url.split('.')[-1].split('/')[0] in suspicious_tlds)
    features['entropy'] = calculate_entropy(url)
    return features

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(silent=True)
    if not data or 'url' not in data:
        return jsonify({"error": "Missing 'url' field in request body"}), 400

    url = data['url']
    if not isinstance(url, str) or not url.strip():
        return jsonify({"error": "'url' must be a non-empty string"}), 400

    features = extract_features(url)
    X = [[features[col] for col in feature_cols]]
    risk_score = float(model.predict_proba(X)[0][1])
    label = "phishing" if risk_score >= 0.5 else "legitimate"
    reasons = get_reasons(url)

    return jsonify({
        "risk_score": round(risk_score, 3),
        "label": label,
        "reasons": reasons
    })


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
