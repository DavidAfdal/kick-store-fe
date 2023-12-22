import React from 'react';
import Box from '../assets/Image/box.png';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/auth-context';
import axios from 'axios';
import { OrderType } from '../models/orderModel';
import { ConvertRupiah, DeliverdDay, FormatDateToDDMMYYYY } from '../utils/formater';

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
        {historyOrder.length <= 0 ? (
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
        ) :  

          <table className="border-collapse border table-auto mt-[20px]">
  <thead className="bg-[#4A69E2] text-white">
    <tr>
      
      <th className='px-6 py-3'>Order Id</th>
      <th className='px-6 py-3'>Order Date</th>
      <th className='px-6 py-3'>Items</th>
      <th className='px-6 py-3'>Total</th>
      <th className='px-6 py-3'>Order Status</th>
      <th className='px-6 py-4'>Payment</th>
      <th className='px-6 py-4'>Delivery Date</th>
      <th className='px-6 py-4'></th>
    </tr>
  </thead>
  <tbody>
  {historyOrder?.map((data, i) => (
    <tr key={i} className='bg-white'>
            <td className='px-6 py-3 text-center'>{data.id}</td>
            <td className='px-6 py-3 text-center'>{FormatDateToDDMMYYYY(new Date(data.createdAt))}</td>
            <td className='px-6 py-3 text-center'>{data.total_items}</td>
            <td className='px-6 py-3 text-center'>{ConvertRupiah(data.total_price)}</td>
            <td className='px-6 py-3 text-center'>Packed</td>
            <td className='px-6 py-4 text-center'><p>Credit Card</p></td>
            <td className='px-6 py-4 text-center'>{DeliverdDay(new Date(data.createdAt))}</td>
            <td className = 'px-6 py-4 text-center'><Link to="/history">View Details</Link></td>
          </tr>
           ))}
  </tbody>
</table>
           
          }
      </section>
    </main>
  );
};

export default HistoryPage;
