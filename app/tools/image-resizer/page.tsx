'use client';

import { useState, useRef } from 'react';
import { ImageIcon, Download, Upload } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function ImageResizerPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
        };
      };
      reader.readAsDataURL(event.target.files[0]);
      setResizedImage(null);
    }
  };

  const handleResize = () => {
    if (originalImage && canvasRef.current) {
      const img = new Image();
      img.src = originalImage;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            setResizedImage(canvas.toDataURL('image/png'));
        }
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Image Resizer</h1>
          <p className="text-lg text-gray-600 mt-2">Resize and compress images.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">{originalImage ? 'Image Selected' : 'Click or drag to upload an image'}</p>
                </label>
            </div>
            <div>
              {originalImage && (
                <div className="flex flex-col items-center">
                  <img src={originalImage} alt="Original" className="max-w-full h-auto rounded-lg mb-4" />
                  <div className="flex items-center space-x-4 mb-4">
                    <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-24 p-2 border border-gray-300 rounded-lg" />
                    <span>x</span>
                    <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-24 p-2 border border-gray-300 rounded-lg" />
                  </div>
                  <button onClick={handleResize} className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700">
                    <ImageIcon className="w-5 h-5 mr-2 inline-block" />
                    Resize
                  </button>
                </div>
              )}
            </div>
          </div>
          {resizedImage && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resized Image</h2>
              <img src={resizedImage} alt="Resized" className="max-w-full h-auto rounded-lg mx-auto mb-4" />
              <a href={resizedImage} download="resized-image.png" className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700">
                <Download className="w-5 h-5 mr-2 inline-block" />
                Download Image
              </a>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
      </div>
    </div>
  );
}