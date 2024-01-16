
import Grid from '../components/Grid';
import { Revview } from '../data/ReviewData';
import ReviewCard from '../components/ReviewCard';
import Container from '../components/Container';

const ReviewsPage = () => {
    return (
        <main>
            <Container className='mt-[50px]'>
            <h1 className='text-center text-4xl font-bold mb-4'>All Reviews</h1>
            <Grid columnsAmount={1} className='lg:grid-cols-3 [&>*:nth-child(3)]:hidden [&>*:nth-child(2)]:hidden lg:[&>*:nth-child(2)]:block lg:[&>*:nth-child(3)]:block'>
          {Revview.map((data, i) => (
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
            </Container>
      </main>
    );
};

export default ReviewsPage;