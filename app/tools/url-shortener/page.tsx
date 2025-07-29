'use client';

import { useState } from 'react';
import { Link2, Clipboard } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function UrlShortenerPage() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      if (response.ok) {
        const data = await response.text();
        setShortUrl(data);
        setError('');
      } else {
        setError('Failed to shorten URL');
        setShortUrl('');
      }
    } catch (e: any) {
      setError('An error occurred: ' + e.message);
      setShortUrl('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">URL Shortener</h1>
          <p className="text-lg text-gray-600 mt-2">Shorten long URLs.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full mb-6">
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter a long URL"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleShorten}
              disabled={!longUrl}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Link2 className="w-5 h-5 mr-2 inline-block" />
              Shorten URL
            </button>
            {shortUrl && (
              <div className="mt-8 w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shortened URL</h2>
                <div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-300 rounded-lg">
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-mono text-blue-600 hover:underline">{shortUrl}</a>
                  <button onClick={() => navigator.clipboard.writeText(shortUrl)} className="text-blue-600 hover:text-blue-800">
                    <Clipboard className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}