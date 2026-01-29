import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PostHogProvider } from "../src/components/PostHogProvider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-jetbrains-mono",
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
      <body suppressHydrationWarning className={`${jetbrainsMono.variable} font-mono bg-light dark:bg-dark text-dark dark:text-light min-h-screen`}>
        <PostHogProvider>
          <Providers>
            {children}
          </Providers>
        </PostHogProvider>
      </body>
    </html>
  );
}
