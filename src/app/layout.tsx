import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "File Manager",
  description: "Created in NEXT.JS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-500 relative lg:pt-10">
          <div className="w-screen lg:w-[1000px] border mx-auto rounded-lg overflow-hidden">
            <div className="flex justify-center items-center bg-white py-3 shadow-md">
              <p className="text-3xl font-semibold">Your Explorer</p>
            </div>
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
