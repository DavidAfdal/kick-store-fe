import React from 'react';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';
import { ShoeModel } from '../models/shoesModel';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartSlice';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/auth-context';
import { ColorModel } from '../models/colorModel';
import ShoesData from '../data/ShoesData';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import SwiperItems from '../components/SwiperItems';

const DetailsPage = () => {
  const { id } = useParams();
  const { isLoggedIn } = React.useContext(AuthContext) as AuthContextType;
  const [size, setSize] = React.useState(38);
  const [like, setLike] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const [authModal, setAuthModal] = React.useState<boolean>(false);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const dispatch = useDispatch();

  const detailsData: ShoeModel | undefined = ShoesData.find((data) => data.id.toString() === id);

  const priceAfterDiscount = (diskon: number, price: number) => {
    return price - price * (diskon / 100);
  };

  const handleChangeRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleClickAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    // try {
    //   axios.post('', {});
    // } catch (error) {
    //   console.log(error);
    // }

    if (isLoggedIn) {
      if (detailsData) {
        const data = {
          id: detailsData.id,
          title: detailsData.nama,
          quantity: 0,
          size: size,
          thumbnail: detailsData.gambar[0],
          color: selectedColor === '' ? detailsData.color[0].nama : selectedColor,
          price: detailsData.Discount ? priceAfterDiscount(detailsData.Discount, parseInt(detailsData.harga)).toString() : detailsData.harga,
        };

        dispatch(addToCart(data));

        toast.success('Succes Add To Cart', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      setAuthModal(true);
    }
  };

  const handleLike = () => {
    if (isLoggedIn) {
      setLike(!like);
    } else {
      setAuthModal(true);
    }
  };

  //   React.useEffect(() => {
  //     async () => {
  //       try {
  //         const [productDetails, recommandProduct] = await Promise.all([axios.get(''), axios.get('')]);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //   }, []);

  return (
    <main>
      <Container className='mt-8'>
        <Grid columnsAmount={1} className='lg:grid-cols-3'>
          {/* img-details-section */}
          <Grid.items className='col-span-2'>
            <Grid columnsAmount={2}>
              <Grid.items>
                <div className='w-full aspect-square'>
                  <img src={detailsData?.gambar[0]} alt='' className='object-cover object-center w-full h-full rounded-tl-[50px]' />
                </div>
              </Grid.items>
              <Grid.items>
                <div className='w-full aspect-square'>
                  <img src={detailsData?.gambar[1]} alt='' className='object-cover object-center w-full h-full rounded-tr-[50px]' />
                </div>
              </Grid.items>
              <Grid.items>
                <div className=' w-full  aspect-square'>
                  <img src={detailsData?.gambar[2]} alt='' className='object-cover object-center w-full h-full rounded-bl-[50px]' />
                </div>
              </Grid.items>
              <Grid.items>
                <div className='w-full  aspect-square'>
                  <img src={detailsData?.gambar[3]} alt='' className='object-cover object-center w-full h-full rounded-br-[50px]' />
                </div>
              </Grid.items>
            </Grid>
          </Grid.items>

          {/* details-product-section */}
          <Grid.items>
            <div className='flex flex-col gap-4'>
              {detailsData?.Discount ? <div className='bg-[#FFA52F]  p-4 rounded-lg font-semibold text-xl w-[120px]'>{detailsData?.Discount}% off</div> : null}
              <h1 className='text-3xl font-semibold'>{detailsData?.nama}</h1>
              <div className='flex gap-4'>
                <p className={`text-2xl text-[#4A69E2] font-semibold ${detailsData?.Discount ? 'line-through' : ''}`}>{`$${detailsData?.harga}`}</p>
                {detailsData?.Discount ? <p className='text-2xl text-[#4A69E2] font-semibold'> {formatter.format(priceAfterDiscount(detailsData.Discount, parseInt(detailsData.harga)))}</p> : null}
              </div>

              {/* colorshoes-selection */}
              <h1 className='font-semibold'>COLOR</h1>
              <Grid columnsAmount={7} className='sm:grid-cols-8'>
                {detailsData?.color.map((value: ColorModel, i: number) => (
                  <Grid.items key={i}>
                    <label className='color'>
                      <input type='radio' name='cp' className='hidden color-picker peer' value={value.nama} onChange={handleChangeRadioBtn} defaultChecked={i === 0} />
                      <div className='circle-button  '>
                        <div className='border-picker peer-checked:border peer-checked:border-[#4A69E2]'>
                          <span style={{ backgroundColor: value.color }}></span>
                        </div>
                      </div>
                    </label>
                  </Grid.items>
                ))}
              </Grid>

              {/* sizeshoes-selection */}
              <h1 className='font-semibold'>SIZE</h1>
              <Grid columnsAmount={5} className='sm:grid-cols-8'>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Grid.items key={i}>
                    <Button className={`bg-white ${size === i + 38 ? 'bg-[#232321] text-white' : 'text-[#232321]'} py-3 disabled:bg-[#878787] disabled:text-[#b6b4b4]`} disabled={i + 38 === 40} onClick={() => setSize(i + 38)}>
                      {38 + i}
                    </Button>
                  </Grid.items>
                ))}
              </Grid>

              {/*button-details-section*/}
              <div className='flex gap-2'>
                <Button className='w-full bg-[#232321] grow-[2]' onClick={handleClickAddToCart}>
                  Add To Cart
                </Button>
                <Button className='bg-[#232321]' onClick={handleLike}>
                  <AiFillHeart className={`${like === true ? 'text-red-500' : ''}`} />
                </Button>
              </div>
              <Button className='w-full' onClick={() => setAuthModal(true)}>
                Buy It Now
              </Button>

              {/* Deskripsi-product-section */}
              <p className='font-semibold'>ABOUT THE PRODUCT</p>
              <p>Shadow Navy / Army Green</p>
              <p className='text-justify'>
                This product is excluded from all promotional discounts and offers. Pay over time in interest-free installments with Affirm, Klarna or Afterpay. Join adiClub to get unlimited free standard shipping, returns, & exchanges.
              </p>
            </div>
          </Grid.items>
        </Grid>
      </Container>

      {/* Rekomendation-section */}
      <Container>
        <div className='mb-6 flex justify-between'>
          <h1 className='text-3xl font-semibold sm:divide-x-0'>You May Also Like</h1>
          <div className='flex gap-2'>
            <button className='swiper-button-prev text-lg px-4 bg-[#232321] text-white rounded-md disabled:bg-[#70706E]'> &lt;</button>
            <button className='swiper-button-next text-lg px-4 bg-[#232321] text-white rounded-md disabled:bg-[#70706E]'>&gt;</button>
          </div>
        </div>

        {/* list of Rekomendation products */}
        {/* <Grid columnsAmount={2} className='lg:grid-cols-4'>
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
        </Grid> */}

        <SwiperItems data={ShoesData} />
      </Container>

      <Modal open={authModal} onClose={() => setAuthModal(false)}>
        <div className='w-[280px] lg:w-[450px] md:p-4'>
          <h1 className='font-semibold mb-4 text-center text-2xl'>Sign In</h1>
          <form className='flex flex-col gap-4'>
            <Input type='email' placeholder='kadek12@gmail.com' className='bg-white' />
            <div>
              <Input type='password' placeholder='password' className='bg-white mb-2' />
              <Link to='/'>Forgot Password?</Link>
            </div>
            <Button>Sign In</Button>
            <p className='text-center'>
              Don't have an account ?{' '}
              <Link to='/register' className='text-[#4A69E2]'>
                Create one
              </Link>
            </p>
          </form>
        </div>
      </Modal>

      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </main>
  );
};

export default DetailsPage;
