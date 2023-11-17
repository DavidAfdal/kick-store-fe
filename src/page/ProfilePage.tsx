import React from 'react';
import Grid from '../components/Grid';
import ProfileImg from '../assets/Image/profileImg.webp';
import { PiMedalDuotone } from 'react-icons/pi';

const ProfilePage = () => {
  return (
    <main>
      <section className='p-4 flex flex-col gap-4'>
        <h1 className='text-3xl font-semibold uppercase'>Profile User</h1>
        <div className='bg-white min-h-[200px] shadow-lg p-4 rounded-xl'>
          <Grid columnsAmount={3}>
            <div>
              <img src={ProfileImg} className='w-full h-[300px] object-cover object-center rounded-lg' />
            </div>
            <div className='col-span-2'>
              <h1 className='text-3xl  mb-2 font-semibold'>Hello, David Afdal Kaizar Mutahadi</h1>
              <p className='text-lg mb-[50px]'>davidafdal7@gmail.com</p>
              <div className='flex gap-4'>
                <PiMedalDuotone className='w-[80px] h-[80px] mb-4' />
                <div>
                  <p className='text-2xl mb-2 uppercase font-semibold'>Status</p>
                  <p className='text-xl uppercase font-semibold'>Rookie</p>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
