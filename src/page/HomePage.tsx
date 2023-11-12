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
          <h1 className='text-white text-2xl sm:text-3xl md:text-5xl lg:text-7xl my-10'>CATEGORIES</h1>
          <div className='w-full h-[400px] bg-white rounded-tl-[25px]'></div>
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
