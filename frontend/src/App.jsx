import { useEffect, useState } from "react"
import SaforaDashboard from "./components/SaforaDashboard";
import ShowUrlCard from "./components/ShowUrlCard";
import SpottedAThreadCard from "./components/SpottedAThreadCard";
import AboutPageCard from "./components/AboutPageCard";

function App() {


  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTheUrl, setShowTheUrl] = useState(false);
  const [showAboutPage,setShowAboutPage] = useState(false);
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
    fetchUrlScanResult();
    loadTheme();
  }, [])

  async function fetchUrlScanResult(){
    const [tab] = await chrome.tabs.query({
      active:true,
      currentWindow:true
    })

    chrome.storage.local.get("scanResults", ({scanResults={}}) => {
      if (scanResults[tab.id]) {
        const newData = scanResults?.[tab.id];
        setCurrentPageData(newData);
      }
    })

    
  }

  async function loadTheme(){
    
    const {darkTheme = true} = await chrome.storage.local.get("darkTheme")
    setIsDarkMode(darkTheme);
  }


  const shouldShowThreatWarning = !showTheUrl && currentPageData.risk_score >= 0.1;



  return (


    <div className=" " >
      {!showAboutPage && !shouldShowThreatWarning && !showTheUrl && <SaforaDashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setShowTheUrl={setShowTheUrl} setShowAboutPage={setShowAboutPage} />}

      {!showAboutPage && showTheUrl && <ShowUrlCard setShowTheUrl={setShowTheUrl} isDarkMode={isDarkMode} manualScanData={manualScanData} setManualScanData={setManualScanData} />}

      {!showAboutPage && shouldShowThreatWarning && <SpottedAThreadCard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setShowTheUrl={setShowTheUrl} riskScore={currentPageData.risk_score} setShowAboutPage={setShowAboutPage} />}

      {showAboutPage && <AboutPageCard isDarkMode={isDarkMode} setShowAboutPage={setShowAboutPage} />}



    </div>

  )
}

export default App