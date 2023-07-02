import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const router = usePathname();
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-10 bg-gray-800 text-white">
      <div className="container mx-auto p-4">
        <nav>
          <ul className="flex space-x-4">
            <li className="grow">
              <Link
                href="/"
                className={
                  router === '/'
                    ? 'flex items-center px-4 py-2 text-blue-300'
                    : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700'
                }
              >
                <span className="ml-2">Products</span>
              </Link>
            </li>
            <li className="grow">
              <Link
                href="/cart"
                className={
                  router.includes('/cart')
                    ? 'flex items-center px-4 py-2 text-blue-300'
                    : 'flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700'
                }
              >
                <span className="ml-2">Carts</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
