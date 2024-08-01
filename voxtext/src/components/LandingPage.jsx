import React, { useEffect, useRef, useState } from "react";
import bckimg from "../assets/background1.jpg";

export default function LandingPage(props) {
  const backgroundimg = bckimg;

  const { setAudioStream, setFile } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";

  //Start recording
  async function startRecording() {
    let tempStream;

    console.log("Start recording");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }
    setRecordingStatus("recording");

    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  //Stop recording
  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <main className="relative pb-20 text-center flex-1  flex flex-col gap-1  justify-center">
      <div className="absolute bottom-10 left-12">
        <h3 className="text-2xl font-medium text-center">
          Record<span className="text-sky-100"> &rarr; </span>Transcribe
          <span className="text-sky-100"> &rarr; </span>Translate
        </h3>

        <h1 className="font-semibold text-9xl">
          vox<span className="text-sky-600 blod">TEXT</span>
        </h1>
      </div>

      <div
        className="absolute bottom-10 right-0 box-border p-4  pt-6 pr-12 pl-8 bg-white bg-opacity-100 rounded-tl-lg "
        style={{ borderTopLeftRadius: "1rem" }}>
        <p className="text-base">
          <label className="text-sky-500 cursor-pointer hover:text-sky-700 duration-200">
            Upload{" "}
            <input
              onChange={(e) => {
                const tempFile = e.target.files[0];
                setFile(tempFile);
              }}
              className="hidden"
              type="file"
              accept=".mp3,.wave"
            />
          </label>
          a MP3 file <br />
          Or
        </p>
        <button
          onClick={
            recordingStatus === "recording" ? stopRecording : startRecording
          }
          className={
            " flex items-center justify-between w-128 max-w-full my-2 px-2 py-3 rounded-xl pr-7 duration-100 bg-opacity-100 pl-4" +
            (recordingStatus === "inactive" ? " bg-sky-600" : " bg-slate-200")
          }>
          <p
            className={
              recordingStatus === "inactive" ? "text-sky-100" : "text-red-600"
            }>
            {recordingStatus === "inactive" ? "Record" : "Stop recording..."}
          </p>

          <div className="flex items-center gap-2">
            {duration !== 0 && <p className="text-sm">{duration}s </p>}
            <i
              className={
                "fa-solid fa-microphone" +
                (recordingStatus === "recording" ? " text-red-600 fa-fade" : "")
              }></i>
          </div>
        </button>
        <p className="italic text-slate-600 mb-7">Free now free forever</p>
      </div>
    </main>
  );
}
