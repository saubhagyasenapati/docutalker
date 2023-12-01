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
     
   <iframe
  src={pdf_url}
  className={`w-full h-full`}
  // onLoad={handleLoad}
  title="PDF Viewer"
></iframe>

    </div>
  );
};

export default PDFViewer;
