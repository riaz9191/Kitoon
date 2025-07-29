'use client';

import { useState, useRef, useEffect } from 'react';
import { QrCode, Download } from 'lucide-react';
import QRCode from 'qrcode';
import { BackButton } from '@/components/ui/back-button';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (text && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, text, { width: 256 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [text]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">QR Code Generator</h1>
          <p className="text-lg text-gray-600 mt-2">Create custom QR codes.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full mb-6">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to encode"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <canvas ref={canvasRef} className="mb-6 border border-gray-300 rounded-lg"></canvas>
            <button
              onClick={handleDownload}
              disabled={!canvasRef.current || !canvasRef.current.toDataURL()}
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5 mr-2 inline-block" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}