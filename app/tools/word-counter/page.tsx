'use client';

import { useState } from 'react';
import { Type } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function WordCounterPage() {
  const [textInput, setTextInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTextInput(text);

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);

    // Character count
    setCharCount(text.length);

    // Line count
    setLineCount(text.split(/\r\n|\r|\n/).length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Word Counter</h1>
          <p className="text-lg text-gray-600 mt-2">Count words, characters, and lines in your text.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Type className="w-16 h-16 mb-4 text-indigo-500" />
            <textarea
              value={textInput}
              onChange={handleTextChange}
              placeholder="Start typing or paste your text here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-6 w-full grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="text-3xl font-bold text-gray-800">{wordCount}</div>
                <div className="text-gray-600">Words</div>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="text-3xl font-bold text-gray-800">{charCount}</div>
                <div className="text-gray-600">Characters</div>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="text-3xl font-bold text-gray-800">{lineCount}</div>
                <div className="text-gray-600">Lines</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}