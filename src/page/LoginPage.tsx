import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Input from '../components/Input';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { AuthContext, AuthContextType } from '../context/auth-context';

const LoginPage = () => {
  const { login } = React.useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(1);
    navigate('/');
  };

  return (
    <main>
      <Container className='mt-6'>
        <Grid columnsAmount={1} className='lg:grid-cols-3'>
          <Grid.items>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <h1 className='text-3xl font-semibold'>Login</h1>
              <Input type='text' placeholder='Email' onChange={(e) => setLoginState({ ...loginState, email: e.target.value })} />
              <Input type='password' placeholder='Password' />
              <Link to='/' className='underline'>
                Forget Your Password
              </Link>
              <CheckBox label='Keep me logged in - applies to all log in options below. More info' className='w-4 h-4' />
              <Button className='bg-[#232321] justify-between flex ' type='submit'>
                Login <span className='w-4 h-4'>&#129058;</span>
              </Button>
              <p className='font-normal'>By clicking 'Log In' you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.</p>
            </form>
          </Grid.items>
          <Grid.items className='lg:col-span-2'>
            <div className='bg-white p-6 rounded-lg flex flex-col gap-4 lg:ml-auto lg:w-[90%] '>
              <h1 className='text-2xl font-semibold'>Join Kicks Club Get Rewarded Today.</h1>
              <p>As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:</p>
              <ul className='list-disc list-inside'>
                <li>Free Shiping</li>
                <li>A 15% off voucher for your next purchase</li>
                <li>Access to Members Only products and sales</li>
                <li>Special offers and promotions</li>
              </ul>
              <p>Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub </p>
              <Button className='bg-[#232321] justify-between flex'>
                JOIN THE CLUB <span className='w-4 h-4'>&#129058;</span>
              </Button>
            </div>
          </Grid.items>
        </Grid>
      </Container>
    </main>
  );
};

export default LoginPage;
