export type Design = "classic" | "minimal" | "gradient" | "dark" | "pattern";
export type BarColor =
  | "bg-yellow-500"
  | "bg-black"
  | "bg-purple-600"
  | "bg-blue-600"
  | "bg-green-600"
  | "bg-rose-600";

export interface FormData {
  name: string;
  title: string;
  subtitle: string;
  profilePicture: string;
  barColor: BarColor;
  design: Design;
}