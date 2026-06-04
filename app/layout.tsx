import type { Metadata } from "next";
import { Playfair_Display, Hind_Siliguri, DM_Sans, Syne, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";

// Load Theme A Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

// Load Theme B Fonts
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700"],
});

// Load Bengali Font (Unified)
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "দৃষ্টি কম্পিউটার প্রশিক্ষণ ইনস্টিটিউট | BTEB Approved IT Academy",
  description: "দৃষ্টি কম্পিউটার প্রশিক্ষণ ইনস্টিটিউট (Dristy Computer Training Institute) is a government-approved computer training center in Tangail, Bangladesh. Offical BTEB registrations, offering professional design and office applications certifications.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`
        ${playfair.variable} 
        ${dmSans.variable} 
        ${syne.variable} 
        ${outfit.variable} 
        ${hindSiliguri.variable}
      `}
    >
      <body className="antialiased selection:bg-accent/30 selection:text-white">
        <ThemeProvider>
          {/* Custom glowing magnetic follower cursor */}
          <CustomCursor />
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
