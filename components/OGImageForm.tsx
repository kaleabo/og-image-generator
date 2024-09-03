"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Loader2 } from "lucide-react";
import { FormData, Design, BarColor } from '@/types';

interface OGImageFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleDownload: () => Promise<void>;
  isGenerating: boolean;
}

const OGImageForm: React.FC<OGImageFormProps> = ({
  formData,
  setFormData,
  handleDownload,
  isGenerating,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 lg:w-[60%]">
      {["name", "title", "subtitle"].map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field} className="font-semibold">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          {field === "subtitle" ? (
            <Textarea
              id={field}
              name={field}
              value={formData[field as keyof FormData]}
              onChange={handleInputChange}
              placeholder={`Enter your ${field}`}
              className="rounded-lg border shadow-sm focus:ring focus:ring-blue-300"
            />
          ) : (
            <Input
              id={field}
              name={field}
              value={formData[field as keyof FormData]}
              onChange={handleInputChange}
              placeholder={`Enter your ${field}`}
              className="rounded-lg border shadow-sm focus:ring focus:ring-blue-300"
            />
          )}
        </div>
      ))}
      <div className="space-y-2">
        <Label htmlFor="profilePicture" className="font-semibold">
          Profile Picture
        </Label>
        <Input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="rounded-lg border shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="space-y-2">
        <Label className="font-semibold">Choose your color theme</Label>
        <div className="flex space-x-2">
          {[
            "bg-yellow-500",
            "bg-black",
            "bg-purple-600",
            "bg-blue-600",
            "bg-green-600",
            "bg-rose-600",
          ].map((color) => (
            <button
              key={color}
              className={`h-8 w-8 rounded-full ${color} ${
                formData.barColor === `${color}` ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  barColor: `${color}` as BarColor,
                }))
              }
            />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="design" className="font-semibold">
          Card Design
        </Label>
        <Select
          value={formData.design}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              design: value as Design,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a design" />
          </SelectTrigger>
          <SelectContent>
            {["classic", "minimal", "gradient", "dark", "pattern"].map(
              (design) => (
                <SelectItem key={design} value={design}>
                  {design.charAt(0).toUpperCase() + design.slice(1)}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleDownload}
        className="w-full rounded-lg text-white shadow-md"
        size="lg"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Download className="mr-2 h-4 w-4" />
        )}
        {isGenerating ? "Generating..." : "Download Image"}
      </Button>
    </div>
  );
};

export default OGImageForm;