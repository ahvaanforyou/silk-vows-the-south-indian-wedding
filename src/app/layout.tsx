import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cinzel = localFont({
  src: "./fonts/Cinzel-Variable.ttf",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
});

const cormorant = localFont({
  src: "./fonts/CormorantGaramond-Variable.ttf",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

const notoTelugu = localFont({
  src: "./fonts/NotoSerifTelugu-Variable.ttf",
  variable: "--font-noto-telugu",
  weight: "100 900",
  display: "swap",
});

const plusJakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.ttf",
  variable: "--font-jakarta",
  weight: "200 800",
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

