import React from 'react';

import CheckBox from '../components/CheckBox';
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

const CheckoutPage = () => {
  const cart = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token} = React.useContext(AuthContext) as AuthContextType
  const [loading, setIsLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const [checkoutState, setCheckoutState] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    cardNumber: "",
    cardYear: "",
    cardMonth: "",
    cvv:""
  });

  const handleCreditCardInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Format the credit card number with spaces after every 4 digits
    inputValue = inputValue.replace(/(\d{4})/g, '$1 ').trim();

    setCheckoutState({...checkoutState, cardNumber: inputValue});
  };

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
    if(checkoutState.firstName.trim() !== "" && checkoutState.lastName.trim() !== "" && checkoutState.address.trim() !== "" && checkoutState.phoneNumber.trim() !== "" && checkoutState.cardNumber !== "" && checkoutState.cardYear !== "" && checkoutState.cardMonth !== "" && checkoutState.cvv !== "") {
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



  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });

    return ConvertRupiah(total + 35000);
  };

  const getTotalPriceApi = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });

    return total + 35000;
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
      card_number: checkoutState.cardNumber, 
      card_exp_month: checkoutState.cardMonth, 
      card_exp_year: checkoutState.cardYear, 
      card_cvv: checkoutState.cvv,
      address: checkoutState.address,
      phone_number: checkoutState.phoneNumber
     }

      try {
        await axios.post("http://localhost:5000/api/order/checkout", data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setCheckoutState({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        cardNumber: "",
        cardYear: "",
        cardMonth: "",
        cvv:""
        })

        dispatch(clearProducts())

        setOpen(true)

        setTimeout(() => {
          setOpen(false)
          navigate("/")
        }, 5000)
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
                <Grid.items>
                  <Input type='text' placeholder='First Name*' name='firstName' value={checkoutState.firstName} onChange={handleInputChange}></Input>
                </Grid.items>
                <Grid.items>
                  <Input type='text' placeholder='Last Name' name="lastName" value={checkoutState.lastName} onChange={handleInputChange}></Input>
                </Grid.items>
                <Grid.items className='lg:col-span-2'>
                  <Input type='text' placeholder='Find Delivery Addres*' name="address" value={checkoutState.address} onChange={handleInputChange}></Input>
                </Grid.items>
                <Grid.items>
                  <Input type='text' placeholder='Phone Number' name="phoneNumber" value={checkoutState.phoneNumber} onChange={handleInputChange}></Input>
                </Grid.items>
              </Grid>
            </div>

            <div className='mt-4'>
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
            </div>

            <div className='flex flex-col gap-4 mt-4'>
              <CheckBox label='My billing and delivery information are the same ' />
              <CheckBox label={`I’m 13+ year old`} />
              <div className='flex flex-col gap-2'>
                <h1>Also want product updates with our newsletter?</h1>
                <CheckBox label={`Yes, I’d like to receive emails about exclusive sales and more.`} />
              </div>
              <Button className='bg-[#232321] lg:w-[400px] py-3 mt-4 disabled:text-gray-500' type='submit' disabled={!checkAttributes()}>Pay</Button>
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
                    <p>Delivery</p>
                    <p>{ConvertRupiah(35000)}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Sales Tax</p>
                    <p>-</p>
                  </div>
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
