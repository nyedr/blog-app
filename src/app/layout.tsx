import "@/styles/globals.css";
import { Metadata } from "next";

import { cn } from "@/lib/utils";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "./theme-provider";
import SiteHeader from "@/components/site-header";
import { Lexend_Deca } from "next/font/google";
import { siteConfig } from "@/lib/config";
import SessionProvider from "./session-provider";
import { getServerSession } from "next-auth";
import QueryProvider from "./query-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const lexendDeca = Lexend_Deca({
  weight: "400",
  subsets: ["latin"],
});

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
            lexendDeca.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>
              <QueryProvider>
                <div className="relative flex min-h-screen h-full flex-col">
                  <SiteHeader />
                  <div className="flex-1 h-full">{children}</div>
                </div>
              </QueryProvider>
              <Toaster />
            </SessionProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
