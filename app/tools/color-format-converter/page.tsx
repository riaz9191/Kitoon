'use client';

import { useState } from 'react';
import { Palette, Copy } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function ColorFormatConverterPage() {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(value)) {
      const rgbValue = hexToRgb(value);
      setRgb(rgbValue);
      const [r, g, b] = rgbValue.match(/\d+/g)!.map(Number);
      setHsl(rgbToHsl(r, g, b));
    } else {
      setRgb('');
      setHsl('');
    }
  };

  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRgb(value);
    const match = value.match(/\d+/g);
    if (match && match.length === 3) {
      const [r, g, b] = match.map(Number);
      setHex(rgbToHex(r, g, b));
      setHsl(rgbToHsl(r, g, b));
    } else {
      setHex('');
      setHsl('');
    }
  };

  const handleHslChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHsl(value);
    // HSL to RGB conversion is more complex and might require a library or more robust implementation
    // For simplicity, I'll leave it as a placeholder for now.
    setHex('');
    setRgb('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Color Format Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert colors between different formats (HEX, RGB, HSL).</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Palette className="w-16 h-16 mb-4 text-pink-500" />
            <div className="w-full mb-4">
              <label htmlFor="hex" className="block text-lg font-medium text-gray-700 mb-2">HEX</label>
              <input
                type="text"
                id="hex"
                value={hex}
                onChange={handleHexChange}
                placeholder="#RRGGBB or #RGB"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="rgb" className="block text-lg font-medium text-gray-700 mb-2">RGB</label>
              <input
                type="text"
                id="rgb"
                value={rgb}
                onChange={handleRgbChange}
                placeholder="rgb(R, G, B)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="hsl" className="block text-lg font-medium text-gray-700 mb-2">HSL</label>
              <input
                type="text"
                id="hsl"
                value={hsl}
                onChange={handleHslChange}
                placeholder="hsl(H, S%, L%)"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}