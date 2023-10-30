"use client";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    // This function will be called when the iframe finishes loading the PDF
    setIsLoading(false);
    toast.success("PDF loaded!");
  };

  return (
    <div className="w-full h-full relative">
      {isLoading && (
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
       <Loader2 className="w-6 h-6 animate-spin"/>
       <p className="text-sm font-semibold">Issue with PDFPreview,Please continue with prompt</p>
   </div>
      )}
      <iframe
        src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
        className={`w-full h-full ${isLoading ? "hidden" : ""}`}
        onLoad={handleLoad}
      ></iframe>
    </div>
  );
};

export default PDFViewer;
