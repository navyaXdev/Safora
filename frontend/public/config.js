
const API_URL = 'http://localhost:3000/predict'

function getRiskTier(riskScore){
    if (riskScore >= 0.7) return 'high';
    if (riskScore >= 0.4) return 'medium';
    if(riskScore>=0.1) return 'low';
    return 'safe';
}

const TIER_CONFIG =  {
    high:   { color: '#ef4444', text: '!' },
    medium: { color: '#f97316', text: '?' },
    low:  { color: "#eab308", text: "\u00b7" },
    safe:    { color: '#22c55e', text: '✓' },
  };

