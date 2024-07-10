import React from "react";
import Header from "./Header";

export default function FileDisplay(props) {
  const { handleAudiReset, file, audioStream, handleFormSubmission } = props;

  return (
    <>
      <main className=" flex items-center justify-center min-h-screen ">
        <div className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg w-128 h-96 max-w-full mx-auto text-center mt-5">
          <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl w-full">
            Your <span className="text-blue-400 font-bold">File</span>
          </h1>

          <div className="flex flex-col text-left my-4 mx-5 mt-12">
            <h3 className="font-semibold">Name:</h3>
            <p>{file ? file?.name : "Custom Audio"}</p>
          </div>

          <div className="flex pt-12 mt-12 mx-5 justify-between gap-4">
            <button
              onClick={handleAudiReset}
              className="bg-red-900 px-4 py-2 rounded-lg text-red-100 w-56 hover:text-red-900 hover:bg-slate-300">
              Reset
            </button>
            <button
              onClick={handleFormSubmission}
              className="bg-sky-900 px-4 py-2 rounded-lg text-sky-100 w-56 hover:text-sky-900 hover:bg-slate-400 ">
              <p>Transcribe</p>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
