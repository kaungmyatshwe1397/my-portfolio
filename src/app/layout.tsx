import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaung Myat Shwe | Full Stack Developer",
  description:
    "Full Stack Developer specializing in web development with AI augementation , spec-driven-development and cloud infrastructure",
  keywords: ["developer", "portfolio", "full stack", "react", "next.js","JavaScript"],
  authors: [{ name: "Kaung Myat Shwe" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kaung Myat Shwe Portfolio",
    title: "Kaung Myat Shwe | Full Stack Developer",
    description: "Full Stack Developer specializing in AI augementation and Cloud infrastructure",
  },
};

// Root layout with theme provider and tooltip provider
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
