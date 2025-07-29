
'use client';

import { useState, useRef } from 'react';
import { QrCode, Upload } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import jsQR from 'jsqr';

export default function QrCodeReaderPage() {
  const [image, setImage] = useState<string | null>(null);
  const [qrData, setQrData] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(img.src);
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0, img.width, img.height);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);
              if (code) {
                setQrData(code.data);
              } else {
                setQrData('No QR code found.');
              }
            }
          }
        };
        img.src = e.target?.result as string;
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
          <h1 className="text-5xl font-bold text-gray-800">QR Code Reader</h1>
          <p className="text-lg text-gray-600 mt-2">Scan QR codes from images.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <QrCode className="w-16 h-16 mb-4 text-indigo-500" />
            <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="qr-upload" />
              <label htmlFor="qr-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">{image ? 'Image Selected' : 'Click or drag to upload an image'}</p>
              </label>
            </div>
            {image && <img src={image} alt="Uploaded QR Code" className="mt-4 max-w-full h-auto rounded-lg" />}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            {qrData && (
              <div className="mt-6 w-full p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">QR Code Data</h2>
                <p className="font-mono break-all">{qrData}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
