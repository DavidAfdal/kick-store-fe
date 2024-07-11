import React from 'react';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';
import { Product, ProductDetails, ShoeModel } from '../models/shoesModel';
import { useDispatch } from 'react-redux';
import { addItems } from '../redux/reducer/cartSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/auth-context';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import ShoesData from '../data/ShoesData';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import SwiperItems from '../components/SwiperItems';
import { addItem, removeItem, toggleLike } from '../redux/reducer/likeSlice';
import { ConvertRupiah } from '../utils/formater';
import Google from "../assets/icons/google.png"
import { useGoogleLogin } from '@react-oauth/google';
import Skeleton from '../components/Skeleton';
import { checkNewProduct } from '../utils/chekc';
import { CartInput } from '../models/cartModels';

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoggedIn, login, token, role, setRole } = React.useContext(AuthContext) as AuthContextType;
  const {isLoading, error} = useSelector((state: RootState) => state.cartReducer)
  const [size, setSize] = React.useState(0);
  const [authModal, setAuthModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [productDetails, setProductDetails] = React.useState<ProductDetails | null>(null);
  const [recomandedProduct, setRecomandedProduct] = React.useState<Product[] | null>(null);
  const [loginState, setLoginState] = React.useState({
    email: "",
    password: "",
  })

  const detailsData: ShoeModel | undefined = ShoesData.find((data) => data.id.toString() === id);

  const selectIsLikedById = (itemId: number | undefined) => (state: RootState) => {
    const item = state.likeReducer.like.find((item) => item.id === itemId);
    return item ? item.like : false;
  };

  const likeItem = useSelector(selectIsLikedById(detailsData?.id));

  const priceAfterDiscount = (diskon: number, price: number) => {
    return price - price * (diskon / 100);
  };



  const handleClickAddToCart = () => {
    if (isLoggedIn && token) {

      if(role === "ADMIN") {
        toast.warning("Admin can't access this section",  {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        return;
      }

        const data: CartInput = {
          shoeId: parseInt(id as string),
          cart_size: size === 0 ? productDetails?.sizes[0].size.toString() as string : size.toString(),
          price: productDetails?.diskon ? priceAfterDiscount(productDetails.diskon, productDetails.price) : productDetails?.price as number
        };
        
        dispatch(addItems({data: data ,token: token }));
        if(isLoading === "succeeded") {
          toast.success('Succes Add To Cart', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
        } else if (isLoading === "rejected" && error) {
          toast.error('Something Wrong please restart', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      
      

      
    } else {
      setAuthModal(true);
    }
  };

  const handleLike = () => {
    if (isLoggedIn) {
      console.log(role)
      if(role === "ADMIN") {
        toast.warning("Admin can't access this section",  {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        return;
      }
      if (likeItem) {
        dispatch(toggleLike(productDetails?.id));
        dispatch(removeItem(productDetails?.id));
        toast.info('Success remove favorit item', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        if (productDetails) {
          dispatch(toggleLike(productDetails?.id));
          dispatch(
            addItem({
              id: productDetails.id,
              name: productDetails.name,
              thumbImg: productDetails.images[0].url,
              price: productDetails.price,
              createdAt: productDetails.createdAt,
              diskon: productDetails.diskon,
              like: true,
            })
          );
        }
        toast.info('Success add favorit item', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      setAuthModal(true);
    }
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      if(role === "ADMIN") {
        toast.warning("Admin can't access this section",  {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        return;
      }
      if (productDetails) {
        const data: CartInput = {
          shoeId: parseInt(id as string),
          cart_size: size === 0 ? productDetails?.sizes[0].size.toString() as string : size.toString(),
          price: productDetails?.diskon ? priceAfterDiscount(productDetails.diskon, productDetails.price) : productDetails?.price as number
        };

        dispatch(addItems({data, token: token as string})).unwrap();
        if(isLoading === "succeeded") {
          navigate('/cart');
        }
      }
    } else {
      setAuthModal(true);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, loginState)
      login(response.data.data.token);
      setRole(response.data.data.role);
      setLoginState({
        email: "",
        password: "",
      })

      setTimeout(() => {
        setAuthModal(false)
      }, 2000)
      
    } catch (error) {
      console.log(error)
      toast.warning(error as string,  {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } 
    
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
      setLoginState({...loginState, [name]: value})
  }

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (result) => {
      console.log(result)
      const respon = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/loginGoogle`, {code: result.code})
      login(respon.data.data.token);
      setRole(respon.data.data.role);
      console.log(respon.data.data)
      setAuthModal(false)
    }
  });

  React.useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const [productDetails, recommandProduct] = await Promise.all([axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shoe/${id}`), axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shoe/recomand?id=${id}`)]);
        setProductDetails(productDetails.data.data);
        setRecomandedProduct(recommandProduct.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };

    
      const timer = setTimeout(() => {
        getData();
      }, 5000)
     
      return () => {
        clearTimeout(timer)
      }
    
  }, [id]);



  return (
    <main>
      <Container className='mt-8'>
        <Grid columnsAmount={1} className='lg:grid-cols-3'>
          {/* img-details-section */}
          <Grid.items className='col-span-2'>
            <Grid columnsAmount={2}>
              <Grid.items>
                <div className='w-full aspect-square'>
              {
                  loading ?
                
                
                  <div className='w-full bg-gray-400 h-full rounded-tl-[50px] animate-pulse'></div>: 
                  <img src={productDetails?.images[0].url} alt='' className='object-cover object-center w-full h-full rounded-tl-[50px]' /> 
                }
                </div>

              </Grid.items>
              <Grid.items>
                <div className='w-full aspect-square'>
              {
                  loading ?
                  <div className='w-full bg-gray-400 h-full rounded-tr-[50px] animate-pulse'></div>: 
                  <img src={productDetails?.images[1].url} alt='' className='object-cover object-center w-full h-full rounded-tr-[50px]' /> 
                }
                </div>
              </Grid.items>
              <Grid.items>
                <div className='w-full aspect-square'>
              {
                  loading ?
                  <div className='w-full bg-gray-400 h-full rounded-bl-[50px] animate-pulse'/>: 
                  <img src={productDetails?.images[2].url} alt='' className='object-cover object-center w-full h-full rounded-bl-[50px]' /> 
                }
                </div>
              </Grid.items>
              <Grid.items>
                <div className='w-full aspect-square'>
              {
                loading ?
                  <div className='w-full bg-gray-400 h-full rounded-br-[50px] animate-pulse'></div> : 
                  <img src={productDetails?.images[3].url} alt='' className='object-cover object-center w-full h-full rounded-br-[50px]' /> 
                }
                </div>
              </Grid.items>
           
            </Grid>
          </Grid.items>

          {/* details-product-section */}
          <Grid.items>
            <div className='flex flex-col gap-4'>
              {loading ? 
              <>
              <Skeleton className='w-[100px] p-4 h-[40px]'/> 
              <Skeleton className='w-[90%] h-[40px]'/> 
              <Skeleton className='w-[80%] h-[40px]'/> 
              <Skeleton className='w-[100px] h-[40px]'/> 
              <Grid columnsAmount={7} className='sm:grid-cols-8'>
              {Array.from({length: 5}).map((_,i) => (
                  <Grid.items key={i} className='aspect-square'>
                    <Skeleton className='w-full h-full rounded-md' /> 
                  </Grid.items>
              )) }
              </Grid>

              <div className='flex gap-2'>
                <Skeleton className='w-[90%] grow-[2] h-[40px]'/>
                <Skeleton className='w-[10%] grow-[1] h-[40px]'/>
              </div>
                <Skeleton className='w-full h-[40px]'/>
                <Skeleton className='w-[200px] h-[40px]'/> 
                <div className='flex flex-col gap-2'>
                <Skeleton className='w-full h-[30px]'/>
                <Skeleton className='w-full h-[30px]'/>
                <Skeleton className='w-[20%] h-[30px]'/>
                </div>

              </>
              : 
              <>
              {productDetails?.diskon as number  > 0? <div className='bg-[#FFA52F]  p-4 rounded-lg font-semibold text-xl w-[120px]'>{productDetails?.diskon}% Off</div> :  checkNewProduct(productDetails?.createdAt as Date)? <div className='bg-[#4A69E2] p-4 rounded-lg font-normal text-xl w-[170px] text-white'>New Releasse</div> : null}
              <h1 className='text-3xl font-semibold'>{productDetails?.name}</h1>
              <p className='capitalize font-semibold text-gray-500'>{productDetails?.type.toUpperCase() ==="MALE" ? "Men's" : "Women's"} {productDetails?.category.toLowerCase()} shoes</p>
              <div className='flex gap-4 flex-col md:flex-row'>
                <p className={`text-2xl text-[#4A69E2] font-semibold ${productDetails?.diskon as number > 0  ? 'line-through' : ''}`}>{ConvertRupiah(productDetails?.price)}</p>
                {productDetails?.diskon as number > 0 ? <p className='text-2xl text-[#4A69E2] font-semibold'> {ConvertRupiah(priceAfterDiscount(productDetails?.diskon || 10, productDetails?.price || 100000))}</p> : null}
              </div>

              {/* colorshoes-selection */}
              {/* <h1 className='font-semibold'>COLOR</h1> */}
              {/* sizeshoes-selection */}
              <h1 className='font-semibold'>SIZE</h1>
              <Grid columnsAmount={5} className='sm:grid-cols-8'>
                {productDetails?.sizes.map((data, i) => 
                { const dataSize = size === 0 ? productDetails.sizes[0].size : size;
                  return(
                  <Grid.items key={i}>
                    <Button className={`bg-white ${dataSize  === data.size ? 'bg-[#232321] text-white' : 'text-[#232321]'} py-3 disabled:bg-[#878787] disabled:text-[#b6b4b4]`} disabled={data.stock === 0} onClick={() => setSize(data.size)}>
                      {data.size}
                    </Button>
                  </Grid.items>
                )}
                )}
              </Grid>

              {/*button-details-section*/}
              <div className='flex gap-2'>
                <Button className='w-full bg-[#232321] grow-[2] flex items-center justify-center' onClick={handleClickAddToCart} type='button' disabled={isLoading === "loading"}>
                {isLoading === "loading" ? <>
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mr-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg> Progress...
                </>: "Add To Cart"}
                  
                </Button>
                <Button className='bg-[#232321]' onClick={handleLike}>
                  <AiFillHeart className={`${likeItem ? 'text-red-500' : ''} hover:text-red-500 transition-colors`} />
                </Button>
              </div>
              <Button className='w-full' onClick={() => handleBuyNow()} type="button" disabled={isLoading === "loading"}>
                Buy It Now
              </Button>

              {/* Deskripsi-product-section */}
              <p className='font-semibold'>ABOUT THE PRODUCT</p>
              <p className='text-justify'>{productDetails?.description}</p>

              </>
              }
            </div>
          </Grid.items>
        </Grid>
      </Container>

      {/* Rekomendation-section */}
      <Container>
        <div className='mb-6 flex justify-between'>
          <h1 className='text-3xl font-semibold sm:divide-x-0'>You May Also Like</h1>
          <div className='flex gap-2'>
            <button className='swiper-button-prev text-lg px-4 bg-[#232321] text-white rounded-md disabled:bg-[#70706E]'> &lt;</button>
            <button className='swiper-button-next text-lg px-4 bg-[#232321] text-white rounded-md disabled:bg-[#70706E]'>&gt;</button>
          </div>
        </div>


        <SwiperItems data={recomandedProduct} loading={loading} />
      </Container>

      <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />

      <Modal open={authModal} onClose={() => setAuthModal(false)}>
        <div className='w-[280px] lg:w-[450px] md:p-4'>
          <h1 className='font-semibold mb-4 text-center text-2xl'>Sign In</h1>
          <form className='flex flex-col gap-4' onSubmit={handleLogin}>
            <Input type='email' placeholder='youremail@gmail.com' className='bg-white' value={loginState.email} name='email' onChange={handleInputChange}/>
            <div>
              <Input type='password' placeholder='password' className='bg-white mb-2' value={loginState.password} name='password' onChange={handleInputChange}/>
              <Link to='/forget-password'>Forgot Password?</Link>
            </div>
            <Button type='submit'>Sign In</Button>
            
            <Button className='justify-between flex items-center bg-white border-black border text-[#232323] mt-2' onClick={() => loginWithGoogle()} type='button'>
                Sign In With Google <span className='w-8 h-8'><img src={Google} className='w-full h-full object-cover object-center'/></span>
              </Button>

            <p className='text-center'>
              Don't have an account ?{' '}
              <Link to='/register' className='text-[#4A69E2]'>
                Create one
              </Link>
            </p>
          </form>
        </div>
      </Modal>

     
    </main>
  );
};

export default DetailsPage;
