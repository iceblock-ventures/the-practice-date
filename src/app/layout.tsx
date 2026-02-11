import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Practice Date — AI Flirt Coach",
  description:
    "Practice flirting with an AI voice coach. Pick a scenario, have a real conversation, and get honest feedback. No judgment, just reps.",
  openGraph: {
    title: "The Practice Date — AI Flirt Coach",
    description:
      "Practice flirting with an AI voice coach. Get real feedback on your conversation skills.",
    url: "https://thepracticedate.com",
    siteName: "The Practice Date",
    type: "website",
    images: [
      {
        url: "https://thepracticedate.com/og.png",
        width: 1536,
        height: 1024,
        alt: "The Practice Date — Practice flirting. Get real feedback.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Practice Date — AI Flirt Coach",
    description:
      "Practice flirting with an AI voice coach. Get real feedback on your conversation skills.",
    images: ["https://thepracticedate.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
