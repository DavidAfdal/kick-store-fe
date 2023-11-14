import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoesData from '../data/ShoesData';
import Banner from '../components/Banner';
import Grid from '../components/Grid';
import Container from '../components/Container';
import Button from '../components/Button';
import Card from '../components/Card';
import review1 from '../assets/Image/review1.jpg';
import ReviewCard from '../components/ReviewCard';
import category1 from '../assets/Image/category1.png';
import category2 from '../assets/Image/category2.png';
import category3 from '../assets/Image/category3.png';
import category4 from '../assets/Image/category4.png';
import category5 from '../assets/Image/category5.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const HomePage = () => {
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
  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <main>
      <Banner onClick={() => navigate('/shop')} />
      <Container>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold'>
            Don’t miss out <br />
            new drops
          </h1>
          <Button onClick={() => handleClick('/shop')}>SHOP NEW DROPS</Button>
        </div>
        <Grid columnsAmount={2} className='lg:grid-cols-4'>
          {ShoesData.slice(0, 4).map((data) => (
            <Grid.items key={data.id}>
              <Card>
                <Card.Img src={data.thumbnail} alt='coba' tags={data.tag} diskon={data.Discount} />
                <Card.Title>{data.nama}</Card.Title>
                <Card.Button onClick={() => navigate(`/details/${data.id}`)}>
                  View Product - <span className='text-[#FFA52F]'>&nbsp;${data.harga}</span>
                  {}
                </Card.Button>
              </Card>
            </Grid.items>
          ))}
        </Grid>
      </Container>

      <section className='bg-[#232321] w-full h-full mb-[100px]'>
        <div className='left-container'>
          <div className='flex justify-between items-center'>
            <h1 className='text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl my-10'>CATEGORIES</h1>
            <div className='flex gap-2 mr-6'>
              <button className='swiper-button-prev text-lg px-4 bg-white text-[#232321] rounded-md disabled:bg-[#70706E] py-2'> &lt;</button>
              <button className='swiper-button-next text-lg px-4 bg-white text-[#232321] rounded-md disabled:bg-[#70706E] py-2'>&gt;</button>
            </div>
          </div>
          <div className='w-full min-h-[400px]'>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
            >
              <SwiperSlide>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div className='p-4 bg-[#ECEEF0]  rounded-tl-[25px]'>
                    <div className='flex justify-center'>
                      <img src={category1} className='max-w[450px] max-h-[500px] object-cover object-center aspect-square' />
                    </div>
                    <p className='text-3xl text-bold'>
                      LIFESTYLE <br />
                      SHOES
                    </p>
                  </div>

                  <div className='p-4 bg-[#ECEEF0]'>
                    <div className='flex justify-center'>
                      <img src={category2} className='max-w[450px] max-h-[500px] object-cover object-center aspect-square' />
                    </div>
                    <p className='text-3xl text-bold'>
                      BASKETBALL <br />
                      SHOES
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div className='p-4 bg-[#ECEEF0]  rounded-tl-[25px]'>
                    <div className='flex justify-center'>
                      <img src={category3} className='xl:min-h-[500px] max-w[450px] max-h-[500px] object-cover object-center aspect-square' />
                    </div>
                    <p className='text-3xl text-bold'>
                      GOLF <br />
                      SHOES
                    </p>
                  </div>

                  <div className='p-4 bg-[#ECEEF0]'>
                    <div className='flex justify-center'>
                      <img src={category4} className=' max-w[450px] max-h-[500px] object-cover object-center aspect-square' />
                    </div>
                    <p className='text-3xl text-bold'>
                      OUTDOOR <br />
                      SHOES
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div className='p-4 bg-[#ECEEF0]  rounded-tl-[25px]'>
                    <div className='flex justify-center'>
                      <img src={category5} className=' max-w[450px] max-h-[500px] object-cover object-center aspect-square' />
                    </div>
                    <p className='text-3xl text-bold'>
                      RUNNER <br />
                      SHOES
                    </p>
                  </div>

                  <div className='p-4 bg-[#ECEEF0]'>
                    <div className='flex justify-center'>
                      <img src={category2} className=' max-w[450px] max-h-[500px] object-cover object-center aspect-square' />
                    </div>
                    <p className='text-3xl text-bold'>
                      BASKETBALL <br />
                      SHOES
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <Container>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold'>REVIEWS</h1>
          <Button>SEE ALL</Button>
        </div>
        <Grid columnsAmount={1} className='lg:grid-cols-3 [&>*:nth-child(3)]:hidden [&>*:nth-child(2)]:hidden lg:[&>*:nth-child(2)]:block lg:[&>*:nth-child(3)]:block'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Grid.items key={i}>
              <ReviewCard>
                <ReviewCard.Content rating={4} img={review1}>
                  <h1 className='font-semibold lg:text-2xl'>Good Quality</h1>
                  <p className='max-w-[90%]'>I highly recommend shopping from kicks</p>
                </ReviewCard.Content>
                <ReviewCard.Image img={review1} />
              </ReviewCard>
            </Grid.items>
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default HomePage;
