'use client';

import React from 'react';
import Product from '@/components/product';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/sidebarMobile';
import Sidebar from '@/components/sidebar';

export default function Home() {
  return (
    <NextUIProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <Navbar />
        <div className="mt-[110px] md:mt-0 w-full sm:w-5/6 bg-white p-4">
          <h2>Products</h2>
          <Product />
        </div>
      </div>

    </NextUIProvider>
  );
}
