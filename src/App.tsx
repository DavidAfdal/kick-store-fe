import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollToTop from './components/ScroolTop.tsx';
import HomePage from './page/HomePage';
import Navbar from './components/Navbar';
import ShopPage from './page/ShopPage';
import DetailsPage from './page/DetailsPage';
import CheckoutPage from './page/CheckoutPage';
import CartPage from './page/CartPage';
import Footer from './components/Footer';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import { AuthContext } from './context/auth-context.tsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<number | null>(null);

  const login = React.useCallback((userId: number) => {
    setIsLoggedIn(true);
    setUserId(userId);
    sessionStorage.setItem('userData', JSON.stringify({ userId: userId }));
  }, []);

  const logout = React.useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    sessionStorage.removeItem('userData');
  }, []);

  React.useEffect(() => {
    const storedDataString = sessionStorage.getItem('userData');
    if (storedDataString !== null) {
      const storedData = JSON.parse(storedDataString);
      if (storedData && storedData.userId !== null) {
        login(parseInt(storedData.userId));
      }
    }
  }, [login]);
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
        <BrowserRouter>
          <ScrollToTop>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Navbar />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/shop' element={<ShopPage />} />
                  <Route path='/details/:id' element={<DetailsPage />} />
                  <Route path='/checkout' element={<CheckoutPage />} />
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                </Routes>
                <Footer />
              </PersistGate>
            </Provider>
          </ScrollToTop>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
