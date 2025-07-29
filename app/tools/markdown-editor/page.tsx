'use client';

import { useState } from 'react';
import { Pilcrow } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BackButton } from '@/components/ui/back-button';

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState('# Hello, world!\n\nThis is a **Markdown** editor.');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Markdown Editor</h1>
          <p className="text-lg text-gray-600 mt-2">Write and preview Markdown.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editor</h2>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-[60vh] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preview</h2>
              <div className="w-full h-[60vh] p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto prose max-w-none">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}