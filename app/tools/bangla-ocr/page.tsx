
'use client';

import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Upload, FileText, Loader, Copy, ArrowLeft } from 'lucide-react';
import { BackButton } from '@/components/ui/back-button';
import Link from 'next/link';

export default function BanglaOcrPage() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
      setText(null);
    }
  };

  const handleOcr = async () => {
    if (!image) return;
    setLoading(true);
    const worker = await createWorker('ben');
    const { data: { text } } = await worker.recognize(image);
    setText(text);
    await worker.terminate();
    setLoading(false);
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white p-8'>
      <Link
        href='/all-tools'
        className='absolute top-20 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200
     hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
      >
         <ArrowLeft size={24} />
      </Link>
      <div className='container mx-auto'>
        <div className='absolute top-4 left-4'>
          <BackButton />
        </div>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-800'>Bangla OCR</h1>
          <p className='text-lg text-gray-600 mt-2'>
            Extract text from images.
          </p>
        </div>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
                Upload Image
              </h2>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='dropzone-file'
                  className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload className='w-10 h-10 mb-3 text-gray-400' />
                    <p className='mb-2 text-sm text-gray-500'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {image && (
                <img
                  src={image}
                  alt='Uploaded'
                  className='mt-4 rounded-lg max-h-64 object-contain'
                />
              )}
              <button
                onClick={handleOcr}
                className='w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center'
                disabled={loading || !image}
              >
                {loading ? (
                  <Loader className='animate-spin mr-2' />
                ) : (
                  <FileText className='mr-2' />
                )}
                {loading ? "Extracting Text..." : "Extract Text"}
              </button>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
                Extracted Text
              </h2>
              <div className='relative'>
                <textarea
                  value={text || ""}
                  readOnly
                  className='w-full h-64 p-4 border-2 border-gray-300 rounded-lg bg-gray-50'
                  placeholder='Extracted text will appear here...'
                ></textarea>
                {text && (
                  <button
                    onClick={handleCopy}
                    className='absolute top-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300'
                  >
                    <Copy className='w-4 h-4' />
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
