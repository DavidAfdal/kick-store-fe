
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId='192573977992-jlhe722hi206jkaqluais2qrng1lk461.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
);
