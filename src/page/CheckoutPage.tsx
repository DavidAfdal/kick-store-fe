import React from 'react';

import CheckBox from '../components/CheckBox';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Input from '../components/Input';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const CheckoutPage = () => {
  const cart = useSelector((state: RootState) => state.cartReducer.cart);
  //   React.useEffect(() => {
  //     async () => {
  //       try {
  //         const [products, reviews] = await Promise.all([axios.get(''), axios.get('')]);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //   }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

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
  return (
    <main>
      <Container className='mt-4'>
        <Grid columnsAmount={1} className='lg:grid-cols-3 mt-4 md:gap-x-10'>
          <Grid.items className='order-last md:col-span-2 lg:order-none '>
            <div>
              <h1 className='mb-4 text-3xl font-semibold'>Contact Details</h1>
              <p className='mb-4'> We will use these details to keep you inform about your delivery.</p>
              <Grid columnsAmount={1} className='lg:grid-cols-2'>
                <Input type='text' placeholder='Email'></Input>
              </Grid>
            </div>
            <div className='mt-4'>
              <h1 className='mb-4 text-3xl font-semibold'>Shipping Address</h1>
              <Grid columnsAmount={1} className='lg:grid-cols-2 mt-4'>
                <Grid.items>
                  <Input type='text' placeholder='First Name*'></Input>
                </Grid.items>
                <Grid.items>
                  <Input type='text' placeholder='Last Name'></Input>
                </Grid.items>
                <Grid.items className='lg:col-span-2'>
                  <Input type='text' placeholder='Find Delivery Addres*'></Input>
                </Grid.items>
                <Grid.items>
                  <Input type='text' placeholder='Phone Number'></Input>
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
              <Button className='bg-[#232321] lg:w-[400px] py-3 mt-4'>Pay</Button>
            </div>
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
              </div>

              <div className='bg-white  rounded-xl p-4 mt-4'>
                <h1 className='text-2xl font-semibold mb-4'>Order Details</h1>
                {cart.map((item, i) => (
                  <Grid columnsAmount={2} key={i} className='mb-8 md:grid-cols-3'>
                    <Grid.items>
                      <div className='w-full min-h-[200px]'>
                        <img src={item.thumbnail} alt='img1' style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </div>
                    </Grid.items>
                    <Grid.items className='md:col-span-2'>
                      <p className='text-lg font-semibold line-clamp-2'>{item.title}</p>
                      <p className='text-gray'>Men's Runners Shoe</p>
                      <p className='text-gray'>{item.color}</p>
                      <div className='flex flex-col lg:flex-row gap-4'>
                        <p className='text-gray'>Size {item.size}</p>
                        <p className='text-gray'>Quantity {item.quantity}</p>
                      </div>
                      <p className='text-[#4A69E2] font-semibold'>${item.price}</p>
                    </Grid.items>
                  </Grid>
                ))}
              </div>
            </Grid>
          </Grid.items>
        </Grid>
      </Container>
    </main>
  );
};

export default CheckoutPage;
