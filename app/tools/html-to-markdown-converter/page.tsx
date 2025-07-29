
'use client';

import { useState } from 'react';
import { FileText, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import TurndownService from 'turndown';

export default function HtmlToMarkdownConverterPage() {
  const [htmlInput, setHtmlInput] = useState('');
  const [markdownOutput, setMarkdownOutput] = useState('');

  const convertHtmlToMarkdown = (input: string) => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(input);
    setMarkdownOutput(markdown);
  };

  const handleHtmlInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setHtmlInput(input);
    convertHtmlToMarkdown(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">HTML to Markdown Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert HTML content to Markdown format.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">HTML Input</h2>
              <textarea
                value={htmlInput}
                onChange={handleHtmlInputChange}
                placeholder="Enter HTML here"
                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Markdown Output</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={markdownOutput}
                  className="w-full h-96 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto font-mono"
                />
                {markdownOutput && (
                  <button onClick={() => navigator.clipboard.writeText(markdownOutput)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
