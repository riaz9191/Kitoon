
'use client';

import { useState } from 'react';
import { Code, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import { minify } from 'terser';

export default function JavascriptMinifierPage() {
  const [jsInput, setJsInput] = useState('');
  const [minifiedJs, setMinifiedJs] = useState('');
  const [error, setError] = useState('');

  const minifyJs = async (input: string) => {
    try {
      const result = await minify(input);
      if (result.code) {
        setMinifiedJs(result.code);
        setError('');
      } else {
        setError('Minification failed.');
        setMinifiedJs('');
      }
    } catch (e: any) {
      setError('Minification error: ' + e.message);
      setMinifiedJs('');
    }
  };

  const handleJsInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setJsInput(input);
    minifyJs(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">JavaScript Minifier</h1>
          <p className="text-lg text-gray-600 mt-2">Minify JavaScript code to reduce file size.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">JavaScript Input</h2>
              <textarea
                value={jsInput}
                onChange={handleJsInputChange}
                placeholder="Enter JavaScript code here"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Minified JavaScript</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={minifiedJs}
                  className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto font-mono"
                />
                {minifiedJs && (
                  <button onClick={() => navigator.clipboard.writeText(minifiedJs)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
