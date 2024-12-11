import React, { useEffect, useRef, useState } from "react"; // Import React and useState hook
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./Utils/presets";
import LandingPage from "./components/LandingPage";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const isAudioAvailable = file || audioStream;

  //clear audio reseting getter filedisplay
  function handleAudiReset() {
    setFile(null);
    setAudioStream(null);
    console.log("User click RESET button");
  }

  const worker = useRef(null);

  useEffect(() => {
    //creating new worker if not avaliable
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./Utils/whisper.worker.js", import.meta.url), // Loading your file for the tast
        {
          type: "module", // when to run background script separately from the main page
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
          //updateing success status
        case "SUCCESS":
          setLoading(true);
          console.log("SUCCESS");
          break;


        case "RESULT":
          setOutput(e.data.results);
          console.log(e.data.results);
          break;

        case "RESULT_PARTIAL":
          setOutput(e.data.results);
          console.log("RESULT_PARTIAL"+ e.data.results);
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

  //const x= file.arrayBuffer()

  //web Audio API for audio data processing
  async function readAudioFrom(file) {
    const sampling_rate = 16000;  //16kHz
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer(); //for binary data processing ///await for the file if it too large to load
    const decoded = await audioCTX.decodeAudioData(response); //decording the audio data using bufferarry and audioCTX frame
    const audio = decoded.getChannelData(0);
    return audio;
  }

  //Handle form submission and start whisper worker
  async function handleFormSubmission() {
    console.log("handle form submission INTO");

    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = "openai/whisper-tiny.en";

    worker.current.postMessage({
      //passing the audio and model for the whisperworker.js
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
    console.log("Pass the model information for the whisper worker");
  }



  function printConsole() {
    console.log("Here the function is working");
  }

  // https://images.unsplash.com/photo-1652909865322-1515df3a2efd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

  const backgroundImageStyle = {
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(243, 246, 244, 0.1)), url('https://images.unsplash.com/photo-1652909865322-1515df3a2efd?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "97%",
    marginTop: "1.5%",
    height: "710px",
    borderRadius: "10px",
  };

  return (
    <div
      className="flex flex-col max-w-[100%] mx-auto w-full"
      style={backgroundImageStyle}>
      <section className="min-h-screen flex flex-col">
        <Header />

        {output ? (
          <Information output={output} /> //Output transfering here, get from whisper => To transcription (child) => To Information (Parent)
        ) : loading ? (
          <Transcribing /> //No props transfering
        ) : isAudioAvailable ? (
          <FileDisplay
            handleAudiReset={handleAudiReset}
            handleFormSubmission={handleFormSubmission}
            file={file}
            audioStream={audioStream}></FileDisplay>
        ) : (
          <LandingPage setFile={setFile} setAudioStream={setAudioStream} />
        )}
        {printConsole()}
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
