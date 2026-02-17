import type React from "react";
import type { Metadata } from "next";
import {
  Barlow,
  DM_Sans,
  Inter,
  Poppins,
  Syne,
  Faustina,
  Tajawal,
  Roboto,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../components/theme-provider";
import { Toaster } from "../../components/toaster";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
});
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const DMSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-DMSans",
});
const syne = Syne({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});
const faustina = Faustina({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});
const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Zoo Management System",
  description: "A comprehensive system for managing zoo operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${barlow.variable} ${montserrat.variable} ${roboto.variable} ${DMSans.variable} ${syne.variable} ${faustina.variable} ${tajawal.variable} min-h-screen`}
    >
      <body className="flex-1 flex flex-col min-h-screen">
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
        <Providers>
          {children}
          <Toaster />
        </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
