"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageIcon, Download, AlertCircle } from "lucide-react";

export default function WebPToImageConverter() {
  const [webpFile, setWebpFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [format, setFormat] = useState<"jpg" | "png">("jpg");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "image/webp") {
      setWebpFile(file);
      setConvertedImage(null);
      setError(null);
    } else {
      setError("Please select a WebP image file.");
    }
  };

  const convertImage = () => {
    if (!webpFile) {
      setError("Please select a WebP file first.");
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
          const dataUrl = canvas.toDataURL(`image/${format}`);
          setConvertedImage(dataUrl);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(webpFile);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">WebP to Image Converter</h1>
        <p className="text-lg text-gray-600">Convert your WebP images to JPG or PNG format.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-full mb-4">
            <Label htmlFor="webp-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">a WebP file</p>
              </div>
              <Input id="webp-upload" type="file" className="hidden" accept="image/webp" onChange={handleFileChange} />
            </Label>
          </div>

          {webpFile && <p className="text-center text-gray-700 mb-4">Selected file: {webpFile.name}</p>}

          <div className="flex items-center justify-center space-x-4 mb-4">
            <Label htmlFor="format-select">Convert to:</Label>
            <Select value={format} onValueChange={(value: "jpg" | "png") => setFormat(value)}>
              <SelectTrigger id="format-select" className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={convertImage} className="w-full" disabled={!webpFile}>
            Convert Image
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
            <h2 className="text-2xl font-bold mb-4">Converted Image</h2>
            <img src={convertedImage} alt="Converted" className="mx-auto rounded-lg shadow-md" />
            <a href={convertedImage} download={`converted.${format}`}>
              <Button className="mt-4">
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
