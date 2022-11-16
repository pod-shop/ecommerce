import React from 'react';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Link } from 'next-translate-routes';

const menuItems: Array<MenuItem> = [
  {
    label: 'Create',
    template: () => <Link href='/design-maker'>Create</Link>
  },
  {
    label: 'Shop',
    template: () => <Link href='/shop'>Shop</Link>
  }
]

const Header = () => {
  return (
    <>
      <Menubar className='border-none border-noround shadow-2 bg-white' model={menuItems} start={<Link href='/'>Home</Link>} end={'end'} />
    </>
  );
}

export default Header;
