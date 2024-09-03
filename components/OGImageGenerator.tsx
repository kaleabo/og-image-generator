"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";
import Header from "@/components/Header";
import OGImageForm from "@/components/OGImageForm";
import LivePreview from "@/components/LivePreview";
import { FormData } from "@/types";

const OGImageGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "EthiopiaTech",
    title: "Innovative Ethiopian Developer",
    subtitle: "Creating unique OG images inspired by Ethiopian culture.",
    profilePicture: "",
    barColor: "bg-yellow-500",
    design: "classic",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const ogImageRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    if (ogImageRef.current) {
      const canvas = await html2canvas(ogImageRef.current, {
        scale: 2,
        width: ogImageRef.current.offsetWidth,
        height: ogImageRef.current.offsetHeight,
        backgroundColor: null, // This ensures transparency
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "og-image.png";
      link.click();
    }
    setIsGenerating(false);
  };
  return (
    <div>
      <Header />
      <div className="p-6">
        <Card className="mx-auto w-full max-w-[90rem] overflow-hidden border-0 shadow-none">
          <CardContent className="flex flex-col space-y-6 bg-white p-6 md:flex-row md:space-x-6 md:space-y-0">
            <OGImageForm
              formData={formData}
              setFormData={setFormData}
              handleDownload={handleDownload}
              isGenerating={isGenerating}
            />
            <LivePreview formData={formData} ogImageRef={ogImageRef} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OGImageGenerator;
