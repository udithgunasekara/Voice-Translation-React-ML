import React from "react";

export default function FileDisplay(props) {
  const { handleAudiReset, file, audioStream, handleFormSubmission } = props;

  return (
    <main className="pb-20 text-center flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center w-72 max-w-full mx-auto">
      <h1 h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Your <span className="text-blue-400 blod">File</span>
      </h1>

      <div className="flex flex-col text-left my-4">
        <h3 className="font-semibold">Name: </h3>
        <p>{file ? file?.name : "custom content"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleAudiReset}
          className="text-slate-400 hover:text-blue-600">
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="specialBtn px-4 py-2 rounded-lg text-blue-400">
          <p>Transcribe </p>
        </button>
      </div>
    </main>
  );
}
