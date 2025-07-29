
'use client';

import { useState } from 'react';
import { ImageIcon, Upload, Download } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import imageCompression from 'browser-image-compression';

export default function ImageCompressorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<string | null>(null);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setSelectedImage(imageFile);
      setOriginalSize((imageFile.size / 1024).toFixed(2) + ' KB');
      setCompressedImage(null);
      setCompressedSize(null);
      setCompressionProgress(0);
    }
  };

  const handleCompress = async () => {
    if (selectedImage) {
      const options = {
        maxSizeMB: 1, // (max file size in MB)
        maxWidthOrHeight: 1024, // compressed image's max width or height
        useWebWorker: true,
        onProgress: (progress: number) => {
          setCompressionProgress(progress);
        },
      };
      try {
        const compressedFile = await imageCompression(selectedImage, options);
        setCompressedSize((compressedFile.size / 1024).toFixed(2) + ' KB');
        const reader = new FileReader();
        reader.onload = (e) => {
          setCompressedImage(e.target?.result as string);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Image Compressor</h1>
          <p className="text-lg text-gray-600 mt-2">Compress images to reduce file size.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image</h2>
              <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 h-64 flex flex-col items-center justify-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                  {selectedImage ? (
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <>
                      <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600">Click or drag to upload an image</p>
                    </>
                  )}
                </label>
              </div>
              {selectedImage && <p className="text-gray-600 mt-2">Original Size: {originalSize}</p>}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compressed Image</h2>
              <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center h-64 flex flex-col items-center justify-center">
                {compressedImage ? (
                  <img src={compressedImage} alt="Compressed" className="max-w-full max-h-full object-contain" />
                ) : (
                  <p className="text-gray-600">Compressed image will appear here</p>
                )}
              </div>
              {compressedImage && <p className="text-gray-600 mt-2">Compressed Size: {compressedSize}</p>}
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleCompress}
              disabled={!selectedImage}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ImageIcon className="w-5 h-5 mr-2 inline-block" />
              Compress Image
            </button>
            {compressedImage && (
              <a
                href={compressedImage}
                download="compressed-image.png"
                className="ml-4 bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700"
              >
                <Download className="w-5 h-5 mr-2 inline-block" />
                Download Compressed Image
              </a>
            )}
            {selectedImage && compressionProgress > 0 && compressionProgress < 100 && (
              <p className="text-blue-500 mt-4">Compressing: {compressionProgress.toFixed(0)}%</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
