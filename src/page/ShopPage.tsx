import React from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import CheckBox from '../components/CheckBox';
import BannerImg2 from '../assets/Image/Baner3.png';
import Input from '../components/Input';
import axios, { AxiosResponse } from 'axios';
import SkeletonCard from '../components/SkeletonCard';
import PaginationEntity from '../models/paginationEntity';
import Lottie from "lottie-react";
import { ConvertRupiah } from '../utils/formater';
import NotFound from "../assets/icons/noFound.json"

const ShopPage = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<PaginationEntity>(
    {
      totalItems: 0,
      totalPages: 0,
      currentPage:1,
      data: []
    }
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [openPanel, setOpenPanel] = React.useState<number[]>([1,2,3])
  const [page, setPage] = React.useState<number>(1);
  const [minMax, setMinMax] = React.useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const [sort, setSort] = React.useState<string>('diskon,desc')
  const [search, setSearch] = React.useState<string>("")
  const [category, setCategory] = React.useState<string[]>([])
  const [type, setType] = React.useState<string[]>([])
  const [searchFilter, setSearchFilter] = React.useState({
    name: "",
    category: [""],
    type: [""],
    min: 0,
    max: 0,
  })

  const formatRupiah = (value: number | string) => {
    // Format Rupiah menggunakan regex
    if (typeof value === 'string') {
      return;
    }

    return value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  };


  const handleChangePage = (selecteditem: { selected: number }) => {
    setPage(selecteditem.selected + 1);
  };

  const handleTogglePanel = (panelIndex:number) => {
    // Menggunakan callback untuk memastikan bahwa perubahan state diketahui oleh komponen Accordion
    setOpenPanel((prevOpenPanels) => {
      if (prevOpenPanels.includes(panelIndex)) {
        // Jika panel sudah terbuka, tutup panel
        return prevOpenPanels.filter((openPanel) => openPanel !== panelIndex);
      } else {
        // Jika panel belum terbuka, buka panel
        return [...prevOpenPanels, panelIndex];
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Menghapus karakter selain angka
    const inputValue = event.target.value.replace(/[^0-9]/g, '');

    // Mengubah string menjadi angka
    const numericValue = parseInt(inputValue, 10);

    // Update state dengan nilai numerik

    setMinMax({ ...minMax, [event.target.name]: inputValue === '' ? 0 : numericValue });
  };

  const handleSelectChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = event.target

    setSort(value)
    
  }

  const handleCheckBoxCategory = (event : React.ChangeEvent<HTMLInputElement>) => {
    const {value,checked} = event.target
    if (checked) {
      setCategory([...category, value]);
    } else {
      setCategory(category.filter((e) => e !== value));
    }
  }

  const handleCheckBoxType = (event : React.ChangeEvent<HTMLInputElement>) => {
    const {value,checked} = event.target
    if (checked) {
      setType([...type, value]);
    } else {
      setType(type.filter((e) => e !== value));
    }
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchFilter({
      name: search,
      category,
      type,
      min: minMax.min,
      max: minMax.max,
    })
    setPage(1)
    console.log(minMax.max)
  }

  const handleReset = () => {
    setSearch("")
    setType([]),
    setCategory([])
    setMinMax({min: 0, max: 0})
    setSearchFilter({
      name: "",
      category: [""],
      type: [""],
      min: 0,
      max: 0,
    })
   setPage(1)
  }

  React.useEffect(() => {
    setLoading(true);
    const pagination = async () => {
      console.log(searchFilter)
      try {
        const respon: AxiosResponse<PaginationEntity> = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shoe?name=${searchFilter.name}&category=${searchFilter.category.join()}&type=${searchFilter.type.join()}&min=${searchFilter.min}&max=${searchFilter.max}&sort=${sort.split(',')[0]}&order=${sort.split(',')[1]}&page=${page}`);
        setData(respon.data);
        console.log(respon.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(() => {
      pagination();
    }, 3000)
   
    return () => {
      clearTimeout(timer)
    }

  }, [searchFilter, page,sort]);

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
          </div>

          <div className='bg-white p-4 rounded-md shadow-md'>
            <select onChange={handleSelectChange} className='bg-white min-w-[120px] lg:min-w-[200px] focus:outline-0  border-none' value={sort} disabled={loading}>
              <option value='diskon,desc'>Trending</option>
              <option value='createdAt,desc'>Latelest</option>
              <option value='name,asc'>A to Z</option>
              <option value='name,desc'>Z to A</option>
            </select>
          </div>
        </div>
        <Grid columnsAmount={1} className='lg:grid-cols-4'>
          <Grid.items>
            <p className='font-semibold mb-4'>Filters</p>
            <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <SearchInput placeholder='Search' className='w-full' onChange={(e) => setSearch(e.target.value)}/>
              <Accordion title='Category' onToggle={() => handleTogglePanel(1)} isOpen={openPanel.includes(1)}>
                <div className='flex flex-col gap-2'>
                  <CheckBox label='Casual' checked={category.includes('CASUAL')} value={"CASUAL"} onChange={handleCheckBoxCategory}/>
                  <CheckBox label='Basketball' checked={category.includes('BASKETBALL')} value={"BASKETBALL"} onChange={handleCheckBoxCategory}/>
                  <CheckBox label='Runners' checked={category.includes('RUNNERS')} value={"RUNNERS"} onChange={handleCheckBoxCategory}/>
                  <CheckBox label='Outdoor' checked={category.includes('OUTDOOR')} value={"OUTDOOR"} onChange={handleCheckBoxCategory}/>
                  <CheckBox label='Golf' checked={category.includes('GOLF')} value={"GOLF"} onChange={handleCheckBoxCategory}/>
                  <CheckBox label='Hiking' checked={category.includes('HIKING')} value={"HIKING"} onChange={handleCheckBoxCategory}/>
                </div>
              </Accordion>
              <Accordion title='Gender' onToggle={() => handleTogglePanel(2)} isOpen={openPanel.includes(2)}>
                <CheckBox label='Male' checked={type.includes("MALE")} onChange={handleCheckBoxType} value={"MALE"}/>
                <CheckBox label='Female' checked={type.includes("FEMALE")} onChange={handleCheckBoxType} value={"FEMALE"}/>
              </Accordion>
              <Accordion title='Price' onToggle={() => handleTogglePanel(3)} isOpen={openPanel.includes(3)}>
                <div className='flex gap-4'>
                  <Input type='text' placeholder='Rp Min' value={minMax.min === 0 ? '' : formatRupiah(minMax?.min)} name='min' onChange={handleInputChange} />
                  <Input type='text' placeholder='Rp Max' value={minMax.max === 0 ? '' : formatRupiah(minMax?.max)} name='max' onChange={handleInputChange} />
                </div>
              </Accordion>
              <Button className='w-full bg-[#232321] disabled:bg-gray-900 disabled:text-gray-400' type="submit" disabled={loading}>Apply</Button>
              <Button className='w-full disabled:text-gray-400' type='button' onClick={handleReset} disabled={loading} >Reset</Button>
            </div>
            </form>
          </Grid.items>
          <Grid.items className='col-span-3'>
       
              {loading
                ? 
                <Grid columnsAmount={2} className='gap-y-8 lg:grid-cols-3'>

                  {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
                </Grid>


                
                : data.data.length <= 0 ? 
                <div className='h-full flex justify-center items-center'>
                  <div>
                  <Lottie animationData={NotFound} loop={true} autoPlay={true} style={{width: '100%', height: '400px'}}/>
                  <p className='text-3xl font-semibold text-center mt-8 capitalize text-[#232323]'>Items Not found</p>
                  </div>
                </div>
                :
                <Grid columnsAmount={2} className='gap-y-8 lg:grid-cols-3'>
                  {data?.data.map((data) => (
                      <Card key={data.id}>
                        <Card.Img src={data.thumbImg} alt={data.name} diskon={data.diskon} createdAt={data.createdAt} />
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Button onClick={() => navigate(`/details/${data.id}`)}>
                          {' '}
                          View Product - <span className='text-[#FFA52F]'>&nbsp;{data.diskon ? ConvertRupiah(data.price - (data.price*data.diskon/100)) : ConvertRupiah(data.price)}</span>
                        </Card.Button>
                      </Card>
                    ))}
                </Grid>
                  }
            <div className='flex justify-center mt-8 px-2'>
              {loading ? null :
              data.data.length <= 0 ? null :
              <ReactPaginate
                breakLabel='...'
                nextLabel={
                  <button className='border border-[#232321] px-4 py-1 rounded-[5px] disabled:text-gray-500 disabled:border-gray-500' disabled={page === data?.totalPages}>
                    <p className='hidden lg:block'>{`NEXT >`}</p>
                    <p className='block lg:hidden'>{`>`}</p>
                  </button>
                }
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageClassName='pagination-items'
                pageCount={data?.totalPages || 10}
                previousLabel={
                  <button className='border border-[#232321] px-4 py-1 rounded-[5px] disabled:text-gray-500 disabled:border-gray-500' disabled={page === 1}>
                    <p className='hidden lg:block'>{`< PREVIOUS`}</p>
                    <p className='block lg:hidden'>{`<`}</p>
                  </button>
                }
                initialPage={page-1}
                renderOnZeroPageCount={null}
                onPageChange={handleChangePage}
                className='flex gap-2 lg:gap-4 pagination'
              />
              }
            </div>
          </Grid.items>
        </Grid>                                                                                           
      </Container>
    </main>
  );
};

export default ShopPage;
