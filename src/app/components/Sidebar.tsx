'use client'

import React from 'react';
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
  User,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  isCollapsed?: boolean;
  onCollapseToggle?: () => void;
}

const sidebarItems: SidebarItem[] = [
  { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Calendar size={20} />, label: 'Events', href: '/events' },
  { icon: <ImageIcon size={20} />, label: 'Media', href: '/media' },
  { icon: <Users size={20} />, label: 'Network', href: '/network' },
  { icon: <Info size={20} />, label: 'About', href: '/about' },
  { icon: <Heart size={20} />, label: 'Donate', href: '/donate' },
  { icon: <Mail size={20} />, label: 'Contact', href: '/contact' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
];

export default function Sidebar({ isOpen = false, onToggle, isCollapsed = false, onCollapseToggle }: SidebarProps) {
  const pathname = usePathname();

  const closeSidebar = () => {
    if (isOpen && onToggle) {
      onToggle();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60]
        w-72 md:w-64 overflow-y-auto overflow-x-hidden
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'md:-translate-x-full' : 'md:translate-x-0'}
        md:h-screen md:max-h-screen flex-shrink-0
        ${isCollapsed ? 'md:w-0' : 'md:w-64'}
      `} aria-hidden={isCollapsed && !isOpen ? true : undefined}>
        {/* Main sidebar container with dark blue gradient */}
        <div className="h-full md:h-screen md:max-h-screen">
          <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] h-full md:h-screen md:max-h-screen rounded-xl border border-brand-gold flex flex-col">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none rounded-xl"></div>
            
            {/* Logo/Brand - Clickable to dashboard */}
            <div className={`relative p-4 md:p-6 border-b border-brand-maroon/30 flex-shrink-0 ${
              isCollapsed ? 'md:flex md:justify-center md:p-2' : ''
            }`}>
              <Link href="/dashboard" className={`flex items-center hover:scale-105 transition-transform duration-200 ${
                isCollapsed ? 'md:justify-center' : 'space-x-3'
              }`}>
                <div className={`relative ${isCollapsed ? 'w-6 h-6 md:w-8 md:h-8' : 'w-8 h-8 md:w-10 md:h-10'}`}>
                  <Image 
                    src="/logo.png" 
                    alt="Salsa Club Logo" 
                    fill
                    className="drop-shadow-lg"
                  />
                </div>
                {!isCollapsed && (
                  <h1 className="text-xl md:text-2xl font-bold text-brand-gold">Salsa @ Cal</h1>
                )}
              </Link>
            </div>

            {/* Navigation Items */}
            <nav className="relative p-3 md:p-4 space-y-1 md:space-y-2 flex-1" role="navigation">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`
                      flex items-center space-x-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg
                      transition-all duration-200 group backdrop-blur-sm
                      ${isActive 
                        ? 'bg-brand-maroon/80 text-white shadow-glow border border-brand-gold/30' 
                        : 'text-brand-sand hover:bg-brand-maroon/20 hover:text-brand-gold border border-transparent hover:border-brand-maroon/20'
                      }
                      focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal
                      ${isCollapsed ? 'md:justify-center md:px-2 md:py-2' : ''}
                    `}
                    tabIndex={0}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className={`
                      ${isActive ? 'text-brand-gold' : 'text-brand-sand group-hover:text-brand-gold'}
                      transition-colors duration-200
                    `}>
                      {item.icon === <ImageIcon size={20} /> ? <ImageIcon size={isCollapsed ? 16 : 18} className="md:w-4 md:h-4" /> : 
                        React.cloneElement(item.icon as React.ReactElement, { 
                          size: isCollapsed ? 16 : 18, 
                          className: "md:w-4 md:h-4" 
                        })
                      }
                    </span>
                    {!isCollapsed && (
                      <span className="font-medium text-sm md:text-base">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop-only Collapse Button */}
            {onCollapseToggle && (
              <div className="hidden md:block p-3 md:p-4 flex-shrink-0">
                <button
                  onClick={onCollapseToggle}
                  className={`w-full flex items-center justify-center p-3 bg-brand-maroon/20 hover:bg-brand-maroon/40 text-brand-gold hover:text-white border border-brand-maroon/30 hover:border-brand-gold/50 rounded-lg transition-all duration-200 backdrop-blur-sm group ${
                    isCollapsed ? 'md:p-2' : ''
                  }`}
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  <div className="flex items-center space-x-2">
                    {isCollapsed ? (
                      <ChevronRight size={16} className="text-brand-gold group-hover:text-white transition-colors" />
                    ) : (
                      <>
                        <ChevronLeft size={20} className="text-brand-gold group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium">Collapse</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="relative p-3 md:p-4 border-t border-brand-maroon/30 flex-shrink-0">
              {!isCollapsed && (
                <p className="text-xs md:text-sm text-brand-sand text-center">
                  Dance • Learn • Grow
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-[55] backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
