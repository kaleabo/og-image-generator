"use client";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import xss from "xss";
import { FormData, Design } from '@/types';
import PatternBackground from '@/components/PatternBackground';

interface LivePreviewProps {
  formData: FormData;
  ogImageRef: React.RefObject<HTMLDivElement>;
}

const LivePreview: React.FC<LivePreviewProps> = ({ formData, ogImageRef }) => {
  const getDesignStyles = () => {
    const styles: Record<Design, string> = {
      classic: "bg-white",
      minimal: "bg-white",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white",
      dark: "bg-gray-900 text-white",
      pattern: "bg-white",
    };
    return styles[formData.design];
  };

  return (
    <div className="w-full space-y-2">
      <Label className="font-semibold">Live Preview</Label>
      <div className="w-full rounded-lg bg-gray-100 p-4">
        <div
          ref={ogImageRef}
          className={`${getDesignStyles()} relative flex w-full flex-col overflow-hidden rounded-lg shadow-lg`}
        >
          {formData.design === "pattern" && <PatternBackground />}
          <div className="relative flex flex-grow flex-col justify-center p-10">
            <Image
              src={
                formData.profilePicture ||
                "/preview-avator.png"
              }
              alt={`Profile picture of ${formData.name}`}
              className={`mb-5 h-24 w-24 rounded-full object-cover ${formData.barColor}`}
              width={500}
              height={500}
            />
            <h1
              className={`mb-2 text-3xl font-extrabold ${
                formData.design === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {formData.name}
            </h1>
            <h2
              className={`mb-4 text-xl font-semibold ${
                formData.design === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {formData.title}
            </h2>
            <div
              className={`prose max-w-2xl ${
                formData.design === "dark" ? "text-gray-400" : "text-gray-700"
              }`}
              dangerouslySetInnerHTML={{
                __html: xss(
                  formData.subtitle.replace(/(\r\n|\n|\r)/g, "<br />"),
                ),
              }}
            />
          </div>
          {formData.design === "classic" && (
            <div className={`h-10 ${formData.barColor}`}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePreview;