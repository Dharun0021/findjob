import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SiteNav } from "../components/Navbar";
import { ThemeProvider } from "../lib/theme-context";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Job Finder",
  description: "Find your dream job",
  icons: {
    icon: "@/public/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SiteNav />
          <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 pt-20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
