'use client';

import { useState } from 'react';
import { Palette, Clipboard } from 'lucide-react';
import { SketchPicker } from 'react-color';
import { BackButton } from '@/components/ui/back-button';

export default function ColorPickerPage() {
  const [color, setColor] = useState('#ffffff');

  const handleChangeComplete = (color: any) => {
    setColor(color.hex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Color Picker</h1>
          <p className="text-lg text-gray-600 mt-2">Select and convert colors.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
          <Palette className="w-16 h-16 mb-4 text-pink-500" />
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
          <div className="mt-8 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selected Color</h2>
            <div className="flex items-center justify-between p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <div style={{ backgroundColor: color, width: '50px', height: '50px', borderRadius: '8px', border: '1px solid #ccc' }}></div>
              <div className="text-lg font-mono">{color}</div>
              <button onClick={() => navigator.clipboard.writeText(color)} className="text-gray-500 hover:text-gray-700">
                <Clipboard className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}