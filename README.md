Sure, here's the updated README with the additional information:

---

# Voice-Translation-React-ML

Welcome to Voice-Translation-React-ML! This application allows users to record or upload any voice clip, and it will transcribe the audio into English using advanced machine learning technology.

## Key Features

- **Voice Recording & Uploading:** Easily record your voice directly within the app or upload existing voice clips for transcription.
- **Accurate Transcription:** Leveraging OpenAI's Whisper-tiny machine learning model, this app provides highly accurate transcriptions.
- **No Backend Infrastructure Needed:** This application is built entirely with React, eliminating the need for backend server infrastructure. It's lightweight and easy to deploy!

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Voice-Translation-React-ML.git
   cd Voice-Translation-React-ML
   ```

2. Install the dependencies:
   ```bash
   npm install
   npm i @xenova/transformers
   ```
 
### Running the Application

To start the application, run:
```bash
npm start dev
```
## Usage

1. **Record Voice:** Click on the "Record" button to start recording your voice. Click again to stop recording.
2. **Upload Voice Clip:** Click on the "Upload" button to select and upload a voice clip from your device.
3. **Transcription:** Once the recording or upload is complete, the app will process the audio and display the transcription in English.
4. **No Backend: ** No need backend infrastructure

## Technology Stack

- **Frontend:** React
- **Styling:** Tailwind CSS
- **Machine Learning Model:** OpenAI Whisper-tiny
- **Dependencies:** 
  - Tailwind CSS
  - xenova/transformers

## Future Development

I hope to further develop this application to include translation features, allowing users to transcribe and translate their audio into multiple languages.


