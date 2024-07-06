import React, { useEffect, useState } from "react"; // Import React and useState hook
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(null);

  const isAudioAvailable = file || audioStream;

  function handleAudiReset() {
    setFile(null);
    setAudioStream(null);
    console.log("User click RESET buttton");
  }

  function printConsole() {
    console.log("Here the function is working");
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />

        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            handleAudiReset={handleAudiReset}
            file={file}
            audioStream={audioStream}></FileDisplay>
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
