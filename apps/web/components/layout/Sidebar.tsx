'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, Star, Settings } from 'lucide-react';
import { cn } from '@stanpi/ui';

const items = [
  { href: '/markets', label: 'Markets', icon: Home },
  { href: '/watchlist', label: 'Watchlist', icon: Star },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const c = localStorage.getItem('sidebar-collapsed');
    setCollapsed(c === '1');
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  return (
    <aside
      className={cn(
        'h-screen border-r bg-white dark:bg-gray-900 transition-all',
        collapsed ? 'w-16' : 'w-48',
      )}
    >
      <button
        className="p-2 text-xs"
        aria-label="Toggle sidebar"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '>>' : '<<'}
      </button>
      <nav className="mt-4 flex flex-col gap-2">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
