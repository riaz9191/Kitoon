import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingAIButton } from "@/components/floating-ai-button"
import { CartProvider } from "@/components/cart-provider"
import { MouseFollower } from "@/components/mouse-follower"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Bangla Text Converter",
  description: "A simple tool to convert Bangla text.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <Navigation />
            <main className="">{children}</main>
            <MouseFollower /> 
            {/* <Footer /> */}
            {/* <FloatingAIButton /> */}
            {/* <Toaster /> */}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
