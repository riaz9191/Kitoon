'use client';

import { useState } from 'react';
import { Code, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function Base64ConverterPage() {
  const [textInput, setTextInput] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [error, setError] = useState('');

  const encodeBase64 = () => {
    try {
      setConvertedText(btoa(textInput));
      setError('');
    } catch (e: any) {
      setError('Encoding error: ' + e.message);
      setConvertedText('');
    }
  };

  const decodeBase64 = () => {
    try {
      setConvertedText(atob(textInput));
      setError('');
    } catch (e: any) {
      setError('Decoding error: ' + e.message);
      setConvertedText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Base64 Encoder/Decoder</h1>
          <p className="text-lg text-gray-600 mt-2">Encode and decode Base64 strings.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Input</h2>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text or Base64 string here"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Output</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={convertedText}
                  className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto font-mono"
                />
                {convertedText && (
                  <button onClick={() => navigator.clipboard.writeText(convertedText)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={encodeBase64}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 mr-4"
            >
              Encode to Base64
            </button>
            <button
              onClick={decodeBase64}
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700"
            >
              Decode from Base64
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}