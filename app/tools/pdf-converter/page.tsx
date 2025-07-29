'use client';

import { useState } from 'react';
import { FileText, Upload, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { BackButton } from '@/components/ui/back-button';

export default function PdfConverterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setPdfUrl(null);
    }
  };

  const handleConvert = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target?.result as string;
        if (imgData) {
          const pdf = new jsPDF();
          const img = new Image();
          img.src = imgData;
          img.onload = () => {
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
            pdf.addImage(imgData, selectedFile.type.split('/')[1].toUpperCase(), 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
          };
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
      <div className="container mx-auto">
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">PDF Converter</h1>
          <p className="text-lg text-gray-600 mt-2">Convert your images to PDF.</p>
        </div>
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
              <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">{selectedFile ? selectedFile.name : 'Click or drag to upload a file'}</p>
              </label>
            </div>
            <button
              onClick={handleConvert}
              disabled={!selectedFile}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FileText className="w-5 h-5 mr-2 inline-block" />
              Convert to PDF
            </button>
            {pdfUrl && (
              <a
                href={pdfUrl}
                download="converted.pdf"
                className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700"
              >
                <Download className="w-5 h-5 mr-2 inline-block" />
                Download PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}