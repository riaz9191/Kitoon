"use client";

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SpeechToText = dynamic(() => import('@/components/speech-to-text'), { ssr: false });

export default function SpeechToTextPage() {
  return (
    <div className='min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center relative'>
      <Link href="/all-tools" className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
        <ArrowLeft size={24} />
      </Link>
      <div className='w-full max-w-3xl space-y-5 text-center'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6'>Speech to Text</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SpeechToText />
        </Suspense>
      </div>
    </div>
  );
}
