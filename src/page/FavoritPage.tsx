import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Grid from '../components/Grid';
import Card from '../components/Card';
import { AiFillHeart } from 'react-icons/ai';
import { removeItem } from '../redux/reducer/likeSlice';
import { useNavigate } from 'react-router-dom';
import BinocularImg from '../assets/Image/binocul.png';
import Button from '../components/Button';

const FavoritPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Likes = useSelector((state: RootState) => state.likeReducer.like);
  const handelClickLike = (id: number) => {
    dispatch(removeItem(id));
  };
  return (
    <main>
      <section className='p-4 h-screen'>
        <h1 className='text-3xl text-black uppercase font-semibold'>Favorit Shoes</h1>
        {Likes.length === 0 ? (
          <div className='h-screen flex justify-center items-center flex-col gap-4'>
            <img src={BinocularImg} alt='favoritImg' className='object-fit object-center w-[250px] h-[250px]' />
            <h1 className='text-3xl font-semibold'>No Favorit Shoes Yet</h1>
            <div className='flex flex-col gap-4 items-center'>
              <p className='text-center text-xl'>No need to rush shooping,</p>
              <p className='text-center text-xl'>explore KICKS and enter your favorite shoe here.</p>
              <Button className='w-[50%] bg-[#232321]' onClick={() => navigate('/shop')}>
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <Grid columnsAmount={4} className='mt-4'>
            {Likes.map((like, i) => (
              <Grid.items key={i}>
                <Card>
                  <Card.Img src={like.thumbnail} alt={like.nama}  diskon={like.Discount} />
                  <Card.Title>{like.nama}</Card.Title>
                  <AiFillHeart className={`${like.like ? 'text-red-600' : 'text-black'} curosr-pointer w-[30px] h-[30px] mb-2 hover:text-black transition-colors cursor-pointer`} onClick={() => handelClickLike(like.id)} />
                  <Card.Button onClick={() => navigate(`/detail/${like.id}`)}>View Products</Card.Button>
                </Card>
              </Grid.items>
            ))}
          </Grid>
        )}
      </section>
    </main>
  );
};

export default FavoritPage;
