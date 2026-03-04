import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarity Score | Psychage",
  description: "Mental wellness assessment using validated clinical instruments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased font-body bg-bg-primary text-text-primary`}>
        <Providers>
          <div className="noise-overlay"></div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
