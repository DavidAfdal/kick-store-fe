import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Product } from '../models/shoesModel';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import 'swiper/css';
import { ConvertRupiah } from '../utils/formater';
import SkeletonCard from './SkeletonCard';
import Grid from './Grid';

type SwiperItemsProps = {
  data: Product[] | null;
  loading?: boolean;
};

const SwiperItems = ({ data, loading = false}: SwiperItemsProps) => {
  const navigate = useNavigate();
  return loading ?   
  <Grid columnsAmount={4}>

    {Array.from({length: 4}).map((_,i) => (
   <SkeletonCard key={i}/>
    ))}
  </Grid>  
 :

    <Swiper
      spaceBetween={16}
      slidesPerView={4}
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
    >
      { data !== null ?

     
      data.map((data) => (
        <SwiperSlide key={data.id}>
          <Card>
            <Card.Img src={data.thumbImg} alt={data.name} createdAt={data.createdAt} diskon={data.diskon} />
            <Card.Title>{data.name}</Card.Title>
            <Card.Button onClick={() => navigate(`/details/${data.id}`)}>
              {' '}
              View Product - <span className='text-[#FFA52F]'>&nbsp;{ConvertRupiah(data.price)}</span>
            </Card.Button>
          </Card>
        </SwiperSlide>
      )) : null 
      
      }
     
    </Swiper>
  
};

export default SwiperItems;
