// src/components/Dashboard.tsx
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ConvertRupiah, FormatDateToDDMMYYYY } from '../utils/formater';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DashboardData, PaginationHistory } from '../models/orderModel';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [1200000, 1900000, 3000000, 5000000, 20000000, 30000000, 40000000],
      borderColor: '#4C3BCF',
      backgroundColor: '#4C3BCF',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Revenue This Month',
    },
  },
};





const Dashboard: React.FC = () => {

  
const [historyOrder, setHistoryOrder] = React.useState<PaginationHistory | null >(null)
const [dashboardData, setDashboardData] = React.useState<DashboardData | null >(null)




React.useEffect(() => {
  const getHistoryOrder =  async () => {
    try {
      const response = await axios.get<PaginationHistory>(`${import.meta.env.VITE_BACKEND_URL}/api/order/orders`)
      console.log(response)
      setHistoryOrder(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getDataDashboard = async () => {
    try {
      const response = await axios.get<DashboardData>(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard`)
      console.log(response.data)
      setDashboardData(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  getHistoryOrder()
  getDataDashboard()
}, [])

  return (
    <div className="p-8  min-h-screen">
      <div className="max-w-[1100px] mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#4C3BCF] p-6 rounded-lg shadow-lg flex items-center text-white">
            <div>
              <h2 className="text-xl font-bold ">Total Products</h2>
              <p className="text-3xl">{dashboardData?.totalStock}</p>
            </div>
          </div>
          <div className="bg-[#4C3BCF] p-6 rounded-lg shadow-lg flex items-center text-white">
            <div>
              <h2 className="text-xl font-bold">Sales This Month</h2>
              <p className="text-3xl">{dashboardData?.salesMonth}</p>
            </div>
          </div>
          <div className="bg-[#4C3BCF] p-6 rounded-lg shadow-lg flex items-center text-white">
            <div>
              <h2 className="text-xl font-bold">Revenue This Month</h2>
              <p className="text-3xl">{dashboardData?.revanueMonth === 0 ? "Rp. 0" :ConvertRupiah(dashboardData?.revanueMonth)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Line data={data} options={options} />
        </div>
       <table className="border-collapse border table-auto mt-[20px] w-full">
          <thead className="bg-[#4A69E2] text-white">
          <tr>
        
        <th className='px-6 py-3'>Order Id</th>
        <th className='px-6 py-3'>Order Date</th>
        <th className='px-6 py-3'>Items</th>
        <th className='px-6 py-3'>Total</th>
        <th className='px-6 py-3'>Status</th>
        <th className='px-6 py-4'>Details</th>
      </tr>
          </thead>
            <tbody>
             
                {historyOrder ?
                  historyOrder?.data.map((data) => (
                    <tr key={data.id} className='bg-white'>
                    <td className='px-6 py-3 text-center'>{data.id}</td>
                    <td className='px-6 py-3 text-center'>{FormatDateToDDMMYYYY(new Date(data.createdAt))}</td>
                    <td className='px-6 py-3 text-center'>{data.total_items}</td>
                    <td className='px-6 py-3 text-center'>{ConvertRupiah(data.total_price)}</td>
                    <td className='px-6 py-3 text-center'>{data.payment.paymentStatus}</td>
                    <td className = 'px-6 py-4 text-center'><Link to="/history">View Details</Link></td>
                  </tr>
              )) :null
              }
                
                    
         
                    
            </tbody>
  </table>
      </div>
    </div>
  );
};

export default Dashboard;
