import { useEffect, useState } from "react"
import SaforaDashboard from "./components/SaforaDashboard";
import ShowUrlCard from "./components/ShowUrlCard";
import SpottedAThreadCard from "./components/SpottedAThreadCard";

function App() {

  
  // const [isLoading, setIsLoading] = useState();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTheUrl, setShowTheUrl] = useState(false);
  const [showThreatDetectWarning,setShowThreatDetectWarning] = useState(false);
  const [isManualCheck,setIsMaualCheck] = useState(false);
  const [data, setData] = useState({
        risk_score: 0,
        label: "safe",
        reasons: ["everything is good", "no malware detected"]
    });

  useEffect(()=>{
    chrome.storage.local.get("latestData",(result)=>{
      if(result.latestData){
        const newData = result.latestData;
        setData(newData);
        setIsMaualCheck(false);
        if(newData.risk_score>=0.4) setShowThreatDetectWarning(true);
      }
    })
  },[])

  useEffect(()=>{

      console.log("I'm running and the  data is:",data)
      console.log("the manual check is:",isManualCheck);
      console.log("The showThreadwarning is: ",showThreatDetectWarning)
  },[data,isManualCheck,showThreatDetectWarning])


  return (


    <div>
      {!showTheUrl && !showThreatDetectWarning && <SaforaDashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setShowTheUrl={setShowTheUrl} />}

      {showTheUrl && <ShowUrlCard setShowTheUrl={setShowTheUrl} isDarkMode={isDarkMode}  setShowThreatDetectWarning={setShowThreatDetectWarning} setIsMaualCheck={setIsMaualCheck} data={data} setData={setData}/> }
      
      {!isManualCheck && showThreatDetectWarning && <SpottedAThreadCard isDarkMode={isDarkMode}  setShowThreatDetectWarning={setShowThreatDetectWarning}  />}

     

    </div>

  )
}

export default App