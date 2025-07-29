'use client';

import { useState } from 'react';
import { Pilcrow, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function TextCaseConverterPage() {
  const [textInput, setTextInput] = useState('');
  const [convertedText, setConvertedText] = useState('');

  const convertCase = (type: string) => {
    let result = '';
    switch (type) {
      case 'uppercase':
        result = textInput.toUpperCase();
        break;
      case 'lowercase':
        result = textInput.toLowerCase();
        break;
      case 'capitalize':
        result = textInput.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        break;
      case 'sentencecase':
        result = textInput.toLowerCase().replace(/(^|\.\s*)([a-z])/g, (match) => match.toUpperCase());
        break;
      case 'titlecase':
        result = textInput.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'alternatingcase':
        result = textInput.split('').map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
        break;
      case 'inversecase':
        result = textInput.split('').map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
        break;
      default:
        result = textInput;
    }
    setConvertedText(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Text Case Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert text to different cases.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Input Text</h2>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter your text here"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Converted Text</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={convertedText}
                  className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <button onClick={() => convertCase('uppercase')} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">UPPERCASE</button>
              <button onClick={() => convertCase('lowercase')} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">lowercase</button>
              <button onClick={() => convertCase('capitalize')} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">Capitalize Each Word</button>
              <button onClick={() => convertCase('sentencecase')} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">Sentence case</button>
              <button onClick={() => convertCase('titlecase')} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">Title Case</button>
              <button onClick={() => convertCase('alternatingcase')} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">aLtErNaTiNg cAsE</button>
              <button onClick={() => convertCase('inversecase')} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">InVeRsE CaSe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}