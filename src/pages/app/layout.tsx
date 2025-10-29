import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "BAQAJ - تطبيق شامل لكل احتياجاتك",
  description: "تطبيق شامل لكل احتياجاتك في مكان واحد - منتجات، خدمات، حجوزات",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${sourceSans.style.fontFamily};
  --font-sans: ${sourceSans.variable};
  --font-serif: ${playfair.variable};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
