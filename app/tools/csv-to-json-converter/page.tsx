'use client';

import { useState } from 'react';
import { FileText, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function CsvToJsonConverterPage() {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');

  const convertCsvToJson = () => {
    try {
      const lines = csvInput.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const obj: { [key: string]: string } = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
        }
        result.push(obj);
      }
      setJsonOutput(JSON.stringify(result, null, 2));
      setError('');
    } catch (e: any) {
      setError('Invalid CSV format: ' + e.message);
      setJsonOutput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">CSV to JSON Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert CSV data to JSON format.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">CSV Input</h2>
              <textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                placeholder="Enter CSV data here (e.g.,\nheader1,header2\nvalue1,value2)"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">JSON Output</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={jsonOutput}
                  className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto font-mono"
                />
                {jsonOutput && (
                  <button onClick={() => navigator.clipboard.writeText(jsonOutput)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={convertCsvToJson}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Convert to JSON
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}