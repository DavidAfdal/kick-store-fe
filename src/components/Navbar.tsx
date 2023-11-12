import Logo from '../assets/Image/Logo.png';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
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
      <div className='flex gap-4 items-center'>
        <Button onClick={() => navigate('/register')}>Sign Up</Button>
        <Link to='/login' className='hidden font-semibold text-[#4A69E2] md:block'>
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
