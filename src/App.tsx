import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthContext } from './context/auth-context.tsx';
import ScrollToTop from './components/ScroolTop.tsx';
import LoadingScrren from './components/LoadingScrren.tsx';
import ListProdukPage from './page/ListProdukPage.tsx';
import axios from 'axios';
import OrderHistoryAdmin from './page/OrderHistoryAdmin.tsx';
import ProtectedRoute from './page/ProtectedRoutes.tsx';
const ForgetPasswordPage  = React.lazy(() => import( './page/ForgetPasswordPage.tsx'));
const JoinPage =  React.lazy(() => import('./page/JoinPage.tsx'));
const ReviewsPage = React.lazy(() => import( './page/ReviewsPage.tsx'));
const ResendEmailPage = React.lazy(() => import('./page/ResendEmailPage.tsx'));
const Dashboard = React.lazy(() => import('./components/Dashboard.tsx'));
const Layout = React.lazy(() => import('./components/Layout.tsx')) ;
const CheckoutPage = React.lazy(() => import('./page/CheckoutPage'));
const CartPage = React.lazy(() => import('./page/CartPage'));
const LoginPage = React.lazy(() => import('./page/LoginPage'));
const RegisterPage = React.lazy(() => import('./page/RegisterPage'));
const HomePage = React.lazy(() =>  import("./page/HomePage.tsx"))
const ShopPage = React.lazy(() => import('./page/ShopPage'));
const DetailsPage = React.lazy(() => import('./page/DetailsPage'))
const ProfilePage = React.lazy(() => import('./page/ProfilePage'))
const FavoritPage = React.lazy(() => import('./page/FavoritPage'))
const HistoryPage = React.lazy(() => import('./page/HistoryPage'))
const DashboardAdmin = React.lazy(() => import('./components/DasboardAdmin.tsx'));
const DashboardAdminPage = React.lazy(() => import('./page/DashboardAdmin.tsx'))
const ProdukPage = React.lazy(() => import('./page/ProdukPage'))
const UpdateProduk = React.lazy(() => import('./page/UpdateProduk.tsx'))
const DetailTransaksi = React.lazy(() => import('./page/DetailTransaksi.tsx'))


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>("");
  const [role, setRole] = React.useState<string | null>("");

  const login = React.useCallback((token: string) => {
    setIsLoggedIn(true);
    setToken(token);
    sessionStorage.setItem('token', JSON.stringify({ token }));
  }, []);

  const logout = React.useCallback(() => {
    setIsLoggedIn(false);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }, []);

  const setRoles = React.useCallback((role: string) => {
    setRole(role);
    sessionStorage.setItem('role', JSON.stringify({ role }));
  }, [])



  React.useEffect(() => {

    const getProfile = async (token: string) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
      } 


    const storedDataString = sessionStorage.getItem('token');
    const storedDataRole = sessionStorage.getItem('role');
    if (storedDataString !== null && storedDataRole !== null) {
      const storedData = JSON.parse(storedDataString);
      const storedRole = JSON.parse(storedDataRole);
      if (storedData && storedData.token !== null && storedRole && storedRole.role !== null) {
        setRole(storedRole.role);
        login(storedData.token); 
        getProfile(storedData.token);
      }
    }
  }, [login]);


  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, token, login, logout, status, setStatus, role, setRole: setRoles }}>
        <BrowserRouter>
          <ScrollToTop>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <React.Suspense fallback={<LoadingScrren/>}> 
                <Routes>

                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/shop' element={<ShopPage />} />
                    <Route path='/details/:id' element={<DetailsPage />} />
                    <Route element={<ProtectedRoute roles={["USER"]} />} >
                      <Route path='/checkout' element={<CheckoutPage />} />
                      <Route path='/cart' element={<CartPage />} />
                    </Route>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path="/reviews" element={<ReviewsPage/>} />
                  </Route>

                    <Route path='/' element={<DashboardAdmin />}>
                      <Route element={<ProtectedRoute roles={["ADMIN"]} />} >
                        <Route path='/admin/dashboard' element={<DashboardAdminPage />} />
                        <Route path='/admin/products' element={<ListProdukPage />} />
                        <Route path='/admin/add-product' element={<ProdukPage />} />
                        <Route path='/admin/update-product/:id' element={<UpdateProduk />} />
                        <Route path='/admin/order-list' element={<OrderHistoryAdmin />} />
                        <Route path='/admin/order-details/:orderId' element={<DetailTransaksi />} />
                        <Route path='/admin/details-transaksi' element={<DetailTransaksi/>} />
                      </Route>
                    </Route>
                           
                
                  <Route path='/' element={<Dashboard />}>
                    <Route element={<ProtectedRoute roles={["USER"]} />} >
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/favorit' element={<FavoritPage />} />
                        <Route path='/history' element={<HistoryPage />} />
                    </Route>
                  </Route>
                  <Route path="/forget-password" element={<ForgetPasswordPage />} />
                  <Route path="/active-account" element={<ResendEmailPage />} />
                  <Route path="/join" element={<JoinPage/>} />
                </Routes>
                  </React.Suspense>
              </PersistGate>
            </Provider>
          </ScrollToTop>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
