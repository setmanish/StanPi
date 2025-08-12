'use client';
import { Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-12 w-full items-center justify-between border-b bg-white px-4 dark:bg-gray-900">
      <div className="flex items-center gap-2">
        <Search size={16} />
        <input
          placeholder="Search..."
          className="bg-transparent focus:outline-none"
          aria-label="Global search"
        />
      </div>
      <ThemeToggle />
    </header>
  );
}
