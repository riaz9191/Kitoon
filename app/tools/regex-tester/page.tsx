
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function RegexTesterPage() {
  const [regexInput, setRegexInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [matchResult, setMatchResult] = useState('');
  const [error, setError] = useState('');

  const testRegex = (regex: string, text: string) => {
    try {
      const re = new RegExp(regex);
      const match = text.match(re);
      if (match) {
        setMatchResult(`Match found: ${match[0]}`);
      } else {
        setMatchResult('No match found.');
      }
      setError('');
    } catch (e: any) {
      setError('Invalid Regex: ' + e.message);
      setMatchResult('');
    }
  };

  const handleRegexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setRegexInput(input);
    testRegex(input, textInput);
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setTextInput(input);
    testRegex(regexInput, input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Regex Tester</h1>
          <p className="text-lg text-gray-600 mt-2">Test regular expressions against text.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Search className="w-16 h-16 mb-4 text-red-500" />
            <div className="w-full mb-4">
              <label htmlFor="regex" className="block text-lg font-medium text-gray-700 mb-2">Regular Expression</label>
              <input
                type="text"
                id="regex"
                value={regexInput}
                onChange={handleRegexInputChange}
                placeholder="Enter your regex (e.g., ^\d{3}$)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="text" className="block text-lg font-medium text-gray-700 mb-2">Test String</label>
              <textarea
                id="text"
                value={textInput}
                onChange={handleTextInputChange}
                placeholder="Enter text to test against"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {matchResult && (
              <div className="mt-6 w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Result</h2>
                <p className="text-lg font-mono">{matchResult}</p>
              </div>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
