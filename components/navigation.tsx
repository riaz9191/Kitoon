"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navItems = [
    { name: "হোম", href: "/" },
    { name: "কনভার্ট করুন", href: "/convert" },
    // { name: "All Tools", href: "/all-tools" },
  ];

  return (
    <nav className='sticky top-0 z-50 bg-gradient-to-r from-blue-50 via-white to-indigo-50/95 backdrop-blur-sm border-b border-blue-100'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>BC</span>
            </div>
            <span className='text-xl font-light text-gray-900 font-playfair'>
              বাংলা কনভার্টার
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='sm' className='md:hidden'>
                <Menu className='w-4 h-4' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <div className='flex flex-col space-y-4 mt-8'>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='text-lg text-gray-700 hover:text-amber-600 transition-colors'
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
