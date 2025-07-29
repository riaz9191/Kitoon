
'use client';

import { useState } from 'react';
import { Key, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import CryptoJS from 'crypto-js';

export default function HashGeneratorPage() {
  const [textInput, setTextInput] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');

  const generateHashes = (input: string) => {
    setMd5Hash(CryptoJS.MD5(input).toString());
    setSha1Hash(CryptoJS.SHA1(input).toString());
    setSha256Hash(CryptoJS.SHA256(input).toString());
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setTextInput(input);
    generateHashes(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Hash Generator</h1>
          <p className="text-lg text-gray-600 mt-2">Generate various cryptographic hashes (MD5, SHA1, SHA256, etc.).</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Key className="w-16 h-16 mb-4 text-purple-500" />
            <div className="w-full mb-4">
              <label htmlFor="textInput" className="block text-lg font-medium text-gray-700 mb-2">Input Text</label>
              <textarea
                id="textInput"
                value={textInput}
                onChange={handleTextInputChange}
                placeholder="Enter text to hash"
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6 w-full grid grid-cols-1 gap-4">
              {md5Hash && (
                <div className="p-4 bg-gray-100 rounded-lg relative">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">MD5</h3>
                  <p className="font-mono break-all">{md5Hash}</p>
                  <button onClick={() => navigator.clipboard.writeText(md5Hash)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
              {sha1Hash && (
                <div className="p-4 bg-gray-100 rounded-lg relative">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">SHA1</h3>
                  <p className="font-mono break-all">{sha1Hash}</p>
                  <button onClick={() => navigator.clipboard.writeText(sha1Hash)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
              {sha256Hash && (
                <div className="p-4 bg-gray-100 rounded-lg relative">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">SHA256</h3>
                  <p className="font-mono break-all">{sha256Hash}</p>
                  <button onClick={() => navigator.clipboard.writeText(sha256Hash)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
