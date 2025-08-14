'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Image, 
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
  { icon: <Image size={20} />, label: 'Media', href: '/media' },
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-brand-charcoal text-brand-gold rounded-lg border border-brand-maroon hover:bg-brand-maroon transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-brand-charcoal border-r border-brand-maroon
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-brand-maroon">
          <h1 className="text-2xl font-bold text-brand-gold">Salsa @ Cal</h1>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2" role="navigation">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-brand-maroon text-white shadow-glow' 
                    : 'text-brand-sand hover:bg-brand-maroon/20 hover:text-brand-gold'
                  }
                  focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal
                `}
                tabIndex={0}
              >
                <span className={`
                  ${isActive ? 'text-brand-gold' : 'text-brand-sand group-hover:text-brand-gold'}
                  transition-colors duration-200
                `}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-brand-maroon">
          <p className="text-sm text-brand-sand text-center">
            Dance • Learn • Grow
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
