"use client";

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function TextToSpeechPage() {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // You can change this to other languages like 'bn-BD' for Bengali

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className='min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center relative'>
      <Link href="/all-tools" className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
        <ArrowLeft size={24} />
      </Link>
      <div className='w-full max-w-3xl space-y-5'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center'>Text to Speech</h1>

        <div>
          <label htmlFor='text-input' className='block mb-2 text-base font-semibold text-gray-700 dark:text-gray-300'>
            Enter Text:
          </label>
          <textarea
            id='text-input'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='w-full h-48 p-4 text-lg border-2 border-blue-400 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm dark:text-gray-200'
            placeholder='Type or paste your text here...'
          />
        </div>

        <div className='flex justify-center gap-4'>
          <button
            onClick={handleSpeak}
            disabled={speaking || text.trim() === ''}
            className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {speaking ? 'Speaking...' : 'Speak'}
          </button>
          <button
            onClick={handleStop}
            disabled={!speaking}
            className='px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
