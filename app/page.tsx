import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gradient-to-b from-blue-50 to-white'>
      {/* Hero Section */}
      <section className='relative'>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>
        <div className='container mx-auto px-4 relative z-10'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className='space-y-8 text-center lg:text-left'>
              <div className='space-y-4'>
                <Badge className='bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-800 border-blue-300 shadow-md'>
                  <Sparkles className='w-4 h-4 mr-2' />
                  ইউনিকোড ও বিজয় সাপোর্ট
                </Badge>
                <h1 className='text-5xl lg:text-7xl font-extralight text-gray-900 leading-tight'>
                  বাংলা লেখালেখির সহজ সমাধান
                  <span className='py-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold'>
                    নির্ভুল ফন্ট কনভার্টার
                  </span>
                </h1>
                <p className='text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0'>
                  আমাদের এই টুলটি দিয়ে ইউনিকোড থেকে বিজয় এবং বিজয় থেকে ইউনিকোডে
                  বাংলা লেখা সহজেই কনভার্ট করুন। সাংবাদিক, লেখক, এবং
                  ছাত্রছাত্রীদের জন্য এটি একটি দ্রুত এবং নির্ভরযোগ্য সমাধান।
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <Button
                  asChild
                  size='lg'
                  className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-6 rounded-full text-base font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300'
                >
                  <Link href="/convert">
                    <RefreshCw className='w-5 h-5 mr-3' />
                    কনভার্ট শুরু করুন
                  </Link>
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='border-gray-300 text-gray-700 hover:bg-gray-100 px-10 py-6 rounded-full bg-transparent text-base font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300'
                >
                  <Play className='w-5 h-5 mr-3' />
                  কিভাবে কাজ করে?
                </Button>
              </div>
            </div>
            <div className='relative hidden lg:block'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse'></div>
              <Image
                src='/ss.png'
                alt='বাংলা ইউনিকোড ও বিজয় ফন্ট কনভার্সনের ডেমো'
                width={600}
                height={600}
                className='relative z-10 rounded-3xl shadow-2xl transform hover:rotate-3 transition-transform duration-500'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
