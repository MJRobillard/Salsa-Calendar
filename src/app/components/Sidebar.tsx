'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Image as ImageIcon, 
  Info, 
  Mail, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Calendar size={20} />, label: 'Events', href: '/events' },
  { icon: <BarChart3 size={20} />, label: 'Progress', href: '/progress' },
  { icon: <ImageIcon size={20} />, label: 'Media', href: '/media' },
  { icon: <Info size={20} />, label: 'About', href: '/about' },
  { icon: <Mail size={20} />, label: 'Contact', href: '/contact' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-brand-charcoal text-brand-gold rounded-lg border border-brand-maroon hover:bg-brand-maroon transition-colors shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 relative overflow-hidden bg-gradient-to-b from-brand-charcoal via-brand-paper to-brand-charcoal border-r border-brand-maroon
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
        
        {/* Logo/Brand - Clickable to dashboard */}
        <div className="relative p-6 border-b border-brand-maroon/30">
          <Link href="/dashboard" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
            <div className="relative w-10 h-10">
              <Image 
                src="/logo.png" 
                alt="Salsa Club Logo" 
                fill
                className="drop-shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-brand-gold">Salsa @ Cal</h1>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="relative p-4 space-y-2" role="navigation">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group backdrop-blur-sm
                  ${isActive 
                    ? 'bg-brand-maroon/80 text-white shadow-glow border border-brand-gold/30' 
                    : 'text-brand-sand hover:bg-brand-maroon/20 hover:text-brand-gold border border-transparent hover:border-brand-maroon/20'
                  }
                  focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal
                `}
                tabIndex={0}
              >
                <span className={`
                  ${isActive ? 'text-brand-gold' : 'text-brand-sand group-hover:text-brand-gold'}
                  transition-colors duration-200
                `}>
                  {item.icon === <ImageIcon size={20} /> ? <ImageIcon size={20} /> : item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="relative absolute bottom-0 left-0 right-0 p-4 border-t border-brand-maroon/30">
          <p className="text-sm text-brand-sand text-center">
            Dance • Learn • Grow
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
