import { useEffect, useState } from "react"
import SaforaDashboard from "./components/SaforaDashboard";
import ShowUrlCard from "./components/ShowUrlCard";

function App() {

  // const [isLoading, setIsLoading] = useState();
  const [isDarkMode, setIsDarkMode] = useState(true);






  const [showTheUrl, setShowTheUrl] = useState(false);
  return (


    <div>
      {!showTheUrl && <SaforaDashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setShowTheUrl={setShowTheUrl} />}
      {showTheUrl && <ShowUrlCard setShowTheUrl={setShowTheUrl} isDarkMode={isDarkMode} />}

     

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





    // </div>
  )
}

export default App