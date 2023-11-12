import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CartItemModel } from '../models/cartModels';
import ShoesData from '../data/ShoesData';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Card from '../components/Card';
import Button from '../components/Button';

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
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
                        <p className='hidden md:block text-[#4A69E2] font-semibold'>{item.price}</p>
                      </div>
                      <p className='text-gray'>Men's Runners Shoe</p>
                      <p className='text-gray'>{item.quantity}</p>
                      <p>{item.color}</p>
                      <p className='md:hidden block text-[#4A69E2] font-semibold'>{item.price}</p>
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
                  <p>2 Item</p>
                  <p>$230.00</p>
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
                  <p className='font-semibold'>$236.99</p>
                </div>
              </div>
              <Button className='bg-[#232321] mt-4 w-full' onClick={handleClickCheackOut}>
                Checkout
              </Button>
            </div>
          </Grid.items>
        </Grid>
      </Container>
      <Container>
        <div className='mb-6'>
          <h1 className='text-3xl font-semibold'>You May Also Like</h1>
        </div>
        <Grid columnsAmount={2} className='md:grid-cols-4'>
          {ShoesData.slice(0, 4).map((data) => (
            <Grid.items key={data.id}>
              <Card>
                <Card.Img src={data.thumbnail} alt={data.nama} tags={data.tag} diskon={data.Discount} />
                <Card.Title>{data.nama}</Card.Title>
                <Card.Button onClick={() => navigate(`/details/${data.id}`)}>
                  {' '}
                  View Product - <span className='text-[#FFA52F]'>&nbsp;${data.harga}</span>
                </Card.Button>
              </Card>
            </Grid.items>
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default CartPage;
