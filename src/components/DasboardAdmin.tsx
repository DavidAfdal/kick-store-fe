import React from 'react';
import Grid from './Grid';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Image/Logo.png';
import { IoPersonOutline, IoDocumentTextOutline } from 'react-icons/io5';
import {  MdOutlineAddShoppingCart, MdOutlineHome } from "react-icons/md";
import { FaSignOutAlt } from 'react-icons/fa';
import { AuthContext, AuthContextType } from '../context/auth-context';

const DashboardAdmin = () => {
  const location = useLocation();
  const {logout} = React.useContext(AuthContext) as AuthContextType 
  return (
    <main className='h-full'>
      <Grid columnsAmount={5}>
        <Grid.items className='p-4 bg-white min-h-screen h-full'>
          <div className='flex flex-col gap-4'>
          <img src={Logo} alt='kicks'  className='cursor-pointer w-[90px] h-[20px]' />
            <Link to='/' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white ${location.pathname === '/' ? 'bg-[#4A69E2] text-white' : ''}`}>
            <MdOutlineHome className='text-lg'/>
               Home
            </Link>
            <Link to='/admin/dashboard' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white ${location.pathname === '/admin/dashboard' ? 'bg-[#4A69E2] text-white' : ''}`}>
              <IoPersonOutline />
               Dashboard
            </Link>
            <Link to='/admin/products' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white ${location.pathname === '/admin/products' ? 'bg-[#4A69E2] text-white' : ''}`}>
            <MdOutlineAddShoppingCart />
              Product
            </Link>
            <Link to='/admin/order-list' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white ${location.pathname === '/admin/order-list' ? 'bg-[#4A69E2] text-white' : ''}`}>
              <IoDocumentTextOutline />
              History
            </Link>
            <p  className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white }`} onClick={() => logout()}>
              <FaSignOutAlt/>
              Sign Out
            </p>
          </div>
        </Grid.items>
        <Grid.items className='col-span-4'>
          <Outlet />
        </Grid.items>
      </Grid>
    </main>
  );
};

export default DashboardAdmin;
