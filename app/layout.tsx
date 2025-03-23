import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PostHogProvider } from "../src/components/PostHogProvider";
import { PageTransitionProvider, PageTransitionWrapper } from "../src/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

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
      <body suppressHydrationWarning className={`${inter.className} bg-white dark:bg-dark text-gray-900 dark:text-gray-100 min-h-screen`}>
        <PostHogProvider>
          <Providers>
            <PageTransitionProvider>
              <PageTransitionWrapper>
                {children}
              </PageTransitionWrapper>
            </PageTransitionProvider>
          </Providers>
        </PostHogProvider>
      </body>
    </html>
  );
}
