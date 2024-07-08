import React, { useEffect, useRef, useState } from "react"; // Import React and useState hook
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./Utils/presets";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const isAudioAvailable = file || audioStream;

  function handleAudiReset() {
    setFile(null);
    setAudioStream(null);
    console.log("User click RESET buttton");
  }

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./Utils/whisper.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }
    const onMessageRecieved = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("DOWNLOADING");
          break;
        case "LOADING":
          setLoading(true);
          console.log("LOADING");
          break;
        case "RESULT":
          setOutput(e.data.results);
          console.log(e.data.results);
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageRecieved);

    return () =>
      worker.current.removeEventListener("message", onMessageRecieved);
  });

  async function readAudioFrom(file) {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const respose = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(respose);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleFormSubmission() {
    console.log("handle form submission INTO");
    if (!file && !audioStream) {
      return;
    }
    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = "openai/whisper-tiny.en";

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  function printConsole() {
    console.log("Here the function is working");
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />

        {output ? (
          <Information output={output} />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            handleAudiReset={handleAudiReset}
            handleFormSubmission={handleFormSubmission}
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
