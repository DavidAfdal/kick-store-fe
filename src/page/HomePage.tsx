import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import Grid from '../components/Grid';
import Container from '../components/Container';
import Button from '../components/Button';
import Card from '../components/Card';
import category1 from '../assets/Image/category1.png';
import category2 from '../assets/Image/category2.png';
import category3 from '../assets/Image/category3.png';
import category4 from '../assets/Image/category4.png';
import category5 from '../assets/Image/category5.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import SkeletonCard from '../components/SkeletonCard';
import { Product } from '../models/shoesModel';
import { ConvertRupiah } from '../utils/formater';
import 'swiper/css';



const HomePage = () => {
  // const [modalI, setModalI] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [recomand, setRecomand] = React.useState<Product[] | null>(null);
  const navigate = useNavigate();


  React.useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shoe/recomand?limit=4`);
        setRecomand(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };

   

   
    const timer = setTimeout(() => {
      getData();
    }, 5000);
    
    return ()  => {
      clearTimeout(timer)
    }

  }, []);
  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <main className='relative'>
      {/* <Button className='fixed bottom-5 right-4 z-50' onClick={() => setModalI(true)}>
        i
      </Button> */}
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
          {loading ? 
           Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : recomand?.map((data) => 
            (
            <Grid.items key={data.id}>
                <Card>
                  <Card.Img src={data.thumbImg} alt='coba' diskon={data.diskon} createdAt={data.createdAt} />
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Button onClick={() => navigate(`/details/${data.id}`)}>

                     
                    View Product - <span className='text-[#FFA52F]'>&nbsp;{data.diskon ? ConvertRupiah(data.price - (data.price*data.diskon/100)) : ConvertRupiah(data.price)}</span>

                  </Card.Button>
                </Card>
            </Grid.items>
          ))
          }
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
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Navigation]}>
            
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

      {/* <Container>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold'>REVIEWS</h1>
          <Link to="/reviews">
          <Button type="button">SEE ALL</Button>
          </Link>
        </div>
        <Grid columnsAmount={1} className='lg:grid-cols-3 [&>*:nth-child(3)]:hidden [&>*:nth-child(2)]:hidden lg:[&>*:nth-child(2)]:block lg:[&>*:nth-child(3)]:block'>
          {Revview.slice(0,3).map((data, i) => (
            <Grid.items key={i}>
              <ReviewCard>
                <ReviewCard.Content rating={data.rating} img={data.profileImg}>
                  <h1 className='font-semibold lg:text-2xl'>{data.nama}</h1>
                  <p className='max-w-[90%]'>{data.review}</p>
                </ReviewCard.Content>
                <ReviewCard.Image img={data.productImhg} />
              </ReviewCard>
            </Grid.items>
          ))}
        </Grid>
      </Container> */}
{/* 
      <Modal open={modalI} onClose={() => setModalI(false)}>
        <div className='w-[280px] lg:w-[450px] md:p-4 flex flex-col gap-4'>
          <h1 className='text-2xl text-center uppercase text-blue-800 font-semibold'>Informasi</h1>
          <p className='text-center uppercase'>Aplikasi Ini Dibuat oleh :</p>
          <ul className='text-center flex flex-col gap-4'>
            <li>DAVID AFDAL KAIZAR MUTAHADI 10121319</li>
            <li>I KADEK ANDIKA DWI PUTRA 10121569</li>
            <li>FACHRI TAUFIQURRAHMAN 10121393</li>
            <li>SHEEHAN RAFEE' EFFENDI 11121211</li>
            <li>BRIGHT DAVID ANDREAS 10121272</li>
          </ul>
          <p className='text-center uppercase leading-8'>Dari Kelas 3KAO5 untuk melengkapi tugas mata kuliah Interaksi Manusia dan Komputer yang dibimbing oleh Ibu Dr. Feni Agustina, SKOM., MMSI.</p>
        </div>
      </Modal> */}
    </main>
  );
};

export default HomePage;




             