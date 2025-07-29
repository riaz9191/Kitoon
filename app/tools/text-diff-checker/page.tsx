
'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import { diffChars } from 'diff';

export default function TextDiffCheckerPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<any[]>([]);

  const compareText = () => {
    const differences = diffChars(text1, text2);
    setDiffResult(differences);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Text Diff Checker</h1>
          <p className="text-lg text-gray-600 mt-2">Compare two text inputs and highlight differences.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text 1</h2>
              <textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="Enter first text here"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text 2</h2>
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Enter second text here"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={compareText}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Compare Texts
            </button>
          </div>
          {diffResult.length > 0 && (
            <div className="mt-8 w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Differences</h2>
              <pre className="whitespace-pre-wrap font-mono">
                {diffResult.map((part, i) => (
                  <span
                    key={i}
                    style={{
                      color: part.added ? 'green' : part.removed ? 'red' : 'black',
                      backgroundColor: part.added ? '#e6ffe6' : part.removed ? '#ffe6e6' : 'transparent',
                    }}
                  >
                    {part.value}
                  </span>
                ))}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
