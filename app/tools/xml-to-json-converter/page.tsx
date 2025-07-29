'use client';

import { useState } from 'react';
import { Code, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import { XMLParser } from 'fast-xml-parser';

export default function XmlToJsonConverterPage() {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');

  const convertXmlToJson = (input: string) => {
    try {
      const parser = new XMLParser();
      const jsonObj = parser.parse(input);
      setJsonOutput(JSON.stringify(jsonObj, null, 2));
      setError('');
    } catch (e: any) {
      setError('Invalid XML: ' + e.message);
      setJsonOutput('');
    }
  };

  const handleXmlInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setXmlInput(input);
    convertXmlToJson(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">XML to JSON Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert XML data to JSON format.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">XML Input</h2>
              <textarea
                value={xmlInput}
                onChange={handleXmlInputChange}
                placeholder="Enter XML data here"
                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">JSON Output</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={jsonOutput}
                  className="w-full h-96 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto font-mono"
                />
                {jsonOutput && (
                  <button onClick={() => navigator.clipboard.writeText(jsonOutput)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
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