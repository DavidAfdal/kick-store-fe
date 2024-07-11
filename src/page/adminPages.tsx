import React, { useContext } from 'react';
import Grid from '../components/Grid';
import ProfileImg from '../assets/Image/profile8.jpeg';
import { PiMedalDuotone } from 'react-icons/pi';
import axios from 'axios';
import { AuthContext, AuthContextType } from '../context/auth-context';
import Skeleton from '../components/Skeleton';
import { FaCrown } from "react-icons/fa";

const AdminPage = () => {
  const [profile,setProfile] = React.useState({
    name: "",
    email: "",
    status: ""
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const {token} = useContext(AuthContext) as AuthContextType


  React.useEffect(() => {
  setIsLoading(true)
   const getProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    } 
   }

   
     getProfile(); 
  }, [token])

  return (
    <main>
      <section className='p-4 flex flex-col gap-4'>

        <h1 className='text-3xl font-semibold uppercase'>Profile Admin</h1>
        <div className='bg-white min-h-[200px] shadow-lg p-4 rounded-xl'>
        {isLoading ? 
        <>
         <Grid columnsAmount={3}>
            <div>
              <Skeleton className='w-full h-[300px] rounded-lg' />
            </div>
            <div className='col-span-2'>
            <Skeleton className='w-full h-[40px] rounded' />
            <Skeleton className='w-full h-[40px] rounded' />
              <div className='flex gap-4'>
                <Skeleton className='w-[80px] h-[80px] mb-4' />
                <div>
                <Skeleton className='w-[200px] h-[40px] rounded' />
            <Skeleton className='w-[250px] h-[40px] rounded' />
                </div>
              </div>
            </div>
          </Grid>
        </>
        :
        <>
          <Grid columnsAmount={3}>
            <div>
              <img src={ProfileImg} className='w-full h-[300px] object-cover object-center rounded-lg' />
            </div>
            <div className='col-span-2'>
              <h1 className='text-3xl  mb-2 font-semibold'>Hello, {profile.name}</h1>
              <p className='text-lg mb-[50px]'>{profile.email}</p>
              <div className='flex gap-4'>
                <PiMedalDuotone className='w-[80px] h-[80px] mb-4' />
                <div>
                  <p className='text-2xl mb-2 uppercase font-semibold'>Status</p>
                  <p className='text-xl uppercase font-semibold flex gap-2 items-center'>{profile.status} {profile.status.toUpperCase() === "KICKS MEMBER" ?  <FaCrown /> : null}</p>
                </div>
              </div>
            </div>
          </Grid>
        </>
        }
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
