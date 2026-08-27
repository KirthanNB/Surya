import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project SURYA | Zero-Filing Proactive Citizen Intelligence",
  description: "The best RTI is the one you never had to file. A paradigm shift in transparency governance with proactive public search, collective campaigns, and live PIO accountability clocks.",
  keywords: [
    "RTI Act 2005",
    "Section 4 Proactive Disclosure",
    "Project SURYA",
    "Civic Tech India",
    "Transparency Governance",
    "Information Commission Precedents",
    "PIO Accountability"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased min-h-screen selection:bg-[#FF6B35]/20 selection:text-[#FF6B35]">
        {children}
      </body>
    </html>
  );
}
