import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["100", "200", "300", "400", "500"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-head", weight: ["300", "400", "500", "700"] });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["100", "200", "300", "400", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aehi.crelligent.com'),
  title: 'African Enterprise Health Index (AEHI) · Q4 2026 | Crelligent',
  description: 'The first systematic benchmark of enterprise operating health across the Nigerian mid-market. Q4 2026: Nigerian average 44/100. Published quarterly by Crelligent & Lagos Business School.',
  openGraph: { type: 'website', siteName: 'African Enterprise Health Index (AEHI)', images: ['/og/aehi-q4-2026-og.png'] },
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
              "@type": "Dataset",
              name: "African Enterprise Health Index Q4 2026",
              description: "Quarterly benchmark of enterprise operating health across the Nigerian mid-market",
              publisher: { "@type": "Organization", "name": "Crelligent & Company" },
              datePublished: "2026-12-01",
              temporalCoverage: "2026",
              spatialCoverage: "Nigeria",
              license: "https://aehi.crelligent.com/methodology#terms"
            })
          }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
