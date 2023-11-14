import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ShoeModel } from '../models/shoesModel';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import 'swiper/css';

type SwiperItemsProps = {
  data: ShoeModel[];
};

const SwiperItems = ({ data }: SwiperItemsProps) => {
  const navigate = useNavigate();
  return (
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
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Navigation]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
    >
      {data.slice(0, 8).map((data) => (
        <SwiperSlide key={data.id}>
          <Card>
            <Card.Img src={data.thumbnail} alt={data.nama} tags={data.tag} diskon={data.Discount} />
            <Card.Title>{data.nama}</Card.Title>
            <Card.Button onClick={() => navigate(`/details/${data.id}`)}>
              {' '}
              View Product - <span className='text-[#FFA52F]'>&nbsp;${data.harga}</span>
            </Card.Button>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperItems;
