import React from 'react';
import Logo from '../assets/Image/Logo.png';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/auth-context';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Dropdown from './Dropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cartReducer.cart);
  const totaltemInCart = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  const { isLoggedIn, logout } = React.useContext(AuthContext) as AuthContextType;
  return (
    <header className='max-w-[1440px] mx-auto py-4 px-8 bg-white min-h-[100px] mt-8 rounded-2xl flex items-center justify-between'>
      <nav className='hidden md:block'>
        <ul className='list-none flex items-center gap-x-8'>
          <li className='font-semibold'>
            <Link to='/'>Home</Link>
          </li>
          <li className='font-semibold'>
            <Link to='/shop'>Shop</Link>
          </li>
          <li className='font-semibold'>
            <Link to='/shop'>New Drops</Link>
          </li>
        </ul>
      </nav>
      <img src={Logo} alt='kicks' onClick={() => navigate('/')} className='cursor-pointer w-[90px] h-[20px]' />
      {isLoggedIn ? (
        <div className='flex gap-4 items-center'>
          <div className='relative cursor-pointer'>
            <AiOutlineShoppingCart className='text-2xl' onClick={() => navigate('/cart')} />
            {totaltemInCart() <= 0 ? null : <div className='absolute right-[-10px] top-[-10px] w-[20px] h-[20px] bg-[#4A69E2] text-white rounded-full flex items-center justify-center text-sm transition-all '>{totaltemInCart()}</div>}
          </div>

          <Dropdown>
            <p className='cursor-pointer text-base text-gray-700 px-4 py-2 hover:bg-gray-100'>Profile</p>
            <p className='cursor-pointer text-base text-gray-700 px-4 py-2 hover:bg-gray-100'>Like</p>
            <p
              onClick={() => {
                logout();
                navigate('/');
              }}
              className='cursor-pointer text-base text-gray-700 hover:bg-gray-100 px-4 py-2'
            >
              Logout
            </p>
          </Dropdown>
        </div>
      ) : (
        <div className='flex gap-4 items-center'>
          <Button onClick={() => navigate('/register')}>Sign Up</Button>
          <Link to='/login' className='hidden font-semibold text-[#4A69E2] md:block'>
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
