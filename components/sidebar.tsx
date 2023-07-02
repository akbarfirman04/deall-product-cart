'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const router = usePathname();
  return (
    <div className="hidden md:inline bg-gray-800 text-white w-1/6">
      <div className="p-4" />

      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link href="/" className={router === '/' ? 'flex items-center px-4 py-2 text-gray-300 bg-gray-700' : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700'}>
              <span className="ml-2">Products</span>
            </Link>
          </li>
          <li>
            <Link href="/cart" className={router.includes('/cart') ? 'flex items-center px-4 py-2 text-gray-300 bg-gray-700' : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700'}>
              <span className="ml-2">Carts</span>
            </Link>
          </li>
          <li />
        </ul>
      </nav>
    </div>
  );
}
