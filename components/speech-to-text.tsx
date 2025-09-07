"use client";

import { useState, useEffect, useRef } from 'react';

// Declare SpeechRecognition and SpeechGrammarList to avoid TypeScript errors
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    SpeechGrammarList: any;
    webkitSpeechGrammarList: any;
  }
}

export default function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech Recognition API is not supported in this browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true; // Keep listening
    recognitionRef.current.interimResults = true; // Get interim results
    recognitionRef.current.lang = 'en-US'; // You can change this to 'bn-BD' for Bengali

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setError('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className='w-full max-w-3xl space-y-5'>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className='flex justify-center gap-4'>
        <button
          onClick={isListening ? stopListening : startListening}
          className={`px-6 py-3 font-semibold rounded-md shadow-md transition-colors ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
          disabled={!!error}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      <div>
        <label htmlFor='transcript-output' className='block mb-2 text-base font-semibold text-gray-700 dark:text-gray-300'>
          Transcript:
        </label>
        <textarea
          id='transcript-output'
          value={transcript}
          readOnly
          className='w-full h-48 p-4 text-lg border-2 border-gray-300 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none shadow-sm dark:text-gray-200'
          placeholder='Your speech will appear here...'
        />
      </div>
    </div>
  );
}
