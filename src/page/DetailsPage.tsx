import React from 'react';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';
import { ShoeModel } from '../models/shoesModel';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ShoesData from '../data/ShoesData';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { ColorModel } from '../models/colorModel';

const DetailsPage = () => {
  const { id } = useParams();
  const [size, setSize] = React.useState(38);
  const [like, setLike] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const detailsData: ShoeModel | any = ShoesData.find((data) => data.id.toString() === id);

  const handleLikeClick = () => {
    setLike(!like);
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

    const data = {
      id: detailsData.id,
      title: detailsData.nama,
      quantity: 0,
      size: size,
      thumbnail: detailsData.gambar[0],
      color: selectedColor === '' ? detailsData.color[0].nama : selectedColor,
      price: detailsData.harga,
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
  };

  const handleClickBuyItNow = () => {
    // try {
    //   axios.post('', {});
    // } catch (error) {
    //   console.log(error);
    // }
    navigate('/cart');
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
              <h1 className='text-3xl font-semibold'>{detailsData?.nama}</h1>
              <p className='text-2xl text-[#4A69E2] font-semibold'>{`$${detailsData?.harga}`}</p>

              {/* colorshoes-selection */}
              <h1 className='font-semibold'>COLOR</h1>
              <Grid columnsAmount={7} className='sm:grid-cols-8'>
                {detailsData.color.map((value: ColorModel, i: number) => (
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
                <Button className='bg-[#232321]' onClick={() => setLike(!like)}>
                  <AiFillHeart className={`${like === true ? 'text-red-500' : ''}`} />
                </Button>
              </div>
              <Button className='w-full' onClick={() => setOpen(true)}>
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
        <div className='mb-6'>
          <h1 className='text-3xl font-semibold'>You May Also Like</h1>
        </div>

        {/* list of Rekomendation products */}
        <Grid columnsAmount={2} className='lg:grid-cols-4'>
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

      <Modal open={open} onClose={() => setOpen(false)}>
        <h1>David Afdal</h1>
      </Modal>

      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </main>
  );
};

export default DetailsPage;
