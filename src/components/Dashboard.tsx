
import Grid from './Grid';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { IoPersonOutline, IoDocumentTextOutline } from 'react-icons/io5';

const Dashboard = () => {
  const location = useLocation();
  return (
    <main>
      <Grid columnsAmount={5}>
        <Grid.items className='p-4 bg-white h-screen'>
          <div className='flex flex-col gap-4'>
            <Link to='/' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white`}>
              <FaHouse />
              Home
            </Link>
            <Link to='/profile' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white ${location.pathname === '/profile' ? 'bg-[#4A69E2] text-white' : ''}`}>
              <IoPersonOutline />
              Profile
            </Link>
            <Link to='/favorit' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white ${location.pathname === '/favorit' ? 'bg-[#4A69E2] text-white' : ''}`}>
              <FaRegHeart />
              Favorit
            </Link>
            <Link to='/history' className={`w-full p-4 hover:bg-[#4A69E2]  flex gap-3 items-center transition-colors hover:text-white ${location.pathname === '/history' ? 'bg-[#4A69E2] text-white' : ''}`}>
              <IoDocumentTextOutline />
              History
            </Link>
          </div>
        </Grid.items>
        <Grid.items className='col-span-4'>
          <Outlet />
        </Grid.items>
      </Grid>
    </main>
  );
};

export default Dashboard;
