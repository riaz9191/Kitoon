'use client';

import { useState, useEffect } from 'react';
import { Lock, Clipboard } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|:"<>,.?/';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charSet = '';
    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Password Generator</h1>
          <p className="text-lg text-gray-600 mt-2">Create strong passwords.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full mb-6 relative">
              <input type="text" value={password} readOnly className="w-full p-4 pr-12 border border-gray-300 rounded-lg font-mono text-lg" />
                <button onClick={() => navigator.clipboard.writeText(password)} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    <Clipboard className="w-5 h-5" />
                </button>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="col-span-2">
                <label htmlFor="length" className="block text-lg font-medium text-gray-700">Length: {length}</label>
                <input
                  type="range"
                  id="length"
                  min="4"
                  max="32"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="uppercase" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="uppercase" className="ml-2 text-lg text-gray-700">Include Uppercase</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="lowercase" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="lowercase" className="ml-2 text-lg text-gray-700">Include Lowercase</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="numbers" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="numbers" className="ml-2 text-lg text-gray-700">Include Numbers</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="symbols" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="symbols" className="ml-2 text-lg text-gray-700">Include Symbols</label>
              </div>
            </div>
            <button
              onClick={generatePassword}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              <Lock className="w-5 h-5 mr-2 inline-block" />
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}