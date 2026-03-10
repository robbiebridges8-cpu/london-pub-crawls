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
import { useState } from 'react';

const navLinks = [
  { href: '/crawls', label: 'CRAWLS' },
  { href: '/map', label: 'MAP' },
  { href: '/about', label: 'ABOUT' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b-2 border-[var(--ink)]"
      maxWidth="xl"
      height="4rem"
    >
      {/* Logo */}
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="font-label text-xl tracking-[0.03em]">
            <span className="text-[var(--claret)]">LONDON PUB CRAWLS</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden md:flex gap-8" justify="end">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <NavbarItem key={link.href}>
              <Link
                href={link.href}
                className={`font-label text-sm uppercase tracking-[0.03em] transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--claret)]'
                    : 'text-[var(--ink)] hover:text-[var(--claret)]'
                }`}
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
      <NavbarMenu className="bg-[var(--background)] pt-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <NavbarMenuItem key={link.href} className="py-4">
              <Link
                href={link.href}
                className={`font-display text-3xl font-bold ${
                  isActive
                    ? 'text-[var(--claret)]'
                    : 'text-[var(--ink)]'
                }`}
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
