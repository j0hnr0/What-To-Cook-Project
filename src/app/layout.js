import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "What to Cook",
  description: "Don't know what to cook? We got you covered!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f43f5e]">{children}</body>
    </html>
  );
}
