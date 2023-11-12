import Container from './Container';
import Button from './Button';
import BannerImg from '../assets/Image/Banner.jpg';

const Banner = ({ onClick }: { onClick: () => void }) => {
  return (
    <Container>
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
          <div>
            <img src='/' alt='' className='w-[64px] h-[64px] border-2 border-white md:w-[150px] md:h-[150px] rounded-lg mb-4' />
            <img src='/' alt='' className='w-[64px]  h-[64px] border-2 border-white md:w-[150px] md:h-[150px] rounded-lg' />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
