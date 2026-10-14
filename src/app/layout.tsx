import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Noto_Serif_Telugu, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoTelugu = Noto_Serif_Telugu({
  variable: "--font-noto-telugu",
  subsets: ["telugu"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sravya-karthik-wedding.com"),
  title: "Sravya & Karthik — South Indian Wedding Invitation | కల్యాణ వైభోగమే",
  description:
    "We joyfully invite you to celebrate the traditional Telugu Hindu wedding of Sravya Reddy and Karthik Varma. Join us with your family and blessings.",
  openGraph: {
    title: "Sravya & Karthik | Traditional Wedding Invitation",
    description: "॥ శ్రీ గణేశాయ నమః ॥ You are cordially invited to celebrate our wedding.",
    images: [
      {
        url: "/images/og-wedding-card.jpg",
        width: 1200,
        height: 630,
        alt: "Sravya & Karthik Wedding Invitation",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${cinzel.variable} ${cormorant.variable} ${notoTelugu.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FFF8E9] text-[#4A0B1A] font-sans selection:bg-[#C9A45C]/30 selection:text-[#6D1429]">
        {children}
      </body>
    </html>
  );
}

