'use client';

import React, { useEffect } from 'react';
import { NextUIProvider, Card } from '@nextui-org/react';
import Sidebar from '@/components/sidebar';
import ProductTable from '@/components/productTable';
import Navbar from '@/components/sidebarMobile';

type CartData = {
  id: number;
  products: Array<any>;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};
type UserData = {
  id: number;
  firstName: string;
  lastName: string;
};
type ProductData = {
  brand: string,
  category: string,
  description: string,
  discountPercentage: number,
  id: number,
  images: Array<String>,
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  title: string,
};

export default function CartPage({ params }: { params: { id: number } }) {
  const [carts, setCarts] = React.useState<CartData | null>(null);
  const [user, setUser] = React.useState<UserData[]>([]);
  const [products, setProducts] = React.useState<ProductData[]>([]);
  useEffect(() => {
    const fetchCarts = async () => {
      const response = await fetch(`https://dummyjson.com/carts/${params.id}`);
      const data = await response.json();
      const responseProduct = await fetch('https://dummyjson.com/products?limit=0');
      const dataProduct = await responseProduct.json();
      let arr: UserData[] = [];
      for (let i = 0; i < data.products.length; i++) {
        arr = arr.concat(dataProduct.products.find((x) => x.id == data.products[i].id));
      }
      setCarts(data);
      setProducts(arr);
    };
    const fetchUser = async () => {
      const response = await fetch('https://dummyjson.com/users?limit=0');
      const data = await response.json();
      const filteredData = data.users.map(({ id, firstName, lastName }) => ({
        id,
        firstName,
        lastName,
      }));
      setUser(filteredData);
    };
    fetchUser();
    fetchCarts();
  }, []);
  const columns = [
    {
      key: 'title',
      label: 'Product Name',
    },
    {
      key: 'brand',
      label: 'Brand',
    },
    {
      key: 'price',
      label: 'Price',
    },
    {
      key: 'stock',
      label: 'Stock',
    },
    {
      key: 'category',
      label: 'Category',
    },
  ];
  return (
    <NextUIProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <Navbar />
        <div className="mt-[110px] md:mt-0 w-full sm:w-5/6 bg-white p-4">
          <h2>
            Cart
            {' '}
            {params.id}
          </h2>
          <h3>Details</h3>
          <Card css={{ mb: '20px' }}>
            <Card.Body>
              {!carts ? '' : (
                <div className="grid grid-cols-2">
                  <span>
                    User :
                    {' '}
                    {user.find((obj) => obj.id === carts.userId)?.firstName}
                    {' '}
                    {user.find((obj) => obj.id === carts.userId)?.lastName}
                  </span>
                  <span>
                    # of Item :
                    {` ${carts.totalQuantity}`}
                  </span>
                </div>
              )}
              {!carts ? '' : (
                <div className="grid grid-cols-2">
                  <span>
                    Total Products :
                    {` ${carts.totalProducts}`}
                  </span>
                  <span>
                    Total Amount :
                    {` ${carts.discountedTotal}`}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
          <ProductTable products={products} columns={columns} />
        </div>
      </div>

    </NextUIProvider>
  );
}
