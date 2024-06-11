import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { HttpError } from "../models/errorModel";
import  { AxiosError } from 'axios';


const ForgetPasswordPage = () => {
    const [email, setEmail] = React.useState("")
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       try {
         await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgetPassword`, {email})
         toast.info("Please check your email for the next step!", {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        setEmail("");
       } catch (error ) {
        const err = error as AxiosError;
        const message = (err.response?.data as HttpError).message
        toast.error(message, {
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
    };
    return (
        <>
        
        <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="w-[400px] bg-white p-6 rounded-md">
                <form onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-4">Forgot Your Password</h1>
                <p className="text-sm mb-2">Please enter the email address you'd like your password reset information sent to</p>
                <label htmlFor="email" className="text-[12px] font-normal">Enter your email address</label>
                <Input type="text" placeholder="Email Address" name="email" className="mt-[4px]" onChange={(e) => setEmail(e.target.value) }/>
                <Button type="submit" className="w-full mt-6">Request reset link</Button>
                <div className="flex justify-center items-center mt-6">
                <Link to="/login" className="text-center">Back to login</Link>
                </div>
                </form>
            </div>
        </div>
        <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
        </>
        
    );
};

export default ForgetPasswordPage;