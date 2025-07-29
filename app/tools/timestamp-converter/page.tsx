'use client';

import { useState } from 'react';
import { Clock, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');

  const convertTimestampToDate = () => {
    if (timestamp) {
      const d = new Date(parseInt(timestamp) * 1000);
      setDate(d.toLocaleString());
    }
  };

  const convertDateToTimestamp = () => {
    if (date) {
      const d = new Date(date);
      setTimestamp((d.getTime() / 1000).toString());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Timestamp Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert between timestamps and human-readable dates.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Clock className="w-16 h-16 mb-4 text-orange-500" />
            <div className="w-full mb-6">
              <label htmlFor="timestamp" className="block text-lg font-medium text-gray-700 mb-2">Timestamp</label>
              <input
                type="number"
                id="timestamp"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                placeholder="Enter Unix timestamp"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={convertTimestampToDate}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 w-full"
              >
                Convert to Date
              </button>
            </div>
            <div className="w-full mb-6">
              <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">Date/Time</label>
              <input
                type="text"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter date (e.g., 2023-01-01 12:00:00)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={convertDateToTimestamp}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 w-full"
              >
                Convert to Timestamp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}