import React from 'react';
import Container from './Container';
import Grid from './Grid';
import Input from './Input';
import Button from './Button';
import Logo2 from '../assets/Image/Logo2.png';
import { BsTiktok, BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer>
      <Container className='bg-[#4A69E2] min-h-[100px] mt-8 rounded-3xl p-0 lg:mb-0 mb-0'>
        <div className='px-4 py-8 md:p-8 min-h-[100px] w-full'>
          <Grid columnsAmount={1} className='lg:grid-cols-2 '>
            <Grid.items>
              <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-4'>
                Join our KicksPlus <br className='hidden sm:block' />
                Club & get 15% off
              </h1>
              <p className='text-lg md:text-2xl text-white  mb-4'>Sign up for free! Join the community.</p>
              <div className='flex gap-2'>
                <Input type='text' placeholder='Email Addres' className='bg-transparent outline-white border-white text-white placeholder-white' />
                <Button className='bg-[#232321]'>Submit</Button>
              </div>
            </Grid.items>
            <Grid.items>
              <div className='flex items-end lg:justify-center'>
                <img src={Logo2} alt='logo' style={{ objectFit: 'cover', width: '75%', height: '75%' }} />
              </div>
            </Grid.items>
          </Grid>
        </div>
        <div className='bg-[#232321] px-4 py-8 md:p-8 w-full rounded-3xl'>
          <Grid columnsAmount={1} className='lg:grid-cols-4 mb-10'>
            <Grid.items className='lg:mr-4 lg:col-span-2'>
              <h1 className='text-2xl md:text-3xl  text-[#FFA52F] font-semibold mb-4'>About us</h1>
              <p className='text-lg sm:text-xl  text-white  mb-4'>We are the biggest hyperstore in the universe. We got you all cover with our exclusive collections and latest drops.</p>
            </Grid.items>
            <Grid.items>
              <h1 className='text-2xl md:text-3xl  text-[#FFA52F] font-semibold mb-4'>Category</h1>
              <ul className='text-lg list-none flex flex-col gap-2 text-white sm:text-xl'>
                <li className='cursor-pointer hover:text-[#FFA52F]'>Runners</li>
                <li className='cursor-pointer hover:text-[#FFA52F]'>Casual</li>
                <li className='cursor-pointer hover:text-[#FFA52F]'>Basketball</li>
                <li className='cursor-pointer hover:text-[#FFA52F]'>OutDoor</li>
                <li className='cursor-pointer hover:text-[#FFA52F]'>Golf</li>
                <li className='cursor-pointer hover:text-[#FFA52F]'>Hiking</li>
              </ul>
            </Grid.items>
            <Grid.items>
              <h1 className='text-2xl md:text-3xl  text-[#FFA52F] font-semibold mb-4'>Follow Us</h1>

              <div className='flex gap-x-6'>
                <BsTiktok className='w-[32px] h-[32px] text-white cursor-pointer hover:text-[#FFA52F]' />
                <BsFacebook className='w-[32px] h-[32px] text-white cursor-pointer hover:text-[#FFA52F]' />
                <BsTwitter className='w-[32px] h-[32px] text-white cursor-pointer hover:text-[#FFA52F]' />
                <BsInstagram className='w-[32px] h-[32px] text-white cursor-pointer hover:text-[#FFA52F]' />
              </div>
            </Grid.items>
          </Grid>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
