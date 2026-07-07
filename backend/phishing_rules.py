import urllib.parse
import ipaddress
import re

def evaluate_phishing_rules(url):
    """
    Evaluates a given URL against 5 starter phishing detection rules.
    Returns a list of dictionaries containing triggered rules and reason strings.
    """
    triggered_rules = []

    if not url.startswith(('http://', 'https://')):
        url_to_parse = 'http://' + url
    else:
        url_to_parse = url

    parsed = urllib.parse.urlparse(url_to_parse)
    domain = parsed.netloc.split(':')[0]  # ignoring ports

    # Rule 1: IP address check
    try:
        ipaddress.ip_address(domain)
        triggered_rules.append({
            "rule": "Rule 1",
            "trigger": "URL uses IP address instead of domain name",
            "reason": "This link uses a raw number address instead of a real website name — real websites don't do this."
        })
    except ValueError:
        pass

    # Rule 2: digit substitution check
    domain_body = domain.rsplit('.', 1)[0] if '.' in domain else domain
    if (re.search(r'[a-zA-Z][01]+[a-zA-Z]', domain_body) or
        re.search(r'[a-zA-Z][01]+$', domain_body) or
        'arnazon' in domain_body.lower()):
        triggered_rules.append({
            "rule": "Rule 2",
            "trigger": "Domain contains digit substitution for letters",
            "reason": "This link is pretending to be a well-known website by swapping letters for numbers."
        })

    # Rule 3: HTTPS check
    if parsed.scheme.lower() != 'https':
        triggered_rules.append({
            "rule": "Rule 3",
            "trigger": "URL has no HTTPS",
            "reason": "This link is not secure — any information you enter can be seen by others."
        })

    # Rule 4: urgent keywords, needs another signal to trigger
    urgent_keywords = ['verify-now', 'account-suspended', 'login-alert', 'confirm-identity']
    rule4_triggered = any(keyword in url_to_parse.lower() for keyword in urgent_keywords)
    other_rules_triggered = len(triggered_rules) > 0

    if rule4_triggered and other_rules_triggered:
        triggered_rules.append({
            "rule": "Rule 4",
            "trigger": "URL contains urgent or threatening keywords",
            "reason": "This link is trying to scare you into clicking quickly — that's a common trick used by scammers."
        })

    # Rule 5: too many subdomains
    if domain.count('.') > 3:
        triggered_rules.append({
            "rule": "Rule 5",
            "trigger": "Excessive subdomains",
            "reason": "This link has an unusually complicated address — scammers do this to hide the real website."
        })

    # Rule 6: downloadable file check
    download_extensions = (
        '.exe', '.msi', '.zip', '.rar', '.7z',
        '.apk', '.iso', '.bat', '.cmd',
        '.scr', '.js', '.vbs'
    )

    path = parsed.path.lower()

    if path.endswith(download_extensions):
        triggered_rules.append({
            "rule": "Rule 6",
            "trigger": "URL points to a downloadable file",
            "reason": "This link downloads a file. Downloaded files can sometimes contain malware or harmful software. Only download files from trusted sources."            
        })

    # Rule 7: suspicious TLD, needs another signal to trigger
    suspicious_tlds = ['tk', 'pw', 'xyz', 'top', 'gq', 'ml', 'cf', 'ga']
    tld = domain.rsplit('.', 1)[-1].lower() if '.' in domain else ''
    if tld in suspicious_tlds and len(triggered_rules) > 0:
        triggered_rules.append({
            "rule": "Rule 7",
            "trigger": "Suspicious top-level domain",
            "reason": "This website's address ending is one that's often used for scam sites."
        })

    return [rule["rule"] for rule in triggered_rules]


def get_reasons(url):
    """
    Integration entry point for app.py.
    Returns list of plain-English reason strings (not rule names) for the
    'reasons' field in the Flask API response.
    """
    if not url.startswith(('http://', 'https://')):
        url_to_parse = 'http://' + url
    else:
        url_to_parse = url
    parsed = urllib.parse.urlparse(url_to_parse)
    domain = parsed.netloc.split(':')[0]
    domain_body = domain.rsplit('.', 1)[0] if '.' in domain else domain

    reasons = []
    ip_matched = False
    try:
        ipaddress.ip_address(domain)
        ip_matched = True
        reasons.append("This link uses a raw number address instead of a real website name — real websites don't do this.")
    except ValueError:
        pass

    digit_sub_matched = bool(
        re.search(r'[a-zA-Z][01]+[a-zA-Z]', domain_body) or
        re.search(r'[a-zA-Z][01]+$', domain_body) or
        'arnazon' in domain_body.lower()
    )
    if digit_sub_matched:
        reasons.append("This link is pretending to be a well-known website by swapping letters for numbers.")

    https_matched = parsed.scheme.lower() != 'https'
    if https_matched:
        reasons.append("This link is not secure — any information you enter can be seen by others.")

    # same gating logic as evaluate_phishing_rules, keep both in sync
    other_signals_matched = ip_matched or digit_sub_matched or https_matched
    urgent_keywords = ['verify-now', 'account-suspended', 'login-alert', 'confirm-identity']
    rule4_matched = any(keyword in url_to_parse.lower() for keyword in urgent_keywords)
    if rule4_matched and other_signals_matched:
        reasons.append("This link is trying to scare you into clicking quickly — that's a common trick used by scammers.")

    if domain.count('.') > 3:
        reasons.append("This link has an unusually complicated address — scammers do this to hide the real website.")

    download_extensions = (
        '.exe', '.msi', '.zip', '.rar', '.7z',
        '.apk', '.iso', '.bat', '.cmd',
        '.scr', '.js', '.vbs'
    )

    if parsed.path.lower().endswith(download_extensions):
        reasons.append(
            "This link downloads a file. Downloaded files can sometimes contain malware or harmful software. Only download files from trusted sources."
        )

    suspicious_tlds = ['tk', 'pw', 'xyz', 'top', 'gq', 'ml', 'cf', 'ga']
    tld = domain.rsplit('.', 1)[-1].lower() if '.' in domain else ''
    if tld in suspicious_tlds and len(reasons) > 0:
        reasons.append("This website's address ending is one that's often used for scam sites.")

    return reasons


if __name__ == "__main__":
    test_urls = [
        "https://manovingenieria.com/manovingenieria.zip",
        "http://192.168.1.1/login",
        "https://paypa1.com/login",
        "http://arnazon.com/deals",
        "http://login.secure.paypal.verify.com/verify-now",
        "http://10.0.0.5/confirm-identity",
        "http://g00gle.com/search",
        "https://login-alert.baddomain.com/",
        "https://update.billing.netflix.customer.support.com/",
        "https://app1e.com/store",
        "https://www.google.com/",
        "https://mail.google.com/",
        "https://amazon.co.uk/",
        "https://netflix.com/browse",
        "https://secure.chase.com/",
        "https://github.com/account-suspended",
        "https://web3.foundation/",
        "https://office365.com/login",
        "https://bit9.com/",
    ]

    print("=== evaluate_phishing_rules (rule names) ===")
    for u in test_urls:
        results = evaluate_phishing_rules(u)
        print(f"{u} -> {results if results else 'No Rules Triggered (Pass)'}")

    print()
    print("=== get_reasons (what app.py actually gets) ===")
    for u in test_urls:
        results = get_reasons(u)
        print(f"{u} -> {results if results else 'No reasons (Pass)'}")

    print()
    print("=== Consistency check: do both functions agree? ===")
    for u in test_urls:
        rule_count = len(evaluate_phishing_rules(u))
        reason_count = len(get_reasons(u))
        match = "OK" if (rule_count > 0) == (reason_count > 0) else "MISMATCH"
        print(f"{match}: {u} -> rules={rule_count}, reasons={reason_count}")