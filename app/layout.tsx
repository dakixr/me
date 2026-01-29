import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PostHogProvider } from "../src/components/PostHogProvider";
import { PageTransitionProvider, PageTransitionWrapper } from "../src/components/PageTransition";
import CustomCursor from "../src/components/CustomCursor";

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
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️ </text></svg>"
        />
      </head>
      <body suppressHydrationWarning className={`${inter.className} bg-white dark:bg-dark text-gray-900 dark:text-gray-100 min-h-screen`}>
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
