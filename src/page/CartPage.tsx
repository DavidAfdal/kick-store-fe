import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CartItemModel } from '../models/cartModels';
import ShoesData from '../data/ShoesData';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Button from '../components/Button';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Modal from '../components/Modal';
import { AiOutlineWarning, AiOutlinePlus, AiOutlineMinus, AiFillHeart } from 'react-icons/ai';
import { decrementQuantity, incrementQuantity, removeItem } from '../redux/reducer/cartSlice';
import SwiperItems from '../components/SwiperItems';

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState({ id: 0, color: '', size: 0 });
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const navigate = useNavigate();
  //   React.useEffect(() => {
  //     async () => {
  //       try {
  //         const [products, reviews] = await Promise.all([axios.get(''), axios.get('')]);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //   }, []);

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
      total += item.quantity * parseInt(item.price);
    });

    return formatter.format(total);
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * parseInt(item.price);
    });

    return formatter.format(total + 6.99);
  };

  const handleConfirmClicksDelete = (id: number, color: string, size: number) => {
    setSelectedItem({ id: id, color: color, size: size });
    setDeleteModal(true);
  };

  const handleClickDelete = () => {
    dispatch(removeItem(selectedItem));
    setDeleteModal(false);
  };

  const handleClickCheackOut = () => {
    // try {
    //   axios.post("",{})
    // } catch (error) {
    //   console.log(error)
    // }

    navigate('/checkout');
  };

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
                      <img src={item.thumbnail} alt='img1' style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                  </Grid.items>
                  <Grid.items className='md:col-span-2'>
                    <div className='flex flex-col gap-4'>
                      <div className='md:flex md:justify-between'>
                        <p className='md:text-2xl font-semibold lg:w-[80%]'>{item.title}</p>
                        <p className='hidden md:block text-[#4A69E2] font-semibold'>{formatter.format(parseInt(item.price))}</p>
                      </div>
                      <p className='text-gray'>Men's Runners Shoe</p>
                      <p>{item.color}</p>
                      <div className='flex md:items-center gap-4 flex-col md:flex-row'>
                        <p>Size : {item.size}</p>
                        <div className='flex md:items-center gap-4 flex-col md:flex-row'>
                          <p>Quantity :</p>
                          <div className='flex gap-4'>
                            <div className='rounded-full bg-[#232321] p-1'>
                              <AiOutlineMinus className='md:text-lg text-white' onClick={() => dispatch(decrementQuantity({ id: item.id, color: item.color, size: item.size }))} />
                            </div>

                            <p className='text-gray text-lg'>{item.quantity}</p>
                            <div className='rounded-full bg-[#232321] p-1'>
                              <AiOutlinePlus className='md:text-lg text-white' onClick={() => dispatch(incrementQuantity({ id: item.id, color: item.color, size: item.size }))} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className='md:hidden block text-[#4A69E2] font-semibold'>${item.price}</p>
                      <div className='flex gap-4'>
                        <AiFillHeart className='w-[30px] h-[30px] hover:text-red-600 transition-colors' />
                        <RiDeleteBin2Line className='w-[30px] h-[30px] hover:text-red-600 transition-colors' onClick={() => handleConfirmClicksDelete(item.id, item.color, item.size)} />
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
                  <p>{`${getTotalPriceItem()}`}</p>
                </div>
                <div className='flex justify-between'>
                  <p>Delivery</p>
                  <p>$6.99</p>
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

        <SwiperItems data={ShoesData} />
      </Container>

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
