import { pipeline, env } from "@xenova/transformers";
env.allowLocalModels = false; //disble remote models
import { MessageTypes } from "./presets";

class MyTranscriptionPipeline {
  static task = "automatic-speech-recognition"; // getting AutomaticSpeechRecognitionPipeline
  static model = "openai/whisper-tiny.en";
  static instance = null;
  //fin
  static async getInstance(progress_callback = null) {
    //using singleton pattern create pipeLine instance. For increase effececy
    console.log("INTO pipe creation");
    if (this.instance === null) {
      this.instance = await pipeline(this.task, null, { progress_callback });
    }
    console.log("creating new instance without model specification");
    return this.instance;
  }

}

let x=0;



// 1
self.addEventListener("message", async (event) => {
  //Web Worker
  const { type, audio } = event.data;
  if (type === MessageTypes.INFERENCE_REQUEST) {
    //controller unit. worker catching and handling
    await transcribe(audio);
  }
});

function sendLoadingMessage(status) {
  self.postMessage({
    type: MessageTypes.LOADING,
    status,
  });
}

//creating success msg
function sendSuccessMessage(status) {
  self.postMessage({
    type: MessageTypes.SUCCESS,
    status,
  });
}


async function transcribe(audio) {
  sendLoadingMessage("loading"); // send loading message to the app for recongnition

  let pipeline;

  try {
    console.log("INTO trascribe pipe")
    pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback); //----------------------------
    console.log("Taken down the pipline downloading");
  } catch (err) {
    console.log(err.message);
  }

  sendSuccessMessage("success");

  const stride_length_s = 5;

  const generationTracker = new GenerationTracker(pipeline, stride_length_s);
  await pipeline(audio, {
    top_k: 0,
    do_sample: false,
    chunk_length: 30,
    stride_length_s,
    return_timestamps: true,
    callback_function:
      generationTracker.callbackFunction.bind(generationTracker),
    chunk_callback: generationTracker.chunkCallback.bind(generationTracker),
  });
  generationTracker.sendFinalResult();
}




async function load_model_callback(data) { //what is the data?
  const { status } = data;
  if (status === "progress") {
    const { file, progress, loaded, total } = data;
    sendDownloadingMessage(file, progress, loaded, total);
  }
}


async function sendDownloadingMessage(file, progress, loaded, total) {
  self.postMessage({
    type: MessageTypes.DOWNLOADING,
    file,
    progress,
    loaded,
    total,
   
  },
  console.log("Download Count: "+ x++ )
);
}
//----------------------------------------------------------------------------------------------------------------------------------------

class GenerationTracker {
  constructor(pipeline, stride_length_s) {
    this.pipeline = pipeline;
    this.stride_length_s = stride_length_s;
    this.chunks = [];
    this.time_precision =
      pipeline?.processor.feature_extractor.config.chunk_length /
      pipeline.model.config.max_source_positions;
    this.processed_chunks = [];
    this.callbackFunctionCounter = 0;
  }

  
  sendFinalResult() {
    self.postMessage({ type: MessageTypes.INFERENCE_DONE }); // out
  }

  //fin
  callbackFunction(beams) {
    this.callbackFunctionCounter += 1;
    if (this.callbackFunctionCounter % 10 !== 0) {
      return;
    }

    const bestBeam = beams[0];
    let text = this.pipeline.tokenizer.decode(bestBeam.output_token_ids, {
      skip_special_tokens: true,
    });

    const result = {
      text,
      start: this.getLastChunkTimestamp(),
      end: undefined,
    };

    createPartialResultMessage(result);
  }

  //fin
  chunkCallback(data) {
    this.chunks.push(data);
    const [text, { chunks }] = this.pipeline.tokenizer._decode_asr(
      this.chunks,
      {
        time_precision: this.time_precision,
        return_timestamps: true,
        force_full_sequence: false,
      }
    );

    this.processed_chunks = chunks.map((chunk, index) => {
      return this.processChunk(chunk, index);
    });

    createResultMessage(
      this.processed_chunks,
      false,
      this.getLastChunkTimestamp()
    );
  }

  getLastChunkTimestamp() {
    if (this.processed_chunks.length === 0) {
      return 0;
    }
  }

  processChunk(chunk, index) {
    const { text, timestamp } = chunk;
    const [start, end] = timestamp;

    return {
      index,
      text: `${text.trim()}`,
      start: Math.round(start),
      end: Math.round(end) || Math.round(start + 0.9 * this.stride_length_s),
    };
  }
}





//--------------------------------------------------------------------------------------------------------------------------
//fin
function createResultMessage(results, isDone, completedUntilTimestamp) {
  self.postMessage({
    type: MessageTypes.RESULT,
    results,
    isDone,
    completedUntilTimestamp,
  });
}

//fin
function createPartialResultMessage(result) {
  self.postMessage({
    type: MessageTypes.RESULT_PARTIAL,
    result,
  });
}
