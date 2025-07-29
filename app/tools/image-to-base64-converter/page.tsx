'use client';

import { useState } from 'react';
import { ImageIcon, Copy, Upload } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function ImageToBase64ConverterPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Output, setBase64Output] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setBase64Output(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Image to Base64 Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert images to Base64 strings.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image</h2>
              <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 h-64 flex flex-col items-center justify-center">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Selected" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <>
                      <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">Click or drag to upload an image</p>
                    </>
                  )}
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Base64 Output</h2>
              <div className="relative">
                <textarea
                  readOnly
                  value={base64Output}
                  className="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto font-mono text-sm"
                />
                {base64Output && (
                  <button onClick={() => navigator.clipboard.writeText(base64Output)} className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300">
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