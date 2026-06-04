import type { Metadata } from "next";
import { DM_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const fontHeading = Orbitron({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "700", "900"],
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dristy Computer Training Institute | Government Approved IT Education",
  description: "Dristy Computer Training Institute is a government-approved computer training center in Bangladesh. Elevate your IT skills with our certified courses in Web Design, Software Development, Graphic Design, and Office Applications.",
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
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body className="antialiased selection:bg-primary/30 selection:text-primary">
        {/* Film grain noise overlay */}
        <div className="grain-container">
          <div className="grain-overlay" />
        </div>
        
        {/* Premium glowing custom cursor follower */}
        <CustomCursor />
        
        {children}
      </body>
    </html>
  );
}
