
'use client';

import { useState } from 'react';
import { FileText, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import { format } from 'sql-formatter';

export default function SqlFormatterPage() {
  const [sqlInput, setSqlInput] = useState('');
  const [formattedSql, setFormattedSql] = useState('');
  const [error, setError] = useState('');

  const formatSql = (input: string) => {
    try {
      const formatted = format(input, {
        language: 'sql',
        indent: '  ',
      });
      setFormattedSql(formatted);
      setError('');
    } catch (e: any) {
      setError('Invalid SQL: ' + e.message);
      setFormattedSql('');
    }
  };

  const handleSqlInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setSqlInput(input);
    formatSql(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">SQL Formatter</h1>
          <p className="text-lg text-gray-600 mt-2">Format and beautify SQL queries.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">SQL Input</h2>
              <textarea
                value={sqlInput}
                onChange={handleSqlInputChange}
                placeholder="Enter SQL queries here"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formatted SQL</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={formattedSql}
                  className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto font-mono"
                />
                {formattedSql && (
                  <button onClick={() => navigator.clipboard.writeText(formattedSql)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
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
