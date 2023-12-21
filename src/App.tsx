import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthContext } from './context/auth-context.tsx';
import ScrollToTop from './components/ScroolTop.tsx';
import LoadingScrren from './components/LoadingScrren.tsx';
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


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);

  const login = React.useCallback((token: string) => {
    setIsLoggedIn(true);
    setToken(token);
    sessionStorage.setItem('token', JSON.stringify({ token }));
  }, []);

  const logout = React.useCallback(() => {
    setIsLoggedIn(false);
    setToken(null);
    sessionStorage.removeItem('token');
  }, []);

  React.useEffect(() => {
    const storedDataString = sessionStorage.getItem('token');
    if (storedDataString !== null) {
      const storedData = JSON.parse(storedDataString);
      if (storedData && storedData.token !== null) {
        login(storedData.token);
      }
    }
  }, [login]);


  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
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
                    <Route path='/checkout' element={<CheckoutPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                  </Route>
                  <Route path='/' element={<Dashboard />}>
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/favorit' element={<FavoritPage />} />
                    <Route path='/history' element={<HistoryPage />} />
                  </Route>
                 
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
