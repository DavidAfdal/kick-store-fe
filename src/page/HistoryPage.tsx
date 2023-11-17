import React from 'react';
import Box from '../assets/Image/box.png';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const history: string[] = [];
  const navigate = useNavigate();
  return (
    <main>
      <section className='p-4'>
        <h1 className='text-3xl uppercase font-semibold'>History Order</h1>
        {history.length === 0 ? (
          <div className='h-screen flex justify-center items-center flex-col gap-4'>
            <img src={Box} alt='favoritImg' className='object-fit object-center w-[250px] h-[250px]' />
            <h1 className='text-3xl font-semibold'>No Order Product Yet</h1>
            <div className='flex flex-col gap-4 items-center'>
              <p className='text-center text-xl'>No need to rush shooping,</p>
              <p className='text-center text-xl'>explore KICKS and enter your order shoe here.</p>
              <Button className='w-[50%] bg-[#232321]' onClick={() => navigate('/shop')}>
                Start Shopping
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default HistoryPage;
