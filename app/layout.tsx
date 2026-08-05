import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, DM_Sans } from "next/font/google";
import Script from "next/script";
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
  title: {
    default: "Coach Clyde | Combat Fitness Coaching Nairobi",
    template: "%s | Coach Clyde Fitness",
  },
  description: "Nairobi's premier combat-based fitness coach. Taebo, Kickboxing, Boxing, HIIT, Insanity & Floor Training. Group classes and personal training.",
  keywords: ["fitness coach Nairobi", "boxing coach Nairobi", "HIIT training Nairobi", "Taebo Nairobi", "kickboxing Nairobi", "personal trainer Nairobi", "combat fitness Kenya", "Coach Clyde"],
  authors: [{ name: "Coach Clyde" }],
  creator: "Coach Clyde",
  metadataBase: new URL("https://www.clydefitness.co.ke"),
  alternates: {
    canonical: "https://www.clydefitness.co.ke",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.clydefitness.co.ke",
    siteName: "Coach Clyde Fitness",
    title: "Coach Clyde | Combat Fitness Coaching Nairobi",
    description: "Nairobi's premier combat-based fitness coach. Taebo, Kickboxing, Boxing, HIIT, Insanity & Floor Training.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coach Clyde Fitness - Combat Training Nairobi",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coach Clyde | Combat Fitness Coaching Nairobi",
    description: "Nairobi's premier combat-based fitness coach. Book a session today.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "DHJdarnsV8lMLp0jeRks01sPb86xchi-etw1huZdp2o",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "Coach Clyde Fitness",
  alternateName: "Coach Clyde",
  url: "https://www.clydefitness.co.ke",
  logo: "https://www.clydefitness.co.ke/opengraph-image.png",
  image: "https://res.cloudinary.com/di5ga8z9i/image/upload/v1779111725/clyde1_dwm4rs.jpg",
  description:
    "Nairobi's combat-based fitness coach offering Taebo, Kickboxing, Boxing, HIIT, Insanity and Floor Training. Group classes and 1-on-1 personal training.",
  priceRange: "KES 2,000 - KES 22,000",
  telephone: "+254759593696",
  email: "clydeokothotieno@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: {
    "@type": "City",
    name: "Nairobi",
  },
  sameAs: [
    "https://instagram.com/coachclyde_fitness",
    "https://www.tiktok.com/@theprettymfmehn",
  ],
  founder: {
    "@type": "Person",
    name: "Coach Clyde",
    jobTitle: "Combat Fitness Coach",
    knowsAbout: [
      "Taebo",
      "Kickboxing",
      "Boxing",
      "HIIT",
      "Insanity Training",
      "Floor Training",
      "First Aid",
      "CPR",
      "Emergency Response",
    ],
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Drop-In Group Session",
      price: "2500",
      priceCurrency: "KES",
    },
    {
      "@type": "Offer",
      name: "Group Monthly (4 sessions)",
      price: "9000",
      priceCurrency: "KES",
    },
    {
      "@type": "Offer",
      name: "1-on-1 Personal Training",
      price: "2000",
      priceCurrency: "KES",
    },
    {
      "@type": "Offer",
      name: "Elite Coaching (12 sessions/month)",
      price: "22000",
      priceCurrency: "KES",
    },
  ],
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
      <head>
        {/* Schema.org structured data — ExerciseGym (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZKNY5JTXK4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZKNY5JTXK4');
        `}
      </Script>
      <body className="min-h-full flex flex-col bg-[#080808] text-[#F5F5F5] font-dm-sans">{children}</body>
    </html>
  );
}
