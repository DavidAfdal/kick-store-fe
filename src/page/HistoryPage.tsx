import React from 'react';
import Box from '../assets/Image/box.png';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/auth-context';
import axios from 'axios';
import { OrderType } from '../models/orderModel';

const HistoryPage = () => {
  const navigate = useNavigate();
  const {token} = React.useContext(AuthContext) as AuthContextType
  const [historyOrder, setHistoryOrder] = React.useState<OrderType[]>([])

  React.useEffect(() => {
    const getHistoryOrder =  async () => {
      try {
        const response = await axios.get<{status: string, message: string, data: OrderType[]}>("http://localhost:5000/api/order/history", {
          headers: {
            Authorization:  `Bearer ${token}`
          }
        })
        console.log(response)
        setHistoryOrder(response.data.data)
        console.log(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }
    
    getHistoryOrder()
  }, [token])
  return (
    <main>
      <section className='p-4'>
        <h1 className='text-3xl uppercase font-semibold'>History Order</h1>
        {historyOrder.length <=0 ? (
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
        ) :  <div className="flex flex-col gap-4">
           {historyOrder?.map((data, i) => (
          <div className="flex gap-4" key={i}>
            <p>Order Id : {data.id as string}</p>
            <p>Packaging : Package</p>
          </div>
           ))}
          </div>}
      </section>
    </main>
  );
};

export default HistoryPage;
