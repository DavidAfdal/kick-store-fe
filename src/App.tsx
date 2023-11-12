import { Routes, Route } from 'react-router-dom';

import HomePage from './page/HomePage';
import Navbar from './components/Navbar';
import ShopPage from './page/ShopPage';
import DetailsPage from './page/DetailsPage';
import CheckoutPage from './page/CheckoutPage';
import CartPage from './page/CartPage';
import Footer from './components/Footer';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
