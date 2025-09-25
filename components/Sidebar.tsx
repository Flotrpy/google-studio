
import React from 'react';
import type { Page } from '../types';
import { HomeIcon, ProgramsIcon, EventsIcon, PrayersIcon, ContactIcon, AdminIcon } from './icons/Icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: Page;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center px-4 py-3 cursor-pointer rounded-lg transition-colors ${
      isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{label}</span>
  </li>
);

const ISCJLogo: React.FC = () => (
    <div className="bg-white p-2 rounded-md">
        <svg width="60" height="60" viewBox="0 0 100 100" className="text-iscj-blue" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M50 5 L60 20 L50 35 L40 20 Z" />
            <path fill="currentColor" d="M25 30 L50 45 L75 30 L50 60 Z" />
            <rect x="20" y="65" width="60" height="10" fill="currentColor" />
            <rect x="30" y="80" width="40" height="10" fill="currentColor" />
            <text x="50" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white" className="stroke-current">ISCJ</text>
        </svg>
    </div>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { label: Page; icon: React.ReactNode }[] = [
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Programs', icon: <ProgramsIcon /> },
    { label: 'Events', icon: <EventsIcon /> },
    { label: 'Prayers', icon: <PrayersIcon /> },
    { label: 'Contact', icon: <ContactIcon /> },
    { label: 'Admin', icon: <AdminIcon /> },
  ];

  return (
    <aside className="w-64 bg-iscj-blue text-white flex flex-col p-4 shadow-lg">
      <div className="flex justify-center items-center py-6 mb-6">
        <ISCJLogo />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              isActive={currentPage === item.label}
              onClick={() => setCurrentPage(item.label)}
            />
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="flex items-center justify-center p-2 mb-4 bg-green-500 rounded-full h-10 w-10">
          <span className="text-xl font-bold text-white">G</span>
        </div>
        <p className="text-xs text-blue-300 text-center">&copy; 2025 ISCJ</p>
      </div>
    </aside>
  );
};

export default Sidebar;
