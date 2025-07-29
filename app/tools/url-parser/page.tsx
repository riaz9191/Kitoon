
'use client';

import { useState } from 'react';
import { Link2, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function UrlParserPage() {
  const [urlInput, setUrlInput] = useState('');
  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);
  const [error, setError] = useState('');

  const parseUrl = (input: string) => {
    try {
      const url = new URL(input);
      setParsedUrl(url);
      setError('');
    } catch (e: any) {
      setError('Invalid URL: ' + e.message);
      setParsedUrl(null);
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrlInput(input);
    parseUrl(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">URL Parser</h1>
          <p className="text-lg text-gray-600 mt-2">Parse URLs into their components (protocol, host, path, etc.).</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Link2 className="w-16 h-16 mb-4 text-teal-500" />
            <div className="w-full mb-4">
              <label htmlFor="urlInput" className="block text-lg font-medium text-gray-700 mb-2">URL</label>
              <input
                type="text"
                id="urlInput"
                value={urlInput}
                onChange={handleUrlInputChange}
                placeholder="Enter a URL (e.g., https://www.example.com/path?query=value#hash)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            {parsedUrl && (
              <div className="mt-6 w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Parsed Components</h2>
                <ul className="list-none p-0 m-0">
                  <li><span className="font-semibold">Protocol:</span> {parsedUrl.protocol}</li>
                  <li><span className="font-semibold">Host:</span> {parsedUrl.host}</li>
                  <li><span className="font-semibold">Hostname:</span> {parsedUrl.hostname}</li>
                  <li><span className="font-semibold">Port:</span> {parsedUrl.port}</li>
                  <li><span className="font-semibold">Pathname:</span> {parsedUrl.pathname}</li>
                  <li><span className="font-semibold">Search:</span> {parsedUrl.search}</li>
                  <li><span className="font-semibold">Hash:</span> {parsedUrl.hash}</li>
                </ul>
              </div>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
