'use client';

import React, { useEffect } from 'react';
import {
  Input, Card, Checkbox, Modal, Button, Text,
} from '@nextui-org/react';
import ProductTable from '@/components/productTable';

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

export default function Product() {
  const [dataProduct, setProducts] = React.useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<ProductData[]>([]);
  const [keyword, setKeyword] = React.useState('');
  const [brandArr, setBrand] = React.useState([]);
  const [categoryArr, setCategory] = React.useState([]);
  const [selectedBrand, setSelectedBrand] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://dummyjson.com/products?limit=0');
      const data = await response.json();
      const brand = [...new Map(data.products.map((v) => [v.brand, v])).values()]
        .map((item) => item.brand);
      const category = [...new Map(data.products.map((v) => [v.category, v])).values()]
        .map((item) => item.category);
      setBrand(brand);
      setCategory(category);
      setProducts(data.products);
      setFilteredProducts(data.products);
    };

    fetchData();
  }, []);
  const filterAll = (value) => {
    let filtered = dataProduct
      .filter((product) => product.title.toLowerCase().includes(value.search.toLowerCase()));
    if (value.minPrice !== '') {
      filtered = filtered
        .filter((product) => product.price >= parseInt(value.minPrice));
    }
    if (value.maxPrice !== '') {
      filtered = filtered
        .filter((product) => product.price <= parseInt(value.maxPrice));
    }

    if (value.brand.length > 0) {
      let arr: any = [];
      for (let i = 0; i < value.brand.length; i++) {
        const temp = filtered.filter((product) => product.brand === value.brand[i]);
        arr = arr.concat(temp);
      }
      filtered = arr;
    }
    if (value.category.length > 0) {
      let arr: any = [];
      for (let i = 0; i < value.category.length; i++) {
        const temp = filtered.filter((product) => product.category === value.category[i]);
        arr = arr.concat(temp);
      }
      filtered = arr;
    }
    setFilteredProducts(filtered);
  };
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
    filterAll({
      category: selectedCategory,
      brand: selectedBrand,
      search: value,
      minPrice,
      maxPrice,
    });
  };
  const handleFilterBrand = (e) => {
    const value = e;
    setSelectedBrand(value);

    filterAll({
      category: selectedCategory,
      brand: value,
      search: keyword,
      minPrice,
      maxPrice,
    });
  };
  const handleFilterCategory = (e) => {
    const value = e;
    setSelectedCategory(value);

    filterAll({
      category: value,
      brand: selectedBrand,
      search: keyword,
      minPrice,
      maxPrice,
    });
  };
  const handleFilterMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMinPrice(value);
    filterAll({
      category: selectedCategory,
      brand: selectedBrand,
      search: keyword,
      minPrice: value,
      maxPrice,
    });
  };
  const handleFilterMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMaxPrice(value);
    filterAll({
      category: selectedCategory,
      brand: selectedBrand,
      search: keyword,
      minPrice,
      maxPrice: value,
    });
  };

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
    <>
      <div className="flex flex-row-reverse mb-4">
        <Input labelPlaceholder="Search Product" value={keyword} onChange={handleFilter} />
      </div>
      <div className="inline md:hidden">
        <Button
          auto
          shadow
          onPress={handler}
        >
          Filter
        </Button>
      </div>
      <div className="flex mt-2">
        <div className="hidden sm:inline">

          <Card css={{ width: '200px', mr: '20px' }}>
            <Card.Body>
              <h4>Filter</h4>
              <span className="mb-2">Brand</span>
              <Checkbox.Group
                value={selectedBrand}
                onChange={handleFilterBrand}
                css={{ mh: '200px', oy: 'scroll' }}
                className="mb-5"
              >
                {brandArr.map((x) => (
                  <Checkbox size="xs" value={x}>{x}</Checkbox>
                ))}
              </Checkbox.Group>
              <span className="mb-2">Category</span>
              <Checkbox.Group
                value={selectedCategory}
                onChange={handleFilterCategory}
                css={{ mh: '200px', oy: 'scroll' }}
                className="mb-5"
              >
                {categoryArr.map((x) => (
                  <Checkbox size="xs" value={x}>{x}</Checkbox>
                ))}
              </Checkbox.Group>
              <span className="mb-2">Price</span>
              <Input className="mb-2" placeholder="Min Price" type="number" value={minPrice} onChange={handleFilterMinPrice} />
              <Input className="mb-2" placeholder="Max Price" type="number" value={maxPrice} onChange={handleFilterMaxPrice} />
            </Card.Body>
          </Card>
        </div>
        <div className="grow">
          <ProductTable products={filteredProducts} columns={columns} />
        </div>
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <h4>Filter</h4>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="flex">
            <div className="flex-auto mr-2">
              <span className="mb-2">Brand</span>
              <Checkbox.Group
                value={selectedBrand}
                onChange={handleFilterBrand}
                css={{ mh: '200px', oy: 'scroll', mw: '200px' }}
                className="mb-5"
              >
                {brandArr.map((x) => (
                  <Checkbox size="xs" value={x}>{x}</Checkbox>
                ))}
              </Checkbox.Group>
            </div>
            <div className="flex-auto">
              <span className="mb-2">Category</span>
              <Checkbox.Group
                value={selectedCategory}
                onChange={handleFilterCategory}
                css={{ mh: '200px', oy: 'scroll', mw: '200px' }}
                className="mb-5"
              >
                {categoryArr.map((x) => (
                  <Checkbox size="xs" value={x}>{x}</Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div>
            <span className="mb-2">Price</span>
            <br />
            <Input className="mb-2 w-screen" placeholder="Min Price" type="number" value={minPrice} onChange={handleFilterMinPrice} />
            <Input className="mb-2" placeholder="Max Price" type="number" value={maxPrice} onChange={handleFilterMaxPrice} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
