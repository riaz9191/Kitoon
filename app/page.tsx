"use client";
import { Button } from "@/components/ui/button";
import { Sparkles, Text, Image as ImageIcon, Code, Settings, LayoutGrid, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-950 text-gray-900 dark:text-gray-100 relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] dark:before:bg-[radial-gradient(#6b7280_1px,transparent_1px)] before:bg-[size:16px_16px] before:opacity-30 dark:before:opacity-20
    >
    ">
      {/* Geometric Background Shapes */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse animation-delay-1000"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse animation-delay-3000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse animation-delay-5000"></div>
      <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-16 pt-24 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Kitoon</span>: Your Ultimate Online Toolkit
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover a comprehensive suite of free online tools designed to simplify your daily tasks, boost productivity, and unleash your creativity.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-6 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <Link href="/all-tools">
              <Sparkles className="w-6 h-6 mr-3" />
              Explore All Tools
              <ArrowRight className="w-5 h-5 ml-3" />
            </Link>
          </Button>
        </section>

        {/* Featured Categories Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">Tools for Every Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <Text className="w-16 h-16 mb-6 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-3">Text Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">Format, convert, and analyze text with ease.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <ImageIcon className="w-16 h-16 mb-6 text-green-500" />
              <h3 className="text-2xl font-semibold mb-3">Image Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">Resize, compress, and transform your images.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <Code className="w-16 h-16 mb-6 text-purple-500" />
              <h3 className="text-2xl font-semibold mb-3">Developer Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">Utilities for coding, formatting, and testing.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <Settings className="w-16 h-16 mb-6 text-orange-500" />
              <h3 className="text-2xl font-semibold mb-3">Converters</h3>
              <p className="text-gray-600 dark:text-gray-400">Seamlessly convert between various data formats.</p>
            </div>
          </div>
        </section>

        {/* How It Works / Features Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">Why Choose Kitoon?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <LayoutGrid className="w-12 h-12 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Diverse Collection</h3>
              <p className="text-gray-600 dark:text-gray-400">A wide array of tools for all your needs.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <Settings className="w-12 h-12 mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-400">Intuitive interfaces for a smooth experience.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
              <Sparkles className="w-12 h-12 mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-2">Constantly Evolving</h3>
              <p className="text-gray-600 dark:text-gray-400">New tools and features added regularly.</p>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Explore our extensive collection of tools and find the perfect solution for your task.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-6 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <Link href="/all-tools">
              <Sparkles className="w-6 h-6 mr-3" />
              Browse All Tools
              <ArrowRight className="w-5 h-5 ml-3" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
