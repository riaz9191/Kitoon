
'use client';

import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';

export default function Base64ImageViewerPage() {
  const [base64Input, setBase64Input] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const viewImage = (input: string) => {
    try {
      // Basic check to see if it looks like a data URL
      if (input.startsWith('data:image/') && input.includes(';base64,')) {
        setImageUrl(input);
        setError('');
      } else {
        // Attempt to prepend common image data URL prefix if missing
        const potentialImageUrl = `data:image/png;base64,${input}`;
        // A more robust check would involve trying to load the image
        const img = new Image();
        img.onload = () => {
          setImageUrl(potentialImageUrl);
          setError('');
        };
        img.onerror = () => {
          setImageUrl(null);
          setError('Invalid Base64 image data. Please include data:image/<type>;base64, prefix or ensure it's a valid Base64 string.');
        };
        img.src = potentialImageUrl;
      }
    } catch (e: any) {
      setImageUrl(null);
      setError('Error processing Base64 string: ' + e.message);
    }
  };

  const handleBase64InputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setBase64Input(input);
    viewImage(input);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Base64 Image Viewer</h1>
          <p className="text-lg text-gray-600 mt-2">View images from Base64 strings.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-16 h-16 mb-4 text-yellow-500" />
            <div className="w-full mb-4">
              <label htmlFor="base64Input" className="block text-lg font-medium text-gray-700 mb-2">Base64 String</label>
              <textarea
                id="base64Input"
                value={base64Input}
                onChange={handleBase64InputChange}
                placeholder="Enter Base64 image string here (e.g., data:image/png;base64,iVBORw0KGgo...)"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            {imageUrl && (
              <div className="mt-6 w-full p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Image Preview</h2>
                <img src={imageUrl} alt="Base64 Image" className="max-w-full h-auto mx-auto" />
              </div>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
