'use client';

import React from 'react';
import {
  Table,
} from '@nextui-org/react';

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
type Column = {
  key : string,
  label : string
};
type ProductTableProps = {
  products: ProductData[];
  columns: Column[]
};

const ProductTable: React.FC<ProductTableProps> = function showTable({ products, columns }) {
  return (
    <div className="w-screen sm:w-full">
      <Table
        compact
        css={{
          height: 'auto',
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={products}>
          {(item) => (
            <Table.Row key={item.id}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          rowsPerPage={10}
        />
      </Table>
    </div>
  );
};

export default ProductTable;
