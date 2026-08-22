import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://cyberscope.dev";
const title = "CyberScope — Offline Attack Path Reconstruction";
const description =
  "CyberScope is a local-first cybersecurity application for reconstructing missing attack-path transitions and evaluating evidence strength — without sending the investigation to a cloud analysis service.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · CyberScope",
  },
  description,
  applicationName: "CyberScope",
  keywords: [
    "CyberScope",
    "attack path reconstruction",
    "evidence analysis",
    "security telemetry",
    "local-first security",
    "offline analysis",
    "MITRE ATT&CK",
    "gap detection",
    "digital forensics",
    "SOC tooling",
  ],
  authors: [{ name: "CyberScope" }],
  creator: "CyberScope",
  publisher: "CyberScope",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "CyberScope",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CyberScope — Offline Attack Path Reconstruction & Evidence Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#0a0d12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
