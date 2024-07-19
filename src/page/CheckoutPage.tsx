import React from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Input from '../components/Input';
import Button from '../components/Button';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { ConvertRupiah } from '../utils/formater';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import { clearProducts } from '../redux/reducer/cartSlice';
import Spining from '../components/Spining';
import Modal from '../components/Modal';
import Lottie from 'lottie-react';
import sucees from "../assets/icons/succes.json"
import payment1 from '../assets/midtrans/payment1.png';
import payment2 from '../assets/midtrans/payment2.png';
import payment3 from '../assets/midtrans/payment3.png';
import payment4 from '../assets/midtrans/payment4.png';
import { MdOutlinePayment } from 'react-icons/md';

const CheckoutPage = () => {
  const cart = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token, status} = React.useContext(AuthContext) as AuthContextType
  const [loading, setIsLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const [checkoutState, setCheckoutState] = React.useState({
    address: "",
    phoneNumber: "",
  });

  // const handleCreditCardInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

  //   // Format the credit card number with spaces after every 4 digits
  //   inputValue = inputValue.replace(/(\d{4})/g, '$1 ').trim();

  //   setCheckoutState({...checkoutState, cardNumber: inputValue});
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    if (name === 'phoneNumber' || name === 'cardYear' || name === 'cardMonth' || name === 'cvv') {
     const inputValue = value.replace(/\D/g, '');
      setCheckoutState({...checkoutState, [name]: inputValue})
    } else {
      setCheckoutState({...checkoutState, [name]: value})
    }
    
  }

  const checkAttributes = () => {
    if(checkoutState.address.trim() !== "" && checkoutState.phoneNumber.trim() !== "") {
      return true
    } else {
      return false
    }
  }

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const getTotalPriceItem = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });

    return ConvertRupiah(total);
  };

  const taxes = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return ConvertRupiah(total * 0.05);
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });

    console.log(status)
    const hargaAkhir = status?.toUpperCase() === "KICKS MEMBER" ? (total+(total*0.05))-(((total+(total*0.05))* 15) / 100) : total + (total * 0.05)

    return ConvertRupiah(hargaAkhir);
  };

  const getTotalPriceApi = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });



    const hargaAkhir = status?.toUpperCase() === "KICKS MEMBER" ? (total+(total*0.05))-(((total+(total*0.05))* 15) / 100) : total + (total * 0.05)

    return hargaAkhir;
  };
  
  const handleClose = () => {
    setOpen(false)
    navigate("/")
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(checkAttributes()) {
      setIsLoading(true)
      const data = {
      total_price: getTotalPriceApi(), 
      total_items: getTotalQuantity(), 
      address: checkoutState.address,
      phone_number: checkoutState.phoneNumber
     }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/checkout`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setCheckoutState({
        address: "",
        phoneNumber: "",

        })

        dispatch(clearProducts())

        // setOpen(true)
       window.location.assign(response.data.paymentUrl)
      

        // setTimeout(() => {
        //   setOpen(false)
        //   navigate("/")
        // }, 5000)
      } catch (error) {
        console.log(error);
        toast.error('Something Wrong please restart', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } finally {
        setIsLoading(false)
      }
       
    }
  }
  return (
    <main>
      <Container className='mt-4'>
        <Grid columnsAmount={1} className='lg:grid-cols-3 mt-4 md:gap-x-10'>
          <Grid.items className='order-last md:col-span-2 lg:order-none '>
            <form onSubmit={handleSubmit}>
            <div className='mt-4'>
              <h1 className='mb-4 text-3xl font-semibold'>Shipping Address</h1>
              <Grid columnsAmount={1} className='lg:grid-cols-2 mt-4'>
                <Grid.items className='lg:col-span-2'>
                  <Input type='text' placeholder='Find Delivery Addres*' name="address" value={checkoutState.address} onChange={handleInputChange}></Input>
                </Grid.items>
                <Grid.items >
                  <Input type='text' placeholder='Phone Number' name="phoneNumber" value={checkoutState.phoneNumber} onChange={handleInputChange}></Input>
                </Grid.items>
              </Grid>
            </div>

            <div className="">
        <div className="w-full mt-5 p-5 rounded-t-lg border border-black flex items-center justify-between">
          <h1 className="text-lg">Payments By Xendit</h1>
          <div className="flex items-center gap-3">
            <img
              src={payment1}
              alt=""
              width={900}
              height={900}
              className="w-[40px]"
            />
            <img
              src={payment2}
              alt=""
              width={900}
              height={900}
              className="w-[40px]"
            />
            <img
              src={payment3}
              alt=""
              width={900}
              height={900}
              className="w-[40px]"
            />
            <img
              src={payment4}
              alt=""
              width={900}
              height={900}
              className="w-[40px]"
            />
          </div>
        </div>
      <div className="flex flex-col items-center bg-white-three py-9">
        <MdOutlinePayment className='text-[15rem]' />
        <p className="max-w-[420px] text-center text-lg">After clicking “Pay now”, you will be redirected to Payments By Xendit to complete your purchase securely.</p>
      </div>
    </div>

            {/* <div className='mt-4'>
              <h1 className='mb-4 text-3xl font-semibold'>Payment Details</h1>
              <Grid columnsAmount={1} className='lg:grid-cols-2 mt-4'>
                <Grid.items className='lg:col-span-2'>
                  <Input
                    type='text'
                    name='creditCardNumber'
                    value={checkoutState.cardNumber}
                    onChange={handleCreditCardInputChange}
                    maxLength={19} // Set the maximum length to prevent entering more than 16 digits
                    placeholder='Card Number'
                  ></Input>
                </Grid.items>
                <Grid.items>
                  <Input type='text' placeholder='Card Year' maxLength={4} name="cardYear" value={checkoutState.cardYear} onChange={handleInputChange}></Input>
                </Grid.items>
                <Grid.items>
                  <Input type='text' placeholder='Card Month' maxLength={2} name="cardMonth" value={checkoutState.cardMonth} onChange={handleInputChange}></Input>
                </Grid.items>
                <Grid.items>
                  <Input type='text' placeholder='cvv' maxLength={3} name="cvv" value={checkoutState.cvv} onChange={handleInputChange}></Input>
                </Grid.items>
              </Grid>
            </div> */}

            <div className='flex flex-col w-full gap-4 mt-4'>
              <Button className='bg-[#232321] py-3 mt-4 disabled:text-gray-500 w-full' type='submit' disabled={!checkAttributes()}>Pay</Button>
            </div>
            </form>
          </Grid.items>
          <Grid.items>
            <Grid columnsAmount={1}>
              <div className='bg-white p-4 rounded-md min-h-[200px] w-full order-last lg:order-none'>
                <h1 className='text-2xl font-semibold'>Order Summary</h1>
                <div className='flex w-full flex-col gap-2 mt-2'>
                  <div className='flex justify-between'>
                    <p>{getTotalQuantity()} items</p>
                    <p>{getTotalPriceItem()}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Sales Tax (5%)</p>
                    <p>{taxes()}</p>
                  </div>
                  {status?.toUpperCase() === "KICKS MEMBER" ? 
                     <div className='flex justify-between'>
                     <p>Discount Member</p>
                     <p>15%</p>
                   </div>
                    :
                    null
                    }
                  <div className='flex justify-between'>
                    <p className='font-semibold'>Total</p>
                    <p className='font-semibold'>{getTotalPrice()}</p>
                  </div>
                </div>
              </div>

              <div className='bg-white  rounded-xl p-4 mt-4'>
                <h1 className='text-2xl font-semibold mb-4'>Order Details</h1>
                {cart.map((item, i) => (
                  <Grid columnsAmount={2} key={i} className='mb-8 md:grid-cols-3'>
                    <Grid.items>
                      <div className='w-full min-h-[200px]'>
                        <img src={item.shoe.thumbImg} alt='img1' style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </div>
                    </Grid.items>
                    <Grid.items className='md:col-span-2'>
                      <p className='text-lg font-semibold line-clamp-2'>{item.shoe.name}</p>
                      <p className='text-gray'>{item.shoe.type === "MALE" ? "Men's" : "Female's"} {item.shoe.category.toLowerCase()} shoes</p>
                      <p className='text-gray'>{item.shoe_color}</p>
                      <div className='flex flex-col lg:flex-row gap-4'>
                        <p className='text-gray'>Size {item.shoe_size}</p>
                        <p className='text-gray'>Quantity {item.quantity}</p>
                      </div>
                      <p className='text-[#4A69E2] font-semibold'>{ConvertRupiah(item.price * item.quantity)}</p>
                    </Grid.items>
                  </Grid>
                ))}
              </div>
            </Grid>
          </Grid.items>
        </Grid>
      </Container>

      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
      <Modal open={open} onClose={handleClose}>
        <div className='w-[280px] lg:w-[450px] md:p-4 flex flex-col gap-4'>
          <div className='flex justify-center items-center'>
           <Lottie animationData={sucees} autoPlay={true} style={{width: "150px", height: "150px"}} loop={false}/>
          </div>
          <p  className="text-center text-4xl">Success!</p>
          <p className="text-center text-gray-500 text-lg">Thanks For Choosing Kick Store. We Hope to See you Again In The Future.</p>
        </div>
         
        </Modal> 
      <Spining open={loading} />
    </main>
  );
};

export default CheckoutPage;
