// import { useEffect, useState } from 'react';
import sepatu from '../assets/image/boost3.png';
// import { OrderType } from '../models/orderModel';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';



const DetailTransaksi = () =>{
    // const {orderId} = useParams()
    // const [orderDetails, setOrderDetails] = useState<OrderType | null>(null)


    // useEffect(() => {
    //     const getOrderDetails = async () => {
    //         try {
    //             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/orders/${orderId}`)
    //             console.log(response)
    //             setOrderDetails(response.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getOrderDetails()
    // }, [orderId])



    return(
        <div>
            <h1 className="text-3xl font-semibold my-10">Detail Transaksi</h1>
            <div className="box-shadow px-10 py-5">
                <div className="mb-3 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold mb-2">Hallo</h1>
                        <p className="text-sm mb-3">09/09/2022</p>
                        <a href="" className="px-2 py-2 bg-[#4A69E2] text-white rounded-lg">Link Pembayaran</a> 
                    </div>
                    <a href="" className="px-2 py-2 bg-[#4A69E2] text-white rounded-lg">PENDING</a>
                </div>
                <table width="100%"className="text-left mt-10" >
                <thead>
                    <tr>
                        <th>Product</th>
                        <th className='text-center'>Amount</th>
                        <th className='text-center'>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                  
                 
                    <tr>
                        <td className='flex items-center gap-3'>
                            <img src={sepatu} alt="" className='w-[120px]' />
                            <div className="">
                                <p>Adidas</p>    
                                <p>Rp. 6.000.000</p>    
                            </div>    
                        </td>
                        <td className='text-center'>
                            <p>2</p>
                        </td>
                        <td className='text-center'>
                            <p>Rp. 12.000.000</p>
                        </td>
                    </tr>
                </tbody>
            </table> 
            </div>
        </div>
    )
}

export default DetailTransaksi