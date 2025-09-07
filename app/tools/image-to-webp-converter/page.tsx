"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ImageIcon, Download, AlertCircle } from "lucide-react";

export default function ImageToWebPConverter() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setConvertedImage(null);
      setError(null);
    } else {
      setError("Please select an image file.");
    }
  };

  const convertImage = () => {
    if (!imageFile) {
      setError("Please select an image file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/webp", quality);
          setConvertedImage(dataUrl);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Image to WebP Converter</h1>
        <p className="text-lg text-gray-600">Convert your images to the modern WebP format.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full mb-4">
            <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">any image file</p>
              </div>
              <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </Label>
          </div>

          {imageFile && <p className="text-center text-gray-700 mb-4">Selected file: {imageFile.name}</p>}

          <div className="space-y-4 mb-4">
            <Label htmlFor="quality-slider">Quality: {Math.round(quality * 100)}%</Label>
            <Slider
              id="quality-slider"
              min={0.1}
              max={1}
              step={0.05}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
            />
          </div>

          <Button onClick={convertImage} className="w-full" disabled={!imageFile}>
            Convert to WebP
          </Button>

          {error && (
            <div className="mt-4 text-red-500 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>

        {convertedImage && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Converted WebP Image</h2>
            <img src={convertedImage} alt="Converted" className="mx-auto rounded-lg shadow-md" />
            <a href={convertedImage} download="converted.webp">
              <Button className="mt-4">
                <Download className="w-4 h-4 mr-2" />
                Download WebP Image
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
