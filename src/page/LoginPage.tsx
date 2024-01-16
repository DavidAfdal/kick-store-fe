import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Input from '../components/Input';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import { AuthContext, AuthContextType } from '../context/auth-context';
import Google from "../assets/icons/google.png"
import { useGoogleLogin } from '@react-oauth/google';
import axios, { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { HttpError } from '../models/errorModel';

const LoginPage = () => {
  const { login } = React.useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
  });
  
  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (result) => {
      console.log(result)
      const respon = await axios.post("http://localhost:5000/api/auth/loginGoogle", {code: result.code})
      login(respon.data.data);
      navigate("/")
      console.log(respon.data.data)
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginState.email.trim() !== "" && loginState.password.trim() !== "") {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', loginState)
        login(response.data.data);
        navigate('/');
      } catch (error) {
        const err = error as AxiosError;
        const message = (err.response?.data as HttpError).message
        toast.error(message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
      }
  
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
      setLoginState({...loginState, [name]: value})
  }

  return (
    <main>
      <Container className='mt-6'>
        <Grid columnsAmount={1} className='lg:grid-cols-3'>
          <Grid.items>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                
              <h1 className='text-3xl font-semibold'>Login</h1>
              <Link to="/active-account" >
              <Button className=' justify-between flex' type='button'>
                Activate Account 
              </Button>
              </Link>
                </div> 

              <Input type='text' placeholder='Email' name='email' value={loginState.email} onChange={handleInputChange} />
              <Input type='password' placeholder='Password' name='password' value={loginState.password} onChange={handleInputChange} />
              <Link to='/forget-password' className='underline'>
                Forget Your Password
              </Link>
              <CheckBox label='Keep me logged in - applies to all log in options below. More info' className='w-4 h-4' />
              <Button className='bg-[#232321] justify-between flex ' type='submit'>
                Login <span className='w-4 h-4'>&#129058;</span>
              </Button>
              
              

              <Button className='justify-between flex items-center bg-white border-black border text-[#232323]' onClick={() => loginWithGoogle()} type="button">
                Sign In With Google <span className='w-8 h-8'><img src={Google} className='w-full h-full object-cover object-center'/></span>
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
              <p>Join now to start earning points, reach new levels and unlock more rewards and benefits from KicksClub </p>
              <Link to="/join" className='w-full'>
              <Button className='bg-[#232321] justify-between flex w-full' type='button'>
                JOIN THE CLUB <span className='w-4 h-4'>&#129058;</span>
              </Button>
              </Link>
              </div>
          </Grid.items>
        </Grid>
      </Container>
      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </main>
  );
};

export default LoginPage;
