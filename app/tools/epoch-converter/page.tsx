
'use client';

import { useState } from 'react';
import { Clock, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function EpochConverterPage() {
  const [timestampInput, setTimestampInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [error, setError] = useState('');

  const convertTimestampToDate = (timestamp: string) => {
    if (!timestamp) {
      setDateInput('');
      setError('');
      return;
    }
    try {
      const d = new Date(parseInt(timestamp) * 1000);
      if (isNaN(d.getTime())) {
        throw new Error('Invalid timestamp');
      }
      setDateInput(d.toLocaleString());
      setError('');
    } catch (e: any) {
      setDateInput('');
      setError('Invalid Timestamp: ' + e.message);
    }
  };

  const convertDateToTimestamp = (dateString: string) => {
    if (!dateString) {
      setTimestampInput('');
      setError('');
      return;
    }
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) {
        throw new Error('Invalid date string');
      }
      setTimestampInput((d.getTime() / 1000).toString());
      setError('');
    } catch (e: any) {
      setTimestampInput('');
      setError('Invalid Date: ' + e.message);
    }
  };

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimestampInput(value);
    convertTimestampToDate(value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateInput(value);
    convertDateToTimestamp(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Epoch Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert between Unix epoch timestamps and human-readable dates.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Clock className="w-16 h-16 mb-4 text-orange-500" />
            <div className="w-full mb-4">
              <label htmlFor="timestampInput" className="block text-lg font-medium text-gray-700 mb-2">Unix Timestamp</label>
              <input
                type="number"
                id="timestampInput"
                value={timestampInput}
                onChange={handleTimestampChange}
                placeholder="Enter Unix timestamp (e.g., 1678886400)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="dateInput" className="block text-lg font-medium text-gray-700 mb-2">Human Readable Date</label>
              <input
                type="text"
                id="dateInput"
                value={dateInput}
                onChange={handleDateChange}
                placeholder="Enter date (e.g., 2023-03-15 12:00:00 GMT+0000)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
