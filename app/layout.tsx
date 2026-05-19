import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  weight: ["400", "700"],
  variable: "--font-barlow",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClydeFitness | Train Hard. Fight Smart.",
  description: "Certified combat-based fitness coaching in Nairobi by Coach Clyde. Expertise in Taebo, Kickboxing, Boxing, HIIT, and personal training.",
  openGraph: {
    title: "ClydeFitness | Coach Clyde",
    description: "Train with Nairobi's #1 Combat Coach. Structured, results-driven fitness sessions.",
    url: "https://clydefitness.co.ke",
    siteName: "ClydeFitness",
    images: [
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 800,
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClydeFitness | Train Hard. Fight Smart.",
    description: "Combat-based fitness coaching in Nairobi. Taebo, Kickboxing, Boxing, HIIT, and Insanity.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${barlow.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-[#F5F5F5] font-dm-sans">{children}</body>
    </html>
  );
}
