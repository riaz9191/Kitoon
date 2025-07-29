
'use client';

import { useState, useRef } from 'react';
import { ImageIcon, Upload, Crop, Download } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import ReactCrop, { Crop as ReactCropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageCropperPage() {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<ReactCropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop start from scratch
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    imgRef.current = e.currentTarget;
  };

  const onCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const handleCrop = () => {
    if (completedCrop && imgRef.current && previewCanvasRef.current) {
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio;

      canvas.width = completedCrop.width * pixelRatio;
      canvas.height = completedCrop.height * pixelRatio;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height,
      );
    }
  };

  const handleDownload = () => {
    if (previewCanvasRef.current) {
      const link = document.createElement('a');
      link.download = 'cropped-image.png';
      link.href = previewCanvasRef.current.toDataURL('image/png');
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
          <h1 className="text-5xl font-bold text-gray-800">Image Cropper</h1>
          <p className="text-lg text-gray-600 mt-2">Crop images to a specific size or aspect ratio.</p>
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

            {src && (
              <div className="mt-8">
                <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={onCropComplete} aspect={16 / 9}>
                  <img ref={imgRef} alt="Crop me" src={src} onLoad={onImageLoad} />
                </ReactCrop>
                <button
                  onClick={handleCrop}
                  className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700"
                >
                  <Crop className="w-5 h-5 mr-2 inline-block" />
                  Crop Image
                </button>
              </div>
            )}

            {completedCrop && (
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cropped Image</h2>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                  className="max-w-full h-auto rounded-lg mx-auto mb-4 border border-gray-300"
                />
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700"
                >
                  <Download className="w-5 h-5 mr-2 inline-block" />
                  Download Cropped Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
