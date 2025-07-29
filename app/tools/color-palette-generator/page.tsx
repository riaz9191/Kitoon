
'use client';

import { useState, useEffect } from 'react';
import { Palette, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import chroma from 'chroma-js';

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#3498db');
  const [numColors, setNumColors] = useState(5);
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    try {
      const colors = chroma.scale(['white', baseColor, 'black']).mode('lch').colors(numColors);
      setPalette(colors);
    } catch (e: any) {
      console.error('Error generating palette:', e);
      setPalette([]);
    }
  };

  useEffect(() => {
    generatePalette();
  }, [baseColor, numColors]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Color Palette Generator</h1>
          <p className="text-lg text-gray-600 mt-2">Generate harmonious color palettes.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Palette className="w-16 h-16 mb-4 text-pink-500" />
            <div className="w-full mb-4">
              <label htmlFor="baseColor" className="block text-lg font-medium text-gray-700 mb-2">Base Color</label>
              <input
                type="color"
                id="baseColor"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="numColors" className="block text-lg font-medium text-gray-700 mb-2">Number of Colors: {numColors}</label>
              <input
                type="range"
                id="numColors"
                min="2"
                max="10"
                value={numColors}
                onChange={(e) => setNumColors(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="p-4 rounded-lg text-center relative" style={{ backgroundColor: color }}>
                  <span className="text-white text-shadow-sm font-mono">{color}</span>
                  <button onClick={() => navigator.clipboard.writeText(color)} className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-20 hover:bg-opacity-40 text-white">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
