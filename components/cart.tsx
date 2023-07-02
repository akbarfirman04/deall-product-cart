import React, { useEffect } from 'react';
import { Table } from '@nextui-org/react';
import Link from 'next/link';

type CartData = {
  id : number,
  products : Array <any>,
  total : number,
  discountedTotal : number,
  userId : number,
  totalProducts : number,
  totalQuantity : number
};
type UserData = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function Product() {
  const [carts, setCarts] = React.useState<CartData[]>([]);
  const [user, setUser] = React.useState<UserData[]>([]);
  useEffect(() => {
    const fetchCarts = async () => {
      const response = await fetch('https://dummyjson.com/carts?limit=0');
      const data = await response.json();
      const responseUser = await fetch('https://dummyjson.com/users?limit=0');
      const dataUser = await responseUser.json();
      const filteredData = dataUser.users.map(({ id, firstName, lastName }) => ({
        id,
        firstName,
        lastName,
      }));
      setUser(filteredData);
      setCarts(data.carts);
    };
    fetchCarts();
  }, []);
  const columns = [
    {
      key: 'id',
      label: 'Cart Number',
    },
    {
      key: 'userId',
      label: 'User',
    },
    {
      key: 'totalQuantity',
      label: '# of Items',
    },
    {
      key: 'discountedTotal',
      label: 'Total Amount',
    },
  ];
  const renderCell = (cart : CartData, columnKey: React.Key) => {
    const cellValue = cart[columnKey];
    switch (columnKey) {
      case 'id':
        return (
          <Link href={`/cart/${cart.id}`}>
            Cart
            {' '}
            {cart.id}
          </Link>
        );
      case 'userId':
        return (
          <span>
            {user.find((obj) => obj.id === cart.userId)?.firstName}
            {' '}
            {user.find((obj) => obj.id === cart.userId)?.lastName}
          </span>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Table
      css={{
        height: 'auto',
        minWidth: '100%',
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={carts}>
        {(item: CartData) => (
          <Table.Row key={item.id}>
            {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        rowsPerPage={10}
      />
    </Table>
  );
}
