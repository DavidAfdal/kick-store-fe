import React from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import ShoesData from '../data/ShoesData';
import Card from '../components/Card';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import CheckBox from '../components/CheckBox';
import BannerImg2 from '../assets/Image/Baner3.png';
import Input from '../components/Input';

const ShopPage = () => {
  const [page, setPage] = React.useState<number | null>(null);

  const handleChangePage = (selecteditem: { selected: number }) => {
    setPage(selecteditem.selected + 1);
  };
  const navigate = useNavigate();
  //   React.useEffect(() => {
  //     async () => {
  //       try {
  //         const products =  await axios.get()
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //   }, [page,sort, filters]);

  return (
    <main>
      <Container className='mt-4 lg:mb-[10px]'>
        <div
          className='aspect-[21/7] w-full rounded-2xl p-8 flex items-center'
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), url(${BannerImg2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className='lg:w-[50%] text-white flex flex-col gap-4'>
            <p className='lg:text-2xl'>Limited time only</p>
            <p className='text-2xl md:text-5xl lg:text-7xl font-semibold'>Get 30% off</p>
            <p className='text-[10px] sm:text-base lg:text-xl'>Sneakers made with your comfort in mind so you can put all of your focus into your next session.</p>
          </div>
        </div>
      </Container>
      <Container>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <p className='text-base md:text-2xl lg:text-3xl font-semibold'>Life Style Shoes</p>
            <p>122 items</p>
          </div>

          <div className='bg-white p-4 rounded-md shadow-md'>
            <select onClick={() => console.log(page)} className='bg-white min-w-[120px] lg:min-w-[200px] focus:outline-0  border-none'>
              <option>Trending</option>
              <option>Latelest</option>
              <option>Chawnima</option>
            </select>
          </div>
        </div>
        <Grid columnsAmount={1} className='lg:grid-cols-4'>
          <Grid.items>
            <p className='font-semibold mb-4'>Filters</p>
            <div className='flex flex-col gap-4'>
              <SearchInput placeholder='Search' className='w-full' />
              <Accordion title='Category'>
                <div className='flex flex-col gap-2'>
                  <CheckBox label='Casual' />
                  <CheckBox label='Basketball' />
                  <CheckBox label='Runners' />
                  <CheckBox label='Outdoor' />
                  <CheckBox label='Golf' />
                  <CheckBox label='Hiking' />
                </div>
              </Accordion>
              <Accordion title='Gender'>
                <CheckBox label='Male' />
                <CheckBox label='Female' />
              </Accordion>
              <Accordion title='Price'>
                <div className='flex gap-4'>
                  <Input type='text' placeholder='$ Min' />
                  <Input type='text' placeholder='$ Max' />
                </div>
              </Accordion>
              <Button className='w-full bg-[#232321]'>Apply</Button>
            </div>
          </Grid.items>
          <Grid.items className='col-span-3'>
            <Grid columnsAmount={2} className='gap-y-8 lg:grid-cols-3'>
              {ShoesData.map((data) => (
                <Card key={data.id}>
                  <Card.Img src={data.thumbnail} alt={data.nama} tags={data.tag} diskon={data.Discount} />
                  <Card.Title>{data.nama}</Card.Title>
                  <Card.Button onClick={() => navigate(`/details/${data.id}`)}>
                    {' '}
                    View Product{' '}
                    <span className='text-[#FFA52F] hidden sm:block'>
                      &nbsp; <span className='text-white'>-</span> &nbsp; ${data.harga}
                    </span>
                  </Card.Button>
                </Card>
              ))}
            </Grid>
            <div className='flex justify-center mt-8 px-2'>
              <ReactPaginate
                breakLabel='...'
                nextLabel={
                  <div className='border border-[#232321] px-4 py-1 rounded-[5px]'>
                    <p className='hidden lg:block'>{`NEXT >`}</p>
                    <p className='block lg:hidden'>{`>`}</p>
                  </div>
                }
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageClassName='pagination-items'
                pageCount={10}
                previousLabel={
                  <div className='border border-[#232321] px-4 py-1 rounded-[5px]'>
                    <p className='hidden lg:block'>{`< PREVIOUS`}</p>
                    <p className='block lg:hidden'>{`<`}</p>
                  </div>
                }
                renderOnZeroPageCount={null}
                onPageChange={handleChangePage}
                className='flex gap-2 lg:gap-4 pagination'
              />
            </div>
          </Grid.items>
        </Grid>
      </Container>
    </main>
  );
};

export default ShopPage;
