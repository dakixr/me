import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PostHogProvider } from "../src/components/PostHogProvider";
import { PageTransitionProvider, PageTransitionWrapper } from "../src/components/PageTransition";
import dynamic from "next/dynamic";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

const CustomCursor = dynamic(() => import("../src/components/CustomCursor"), {
  ssr: false,
  loading: () => null,
});

export const metadata: Metadata = {
  title: "Daniel Rodríguez Mariblanca | Portfolio",
  description: "Personal portfolio and CV of Daniel Rodríguez Mariblanca, Senior Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️ </text></svg>"
        />
        <link rel="preconnect" href="https://eu.i.posthog.com" />
        <link rel="preconnect" href="https://eu-assets.i.posthog.com" />
        <link rel="dns-prefetch" href="https://eu.i.posthog.com" />
        <link rel="dns-prefetch" href="https://eu-assets.i.posthog.com" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans bg-light-50 dark:bg-dark-DEFAULT text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300`}>
        <PostHogProvider>
          <Providers>
            <PageTransitionProvider>
              <PageTransitionWrapper>
                <CustomCursor />
                {children}
              </PageTransitionWrapper>
            </PageTransitionProvider>
          </Providers>
        </PostHogProvider>
      </body>
    </html>
  );
}
