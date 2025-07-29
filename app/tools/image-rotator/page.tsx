
'use client';

import { useState, useRef } from 'react';
import { ImageIcon, Upload, RotateCw, Download } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function ImageRotatorPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotatedImageSrc, setRotatedImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
      setRotatedImageSrc(null);
      setRotation(0);
    }
  };

  const rotateImage = () => {
    if (imgRef.current && canvasRef.current) {
      const image = imgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const rad = rotation * Math.PI / 180;
      const cos = Math.abs(Math.cos(rad));
      const sin = Math.abs(Math.sin(rad));

      const newWidth = image.naturalWidth * cos + image.naturalHeight * sin;
      const newHeight = image.naturalWidth * sin + image.naturalHeight * cos;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.clearRect(0, 0, newWidth, newHeight);
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(rad);
      ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
      setRotatedImageSrc(canvas.toDataURL());
    }
  };

  const handleDownload = () => {
    if (rotatedImageSrc) {
      const link = document.createElement('a');
      link.download = 'rotated-image.png';
      link.href = rotatedImageSrc;
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
          <h1 className="text-5xl font-bold text-gray-800">Image Rotator</h1>
          <p className="text-lg text-gray-600 mt-2">Rotate images by a specified angle.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Click or drag to upload an image</p>
              </label>
            </div>

            {imageSrc && (
              <div className="mt-8">
                <img ref={imgRef} src={imageSrc} alt="Original" className="max-w-full h-auto rounded-lg mb-4" style={{ display: 'none' }} />
                <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg mb-4 border border-gray-300"></canvas>
                <div className="flex items-center space-x-4 mb-4">
                  <label htmlFor="rotation" className="text-lg font-medium text-gray-700">Rotation (degrees):</label>
                  <input
                    type="number"
                    id="rotation"
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="w-24 p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  onClick={rotateImage}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
                >
                  <RotateCw className="w-5 h-5 mr-2 inline-block" />
                  Rotate Image
                </button>
              </div>
            )}

            {rotatedImageSrc && (
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rotated Image</h2>
                <img src={rotatedImageSrc} alt="Rotated" className="max-w-full h-auto rounded-lg mx-auto mb-4" />
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700"
                >
                  <Download className="w-5 h-5 mr-2 inline-block" />
                  Download Rotated Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
