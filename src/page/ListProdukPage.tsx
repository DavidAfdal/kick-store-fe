import axios, { AxiosResponse } from 'axios';
import React from 'react'
import PaginationEntity from '../models/paginationEntity';
import Grid from '../components/Grid';
import Lottie from 'lottie-react';
import Card from '../components/Card';
import ReactPaginate from 'react-paginate';
import SkeletonCard from '../components/SkeletonCard';
import NotFound from "../assets/icons/noFound.json"
import { ConvertRupiah } from '../utils/formater';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ListProdukPage = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState<PaginationEntity>(
        {
          totalItems: 0,
          totalPages: 0,
          currentPage:1,
          data: []
        }
      );
      const [reload, setReload] = React.useState<boolean>(false);
      const [loading, setLoading] = React.useState<boolean>(true);
      const [page, setPage] = React.useState<number>(1);

      const handleChangePage = (selecteditem: { selected: number }) => {
        setPage(selecteditem.selected + 1);
      };


      const handleDeleteData = async(id:number) => {
        try {
          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/shoe/${id}`);
          toast.success('Product deleted successfully!'), {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          };
          setReload(true)
        } catch (error) {
          console.log(error);
        }
      }

    
    
    
    React.useEffect(() => {
        setLoading(true);
        const pagination = async () => {
          try {
            const respon: AxiosResponse<PaginationEntity> = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shoe?page=${page}&sort=createdAt&order=desc`);
            setData(respon.data);
            setReload(false);
            console.log(respon.data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        const timer = setTimeout(() => {
          pagination();
        }, 2000)
       
        return () => {
          clearTimeout(timer)
        }
    
      }, [page, reload]);
  return (
    <section className="p-4 my-[50px]">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-[#232323]">List Products</h1>
            <Link to="/admin/add-product" className="px-7 py-2 bg-[#4C3BCF] rounded-lg text-white">Add Products</Link>
        </div>
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
                        <div className="flex gap-x-2 text-[#232323] text-lg mb-2 font-semibold">
                        {data.diskon ? 
                        (
                          <>
                          
                          <del>{ConvertRupiah(data.price)}</del>
                          <span>-</span>
                          <p>{ConvertRupiah(data.price - (data.price*data.diskon/100))}</p>
                          </>
                        )
                         : (
                          <p>{ConvertRupiah(data.price)}</p>
                         )}
                        </div>
                        <Card.Button onClick={() => navigate(`/admin/update-product/${data.id}`)}>
                          {' '}
                          Edit Product
                        </Card.Button>
                        <button onClick={() => handleDeleteData(data.id)} className='text-xs bg-red-500 text-white flex p-2 justify-center rounded-md items-center w-full md:text-base mt-2'>
                          Delete Product
                        </button>
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
               <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
            </div>
    </section>
  )
}

export default ListProdukPage