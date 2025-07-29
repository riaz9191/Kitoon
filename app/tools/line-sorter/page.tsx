'use client';

import { useState } from 'react';
import { FileText, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function LineSorterPage() {
  const [textInput, setTextInput] = useState('');
  const [sortedText, setSortedText] = useState('');

  const sortLines = (type: 'alphabetical' | 'length') => {
    const lines = textInput.split(/\r\n|\r|\n/).filter(line => line.trim() !== '');
    let result = [];

    if (type === 'alphabetical') {
      result = lines.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      result = lines.sort((a, b) => a.length - b.length);
    }
    setSortedText(result.join('\n'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Line Sorter</h1>
          <p className="text-lg text-gray-600 mt-2">Sort lines of text alphabetically or by length.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Input Text</h2>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text with lines to sort"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sorted Text</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={sortedText}
                  className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto"
                />
                {sortedText && (
                  <button onClick={() => navigator.clipboard.writeText(sortedText)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => sortLines('alphabetical')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 mr-4"
            >
              Sort Alphabetically
            </button>
            <button
              onClick={() => sortLines('length')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Sort by Length
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}