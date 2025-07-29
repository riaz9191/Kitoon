'use client';

import { useState } from 'react';
import { Ruler } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function UnitConverterPage() {
  const [inputValue, setInputValue] = useState(0);
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [convertedValue, setConvertedValue] = useState(0);

  const units = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      centimeters: 100,
      kilometers: 0.001,
      miles: 0.000621371,
    },
    // Add more categories and units here
  };

  const handleConvert = () => {
    const fromValueInMeters = inputValue / units.length[fromUnit as keyof typeof units.length];
    const toValue = fromValueInMeters * units.length[toUnit as keyof typeof units.length];
    setConvertedValue(toValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Unit Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert between different units of measurement.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <Ruler className="w-16 h-16 mb-4 text-green-500" />
            <div className="grid grid-cols-3 gap-4 w-full mb-6">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value))}
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(units.length).map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(units.length).map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleConvert}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Convert
            </button>
            {convertedValue !== 0 && (
              <div className="mt-6 text-2xl font-semibold text-gray-800">
                {convertedValue.toFixed(4)} {toUnit}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}