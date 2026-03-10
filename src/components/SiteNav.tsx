'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#crawls', label: 'Crawls' },
  { href: '#about', label: 'About' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-homepage, links should go to homepage sections
  const isHomepage = pathname === '/';

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--background)]/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      maxWidth="xl"
      height="4rem"
      isBlurred={false}
    >
      {/* Logo */}
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            {/* Pint Glass Icon */}
            <svg
              className="w-6 h-6 text-[var(--gold)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 3h14l-1.5 15.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5L5 3z" />
              <path d="M7 3V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1" fill="var(--background)" />
              <ellipse cx="12" cy="5" rx="5" ry="1.5" fill="var(--background)" opacity="0.3" />
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-[var(--ink)]">
              London Crawling
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden md:flex gap-8" justify="end">
        {navLinks.map((link) => {
          const href = isHomepage ? link.href : `/${link.href}`;
          return (
            <NavbarItem key={link.href}>
              <Link
                href={href}
                className="font-label text-sm uppercase tracking-[0.05em] text-[var(--ink)] hover:text-[var(--claret)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="text-[var(--ink)]"
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[var(--background)]/95 backdrop-blur-md pt-8">
        {navLinks.map((link) => {
          const href = isHomepage ? link.href : `/${link.href}`;
          return (
            <NavbarMenuItem key={link.href} className="py-4">
              <Link
                href={href}
                className="font-display text-3xl font-bold text-[var(--ink)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
