import React from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Input from '../components/Input';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';
import Google from "../assets/icons/google.png"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/auth-context';
import { useGoogleLogin } from '@react-oauth/google';

import axios, { AxiosError } from 'axios';
import { HttpError } from '../models/errorModel';
import { ToastContainer, toast } from 'react-toastify';

const RegisterPage = () => {
  const { login } = React.useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [dataRegister, setDataRegister] = React.useState({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    condition: "",
    loggedIn: ""
  });

  const handleRadioSelections = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setDataRegister({...dataRegister, gender: value === dataRegister.gender ? "" : value})
  };

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (result) => {
      console.log(result)
      const data = await axios.post("http://localhost:5000/api/auth/loginGoogle", {code: result.code})
      login(data.data.id);
      navigate("/")
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    if(name === 'condition' || name === 'loggedIn') {
      setDataRegister({...dataRegister, [name]: value === dataRegister[name] ? "" : value})
    } else {
      setDataRegister({...dataRegister, [name]: value})
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(dataRegister)
    if(dataRegister.firstName.trim() !== "" && dataRegister.lastName.trim() !== "" && dataRegister.gender.trim() !== "" && dataRegister.password.trim() !== "" && dataRegister.email.trim() !== "" )
    try {
      const data = await axios.post('http://localhost:5000/api/auth/register' , {
        firstName: dataRegister.firstName,
        lastName: dataRegister.lastName,
        gender: dataRegister.gender,
        email: dataRegister.email,
        password: dataRegister.password,
    })
      setDataRegister({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        password: '',
        condition: "",
        loggedIn: ""
      })

      toast.info(data.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
     
      setTimeout(() => {
        navigate("/login")
      }, 2000)
 
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

  return (
    <main>
      <Container className='mt-6'>
        <Grid columnsAmount={1} className='lg:grid-cols-3'>
          <Grid.items >
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <h1 className='text-3xl font-semibold'>Register</h1>
            <h1 className='text-3xl font-semibold'>Your Name</h1>
            <Input type='text' placeholder='First Name*' name='firstName' value={dataRegister.firstName} onChange={handleInputChange}/>
            <Input type='text' placeholder='Last Name*'  name='lastName' value={dataRegister.lastName}  onChange={handleInputChange}/>
            <h1 className='text-3xl font-semibold'>Gender</h1>
            <div className='flex gap-4'>
              <CheckBox label='Male' className='w-4 h-4' onChange={handleRadioSelections}  value={"Male"} checked={dataRegister.gender === "Male"} />
              <CheckBox label='Female' className='w-4 h-4' onChange={handleRadioSelections}  value={"Female"} checked={dataRegister.gender === "Female"}/>
            </div>
            <h1 className='text-3xl font-semibold'>Login Details</h1>
            <Input type='text' placeholder='Email' name='email'  value={dataRegister.email} onChange={handleInputChange}/>
            <Input type='password' placeholder='Password' name='password'  value={dataRegister.password} onChange={handleInputChange}/>

            <CheckBox 
            label={`By clicking 'Log In' you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.`}
            className='w-4 h-4'  
            name='condition'
            value={'condition'}
            checked={dataRegister.condition === 'condition'}
            onChange={handleInputChange}
            />
            <CheckBox label='Keep me logged in - applies to all log in options below. More info' className='w-4 h-4'  name='loggedIn'
            value={'loggedIn'}
            checked={dataRegister.loggedIn === 'loggedIn'}
            onChange={handleInputChange} />
            <Button className='bg-[#232321] justify-between flex '>
              Register<span className='w-4 h-4'>&#129058;</span>
            </Button>
            <Button className='justify-between flex items-center bg-white border-black border text-[#232323]' onClick={() => loginWithGoogle()} type='button'>
                Sign In With Google <span className='w-8 h-8'><img src={Google} className='w-full h-full object-cover object-center'/></span>
              </Button>
            <p className='font-normal text-center'>
              Already have an account?{' '}
              <Link to='/login' className='underline text-blue-600'>
                Login here
              </Link>
            </p>
            </form>
          </Grid.items>
          <Grid.items className='lg:col-span-2'>
            <div className='bg-white p-6 rounded-lg flex flex-col gap-4 lg:ml-auto lg:w-[90%]'>
              <h1 className='text-2xl font-semibold'>Join Kicks Club Get Rewarded Today.</h1>
              <p>As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:</p>
              <ul className='list-disc list-inside'>
                <li>Free Shiping</li>
                <li>A 15% off voucher for your next purchase</li>
                <li>Access to Members Only products and sales</li>
                <li>Special offers and promotions</li>
              </ul>
              <p>Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub </p>
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

export default RegisterPage;
