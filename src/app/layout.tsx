import type { Metadata } from "next";
import { Poppins, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./itl.css";

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ivan Teo Law Firm",
};

// Marks the page as script-enabled before first paint so reveal animations do
// not flash. The itl-* styles only hide content under .js .site-main.
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG" data-scroll-behavior="smooth" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
