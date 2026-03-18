import Script from "next/script";
import "./globals.css";
import Layout from "@/components/layout";
import { LanguageProvider } from "../contexts/LanguageContext";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Surgi Makers",
  "url": "https://surgimakers.com",
  "logo": "https://surgimakers.com/LOGO_Red__White.png",
  "description": "Premium Surgical Instrument Manufacturer. Our instruments set industry standards, designed to enhance surgical precision and reliability in critical healthcare settings.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "539 W. Commerce St. #3899, Dallas, TX 75208",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75208",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1 (903) 608-9241",
    "contactType": "sales",
    "email": "info@surgimakers.com"
  },
  "sameAs": [
    "https://www.facebook.com/SurgiMakers",
    "https://www.linkedin.com/company/surgi-makers",
    "https://www.instagram.com/surgimakers"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Surgi Makers",
  "image": "https://surgimakers.com/Surgi_Makers.png",
  "url": "https://surgimakers.com",
  "telephone": "+1 (903) 608-9241",
  "email": "info@surgimakers.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "539 W. Commerce St. #3899, Dallas, TX 75208",
    "addressLocality": "Dallas",
    "addressRegion": "TX",
    "postalCode": "75208",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "32.7935",
      "longitude": "-96.8067"
    },
    "geoRadius": "50000"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "128",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export const metadata = {
  title: {
    default: "Surgi Makers | Premium Dental & Surgical Instruments Manufacturer",
    template: "%s | Surgi Makers"
  },
  description: "Premium Surgical Instrument Manufacturer. ISO 13485 & CE Certified. Leading manufacturer of dental, surgical, and beauty instruments trusted by healthcare professionals worldwide.",
  keywords: [
    "surgical instruments",
    "dental instruments",
    "beauty instruments",
    "medical instruments",
    "surgical tools",
    "dental tools",
    "surgical instrument manufacturer",
    "ISO 13485",
    "CE certified instruments",
    "precision surgical instruments",
    "surgi makers"
  ],
  authors: [{ name: "Surgi Makers", url: "https://surgimakers.com" }],
  creator: "Surgi Makers",
  publisher: "Surgi Makers",
  applicationName: "Surgi Makers",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://surgimakers.com"),
  icons: {
    icon: "/LOGO_Red__White.png",
    shortcut: "/LOGO_Red__White.png",
    apple: "/LOGO_Red__White.png"
  },
  alternates: {
    canonical: "https://surgimakers.com",
    languages: {
      'en': 'https://surgimakers.com',
      'es': 'https://surgimakers.com/es',
      'fr': 'https://surgimakers.com/fr',
      'de': 'https://surgimakers.com/de'
    }
  },
  openGraph: {
    title: "Surgi Makers | Premium Dental & Surgical Instruments",
    description: "Premium Surgical Instrument Manufacturer. ISO 13485 & CE Certified. Leading manufacturer of dental, surgical, and beauty instruments trusted worldwide.",
    url: "https://surgimakers.com",
    siteName: "Surgi Makers",
    images: [
      {
        url: "https://surgimakers.com/OG_image.png",
        width: 1200,
        height: 630,
        alt: "Surgi Makers - Premium Surgical Instruments"
      }
    ],
    locale: "en_US",
    type: "website",
    localeAlternate: ['en_US', 'es_ES', 'fr_FR', 'de_DE']
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgi Makers | Premium Dental & Surgical Instruments",
    description: "Premium Surgical Instrument Manufacturer. ISO 13485 & CE Certified.",
    site: "@surgimakers",
    creator: "@surgimakers",
    images: ["https://surgimakers.com/OG_image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    },
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || ""
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    yandex: process.env.YANDEX_VERIFICATION || ""
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="en" />
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://cdn.trustpilot.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-TMTK67RR');`
          }}
        />
      </head>
      <body className="antialiased notranslate">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TMTK67RR"
            height="0"
            width="0"
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        <LanguageProvider>
          <Layout>{children}</Layout>
        </LanguageProvider>
      </body>
    </html>
  );
}
