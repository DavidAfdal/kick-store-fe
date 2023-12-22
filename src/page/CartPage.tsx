import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { CartItemModel } from '../models/cartModels';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Button from '../components/Button';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Modal from '../components/Modal';
import { AiOutlineWarning, AiOutlinePlus, AiOutlineMinus, AiFillHeart } from 'react-icons/ai';
import {  decrementQuantityItems, deleteItems, fetchCartItems, incrementQuantityItems,} from '../redux/reducer/cartSlice';
import SwiperItems from '../components/SwiperItems';
import { ConvertRupiah } from '../utils/formater';
import { AuthContext, AuthContextType } from '../context/auth-context';
import axios from "axios";
import { Product } from '../models/shoesModel';
import { ToastContainer } from 'react-toastify';

const CartPage = () => {
  const {cart, isLoading} = useSelector((state: RootState) => state.cartReducer);
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = React.useState(0);
  const [recomandItem, setRecomandItem] = React.useState<Product[] | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const {token} = React.useContext(AuthContext) as AuthContextType
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const getTotalPriceItem = () => {
    let total = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        total += item.quantity * item.price;
      });
    }

    return ConvertRupiah(total + 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });

    return ConvertRupiah(total + 35000);
  };

  const handleConfirmClicksDelete = (id: number) => {
    setSelectedItemId(id);
    setDeleteModal(true);
  };

  const handleClickDelete = () => {
    if(token) {
      dispatch(deleteItems({id: selectedItemId, token: token }));
      setDeleteModal(false);
    }
  };

  const handleIncrementItems = (id : number) => {
    if(token) {
      console.log(token)
      dispatch(incrementQuantityItems({id: id, token: token}))
    }
  }
  const handleDecrementItems = (id : number) => {
    if(token) {
      dispatch(decrementQuantityItems({id: id, token: token}))
    }
  }

  const handleClickCheackOut = () => {
    navigate('/checkout');
  };



  React.useEffect(() => {
    
    const GetResponse = async () => {
      try {
        const recomandProduct = await  axios.get('http://localhost:5000/api/shoe/recomand?limit=8');
        setRecomandItem(recomandProduct.data.data)
      } catch (error) {
        console.log(error);
      }
    };

    setLoading(true)
    const timer = setTimeout(() => {
      if(token) {
        dispatch(fetchCartItems(token))
        GetResponse()
        setLoading(false)
      }
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [token]);



  return (
    <main>
      <Container className='mt-4'>
        <h1 className='text-3xl font-semibold'>Saving to celebrete</h1>
        <p>Enjoy up to 60% off thousands of styles during the End of Year sale - while suppiles last. No code needed.</p>
        <Grid columnsAmount={1} className='md:grid-cols-3 mt-4 md:gap-x-10'>
          <Grid.items className='md:col-span-2'>
            <div className='bg-white min-h-[200px] rounded-xl p-4'>
              <p className='mb-2 text-3xl font-semibold'>Your Bag</p>
              <p className='mb-4'>Items in your bag not reserved- check out now to make them yours.</p>
              {cart.map((item: CartItemModel, i: number) => (
                <Grid columnsAmount={2} key={i} className='mb-8 md:grid-cols-3'>
                  <Grid.items>
                    <div className='w-full min-h-[200px]'>
                      <img src={item.shoe.thumbImg} alt='img1' style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                  </Grid.items>
                  <Grid.items className='md:col-span-2'>
                    <div className='flex flex-col gap-4'>
                      <div className='md:flex md:justify-between'>
                        <p className='md:text-2xl font-semibold lg:w-[70%]'>{item.shoe.name}</p>
                        <p className='hidden md:block text-[#4A69E2] font-semibold'>{ConvertRupiah(item.price * item.quantity)}</p>
                      </div>
                      <p className='text-gray-500 capitalize font-semibold'>{item.shoe.type === "MALE" ? "Men's" : "Female's"} {item.shoe.category.toLowerCase()} shoes</p>
                      <p className='text-gray-500 capitalize font-semibold'>{item.shoe_color}</p>
                      <div className='flex md:items-center gap-4 flex-col md:flex-row'>
                        <p>Size : {item.shoe_size}</p>
                        <div className='flex md:items-center gap-4 flex-col md:flex-row'>
                          <p>Quantity :</p>
                          <div className='flex gap-4'>
                          <button onClick={() => handleDecrementItems(item.id)} disabled={isLoading === "loading"}>
                            <div className='rounded-full bg-[#232321] p-1'>
                              <AiOutlineMinus className='md:text-lg text-white' />
                              {/* onClick={() => dispatch(decrementQuantity({ id: item.id, color: item.color, size: item.size }))} */}
                            </div>
                          </button>

                            <p className='text-gray text-lg'>{item.quantity}</p>
                              <button onClick={() => handleIncrementItems(item.id)} disabled={isLoading === "loading"}>
                            <div className='rounded-full bg-[#232321] p-1'>
                              <AiOutlinePlus className='md:text-lg text-white' />
                              {/* onClick={() => dispatch(incrementQuantity({ id: item.id, color: item.color, size: item.size }))} */}
                            </div>
                              </button>
                          </div>
                        </div>
                      </div>
                      <p className='md:hidden block text-[#4A69E2] font-semibold'>{ConvertRupiah(item.price * item.quantity)}</p>
                      <div className='flex gap-4'>
                        <AiFillHeart className='w-[30px] h-[30px] hover:text-red-600 transition-colors' />
                        <RiDeleteBin2Line className='w-[30px] h-[30px] hover:text-red-600 transition-colors'  onClick = {() => handleConfirmClicksDelete(item.id)} />
                        {/* onClick={() => handleConfirmClicksDelete(item.id, item.color, item.size)} */}
                      </div>
                    </div>
                  </Grid.items>
                </Grid>
              ))}
            </div>
          </Grid.items>
          <Grid.items>
            <div className='bg-white p-4 rounded-md min-h-[200px] w-full'>
              <h1 className='text-2xl font-semibold'>Order Summary</h1>
              <div className='flex w-full flex-col gap-2 mt-2'>
                <div className='flex justify-between'>
                  <p>{`${getTotalQuantity()} item`}</p>
                  <p>{cart.length <= 0 ? `Rp 0`:`${getTotalPriceItem()}` }</p>
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
              <Button className='bg-[#232321] mt-4 w-full disabled:bg-[#70706E]' onClick={handleClickCheackOut} disabled={cart.length === 0 ? true : false}>
                Checkout
              </Button>
            </div>
          </Grid.items>
        </Grid>
      </Container>
      <Container>
        <div className='mb-6 flex justify-between'>
          <h1 className='text-3xl font-semibold'>You May Also Like</h1>
          <div className='flex gap-2'>
            <button className='swiper-button-prev text-lg px-4 bg-[#232321] text-white rounded-md disabled:bg-[#70706E]'> &lt;</button>
            <button className='swiper-button-next text-lg px-4 bg-[#232321] text-white rounded-md disabled:bg-[#70706E]'>&gt;</button>
          </div>
        </div>

        <SwiperItems data={recomandItem} loading={loading}/>
      </Container>

      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />

      <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className='w-[280px] lg:w-[450px] md:p-4 flex flex-col items-center gap-6'>
          <AiOutlineWarning className='text-[60px] text-red-600' />
          <h1 className='text-2xl font-semibold'>Are You sure?</h1>
          <p className='text-center'>Do you want to delete this item? this process cannot be undone</p>
          <div className='flex gap-4'>
            <Button className='bg-slate-400' onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button className='bg-red-600' onClick={() => handleClickDelete()}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default CartPage;
