import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-amber-50 border-t border-amber-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <span className="text-xl font-light text-gray-900 font-playfair">La Shiny</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover the pinnacle of luxury skincare with our curated collection of premium products, crafted for your
              most radiant skin.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              {["Products", "Collections", "About Us", "Contact", "FAQ"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Customer Care</h3>
            <div className="space-y-2">
              {["Shipping Info", "Returns", "Size Guide", "Care Instructions", "Track Order"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Stay Updated</h3>
            <p className="text-sm text-gray-600">Subscribe to receive exclusive offers and skincare tips.</p>
            <div className="space-y-2">
              <Input type="email" placeholder="Enter your email" className="border-amber-200 focus:border-amber-400" />
              <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © 2024 La Shiny. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
