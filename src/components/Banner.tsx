import Container from './Container';
import Button from './Button';
import BannerImg from '../assets/Image/Banner.jpg';
import img1 from '../assets/Image/Rectangle 1.png';
import img2 from '../assets/Image/Rectangle 2.png';

const Banner = ({ onClick }: { onClick: () => void }) => {
  return (
    <Container className='z-[-1]'>
      <h1 className='text-5xl md:text-[200px] lg:text-[220px] font-bold'>
        DO IT <span className='text-[#4A69E2]'>RIGHT</span>
      </h1>
      <div className='aspect-[2/3] md:aspect-[16/9]'>
        <div
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), url(${BannerImg}) `, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          className='h-full rounded-[25px] md:rounded-[50px] flex items-end p-4 lg:p-8 justify-between '
        >
          <div>
            <p className='text-2xl lg:text-6xl text-white mb-2'>NIKE AIR MAX</p>
            <p className='lg:text-2xl text-white mb-2'>Nike introducing the new air max for everyone's comfort</p>
            <Button onClick={onClick}>Shop Now</Button>
          </div>
          <div className='hidden md:block'>
            <img src={img1} alt='' className='w-[64px] h-[64px] border-2 border-white lg:w-[150px] lg:h-[150px] rounded-lg mb-4 object-cover object-center aspect-square' />
            <img src={img2} alt='' className='w-[64px]  h-[64px] border-2 border-white lg:w-[150px] lg:h-[150px] rounded-lg object-cover object-center aspect-square' />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
