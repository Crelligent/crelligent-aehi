import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["100", "200", "300", "400", "500"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-head", weight: ["300", "400", "500", "700"] });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["100", "200", "300", "400", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aehi.crelligent.com'),
  title: 'African Enterprise Health Index (AEHI) | Crelligent',
  description: 'A quarterly benchmark of enterprise operating health across the Nigerian mid-market, scored across five layers from business design to governance. Inaugural edition in preparation; enterprises can take part now.',
  openGraph: { type: 'website', siteName: 'African Enterprise Health Index (AEHI)' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ResearchProject",
              name: "African Enterprise Health Index",
              description: "Quarterly benchmark of enterprise operating health across the Nigerian mid-market. Inaugural edition in preparation.",
              parentOrganization: { "@type": "Organization", "name": "Crelligent & Company", "url": "https://crelligent.com" },
              areaServed: "Nigeria"
            })
          }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-89LVTFH0GF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-89LVTFH0GF');
          `}
        </Script>
      </body>
    </html>
  );
}
