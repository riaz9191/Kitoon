'use client';

import { useState } from 'react';
import { Key, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import { v4 as uuidv4 } from 'uuid';

export default function UuidGeneratorPage() {
  const [uuid, setUuid] = useState('');

  const generateUuid = () => {
    setUuid(uuidv4());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">UUID Generator</h1>
          <p className="text-lg text-gray-600 mt-2">Generate universally unique identifiers.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Key className="w-16 h-16 mb-4 text-gray-500" />
            <div className="w-full mb-6 relative">
              <input type="text" value={uuid} readOnly className="w-full p-4 pr-12 border border-gray-300 rounded-lg font-mono text-lg" />
              {uuid && (
                <button onClick={() => navigator.clipboard.writeText(uuid)} className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <Copy className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={generateUuid}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Generate UUID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}