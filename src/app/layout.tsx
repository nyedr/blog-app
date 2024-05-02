import "@/styles/globals.css";
import { Metadata } from "next";

import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "./theme-provider";
import SiteHeader from "@/components/site-header";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/config";
import MobileHeader from "@/components/mobile-header";
import SessionProvider from "./session-provider";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession();

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <MobileHeader />
                <div className="flex-1">{children}</div>
              </div>
            </SessionProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
