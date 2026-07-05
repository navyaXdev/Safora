import { useEffect, useState } from "react"
import SaforaDashboard from "./components/SaforaDashboard";
import ShowUrlCard from "./components/ShowUrlCard";
import SpottedAThreadCard from "./components/SpottedAThreadCard";

function App() {


  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTheUrl, setShowTheUrl] = useState(false);
  const [currentPageData, setCurrentPageData] = useState({
    risk_score: 0,
    label: "safe",
    reasons: ["everything is good", "no malware detected"]
  });
  const [manualScanData, setManualScanData] = useState({
    risk_score: 0,
    label: "safe",
    reasons: ["everything is good", "no malware detected"]
  });

  useEffect(() => {
    chrome.storage.local.get("latestData", (result) => {
      if (result.latestData) {
        const newData = result.latestData;
        setCurrentPageData(newData);
      }
    })
  }, [])

  const shouldShowThreatWarning = !showTheUrl && currentPageData.risk_score >= 0.1;



  return (


    <div>
      {!shouldShowThreatWarning && !showTheUrl && <SaforaDashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setShowTheUrl={setShowTheUrl} />}

      {showTheUrl && <ShowUrlCard setShowTheUrl={setShowTheUrl} isDarkMode={isDarkMode} manualScanData={manualScanData} setManualScanData={setManualScanData} />}

      {shouldShowThreatWarning && <SpottedAThreadCard isDarkMode={isDarkMode} setShowTheUrl={setShowTheUrl} riskScore={currentPageData.risk_score} />}



    </div>

  )
}

export default App