'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Image as ImageIcon, User, Mail, Heart, Settings, Users, GraduationCap } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';

interface BottomNavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

function BottomNavItem({ icon, label, href, isActive, onClick }: BottomNavItemProps) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center space-y-1 p-1.5 rounded-lg transition-all duration-200 w-full ${
          isActive
            ? 'text-brand-gold bg-brand-maroon/20'
            : 'text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/10'
        }`}
      >
        <div className="text-lg">{icon}</div>
        <span className="text-xs font-medium leading-tight text-center">{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`flex flex-col items-center space-y-1 p-1.5 rounded-lg transition-all duration-200 ${
        isActive
          ? 'text-brand-gold bg-brand-maroon/20'
          : 'text-brand-sand hover:text-brand-gold hover:bg-brand-maroon/10'
      }`}
    >
      <div className="text-lg">{icon}</div>
      <span className="text-xs font-medium leading-tight text-center">{label}</span>
    </Link>
  );
}

export default function BottomNavigation() {
  const pathname = usePathname();
  const { user, signIn } = useFirebase();

  const handleNetworkClick = () => {
    if (user) {
      window.location.href = '/network';
    } else {
      window.location.href = '/signin';
    }
  };

  const handleProfileClick = () => {
    if (user) {
      window.location.href = '/profile';
    } else {
      window.location.href = '/signin';
    }
  };

  const navItems = [
    { icon: <Home size={18} />, label: 'Home', href: '/' },
    { icon: <Calendar size={18} />, label: 'Events', href: '/events' },
    { icon: <GraduationCap size={18} />, label: 'Learn', href: '/media' },
    {
      icon: <Users size={18} />,
      label: 'Network',
      href: '/network',
      onClick: user ? undefined : handleNetworkClick,
    },
    {
      icon: <User size={18} />,
      label: 'Profile',
      href: '/profile',
      onClick: user ? undefined : handleProfileClick,
    },
    { icon: <Mail size={18} />, label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-brand-charcoal to-brand-charcoal/95 border-t border-brand-maroon/30 backdrop-blur-lg md:hidden z-50">
      <div className="grid grid-cols-6 gap-1 p-2">
        {navItems.map((item) => (
          <BottomNavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
}