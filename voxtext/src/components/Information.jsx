import React, { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

//This is the page showiing the transcription about your voice (voice --> text)
export default function Information(props) {
  const { output } = props;
  console.log(output);
  const [tab, setTab] = useState("transcription");

  return (
    <main className="pb-20 text-center flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap text-white">
        Your <span className="text-sky-600 font-bold">Transcription</span>
      </h1>

      <div className="grid mx-auto bg-white shadow-lg rounded-full overflow-hidden items-center">
        <button
          onClick={() => {
            setTab("transcription");
          }}
          className={
            "px-4 py-1 font-medium duration-200 " +
            (tab === "transcription"
              ? "bg-sky-600 text-white"
              : "text-sky-600 hover:text-sky-600")
          }>
          Transcription
        </button>
        {/* <button
          onClick={() => {
            setTab('translation');
          }}
          className={
            'px-4 py-1 font-medium duration-200 ' +
            (tab === 'translation'
              ? 'bg-blue-400 text-white'
              : 'text-blue-400 hover:text-blue-600')
          }>
          Translation
        </button> */}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mt-3 mx-auto max-w-4xl w-1/3">
        <div className="text-2xl">
          {" "}
          {tab === "transcription" ? (
            <Transcription output={output} /> // show to the output
          ) : (
            <Translation />
          )}
        </div>
      </div>
    </main>
  );
}
