import { useEffect, useState } from "react"
import SaforaDashboard from "./components/SaforaDashboard";
import ShowUrlCard from "./components/ShowUrlCard";

function App() {

  // const [isLoading, setIsLoading] = useState();
  // const [url,setUrl] = useState("");
  // const [data,setData] = useState({
  //   risk_score: 0,
  //   label: "safe",
  //   reasons: ["everything is good", "no malware detected"]
  // });
  // const [dataReceived,setDataReceived] = useState(false);
  // const [isValidUrl,setIsValidUrl] = useState(null);
  // const[maxLengthExceeded,setMaxLengthExceeded] = useState(false);
  

  // const handleCheckLink = async () => {
  //   try {
  //     const valid = validateUrl(url);
  //     setIsValidUrl(valid);
  //     if(valid===false) return;
  //     setIsLoading(true);
  //     console.log("Sending data to the backend")
  //     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/predict`,{
  //       method:'POST',
  //       headers:{
  //         "Content-Type":"application/json"
  //       },
  //       body:JSON.stringify({url})
  //     })
  //     const data = await response.json();
  //     setData(data)
  //     setDataReceived(true)
  //     console.log("The data was sent to the backend and in response we got: ", data);
  //     console.log("The url is: ",url);
  //   } catch (error) {
  //     console.error("post request failed!",error)
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // const handleChange = (e)=>{
  //   setUrl(e.target.value);
  //   if(maxLengthExceeded && e.target.value.length<=2000) setMaxLengthExceeded(false);
  //   if(e.target.value.length>2000) setMaxLengthExceeded(true)
  // }

  // const validateUrl = (value)=>{
  //   try {
  //     new URL(value);
  //     return true;
  //   } catch (error) {
  //     return false
  //   }
  // }

  // const getRiskStyles = (riskScore) => {
  //   if (riskScore >= 0.7) {
  //     return {
  //       bg: "bg-red-500/10 border-red-500/30",
  //       text: "text-red-400",
  //       badge: "bg-red-500/20 text-red-300 border-red-500/40",
  //       label: "High Risk"
  //     };
  //   }
  //   if (riskScore >= 0.4) {
  //     return {
  //       bg: "bg-orange-500/10 border-orange-500/30",
  //       text: "text-orange-400",
  //       badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  //       label: "Medium Risk"
  //     };
  //   }
  //   if (riskScore >= 0.1) {
  //     return {
  //       bg: "bg-yellow-500/10 border-yellow-500/30",
  //       text: "text-yellow-400",
  //       badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  //       label: "Low Risk"
  //     };
  //   }
  //   return {
  //     bg: "bg-emerald-500/10 border-emerald-500/30",
  //     text: "text-emerald-400",
  //     badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  //     label: "Safe"
  //   };
  // };

  // const styles = getRiskStyles(data.risk_score);
  const [showTheUrl,setShowTheUrl] = useState(false);
  return (
   

    <div>
      {!showTheUrl && <SaforaDashboard setShowTheUrl={setShowTheUrl} />}
      {showTheUrl && <ShowUrlCard  />}

    </div>

    // <div className="w-80 bg-zinc-900 text-zinc-100 p-4 font-sans">
    //   <h1 className="flex items-center gap-2 text-base font-semibold mb-3 ">
    //     <img className="w-12 h-12" src="images/image2.png" alt="safora-logo" /> Safora
    //   </h1>

    //   <p className="text-xs text-zinc-400 mb-2 ">
    //     Paste a link to check it before you click.
    //   </p>

    //   {isValidUrl===false && <div className="show-error mb-2 text-xs text-red-400">* Please enter a valid url</div>}
    //   {maxLengthExceeded && <div className="show-error mb-2 text-xs text-red-400">* Please enter a shorter url</div>}


    //   <textarea
    //   onChange={handleChange}
    //   value={url}
    //     placeholder="https://example.com/suspicious-link"
    //     className="w-full min-h-17.5 resize-y rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    //   />

    //   <button
    //     onClick={handleCheckLink}
    //     disabled={isLoading}
    //     className="mt-3 w-full rounded-lg cursor-pointer bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95 disabled:active:scale-100"
    //   >
    //     {isLoading ? "Checking..." : "Check this link"}
    //   </button>

    //   {dataReceived && (
    //     <div className={`mt-4 rounded-xl border p-3.5 transition-all duration-300 ${styles.bg}`}>
    //       <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-2.5">
    //         <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Analysis Result</span>
    //         <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${styles.badge}`}>
    //           {styles.label}
    //         </span>
    //       </div>

    //       <div className="flex justify-between items-baseline mb-3">
    //         <span className="text-xs text-zinc-400">Risk Score</span>
    //         <span className={`text-xl font-bold tracking-tight ${styles.text}`}>
    //           {Math.round(data.risk_score * 100)}%
    //         </span>
    //       </div>

    //       {data.reasons && data.reasons.length > 0 && (
    //         <div className="space-y-1.5">
    //           <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">Details:</span>
    //           <ul className="space-y-1">
    //             {data.reasons.map((reason, index) => (
    //               <li key={index} className="text-xs text-zinc-300 flex items-start  gap-1.5 leading-relaxed">
    //                 <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500 translate-y-0.5`} />
    //                 <p className=" flex justify-center items-center" >

    //                 {reason}
    //                 </p>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </div>
  )
}

export default App