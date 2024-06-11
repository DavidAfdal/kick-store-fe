import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { HttpError } from "../models/errorModel";
import React from "react";

const JoinPage = () => {
    const [email, setEmail] = React.useState<string>("")

    const hanldeJoinMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const {
                data: { message },
              }  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/joinMember`, {email});
            console.log(message)
            toast.success(message, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
        } catch (error) {
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
    }

    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-[400px] bg-white p-6 rounded-md">
            <form onSubmit={hanldeJoinMember}>
            <h1 className="text-2xl mb-4">Join the club</h1>
            <p className="text-sm mb-2">Please enter the email address, special invitation  to join our exclusive Member Club.</p>
            <label htmlFor="email" className="text-[12px] font-normal">Enter your email address</label>
            <Input type="text" placeholder="Email Address" name="email" className="mt-[4px]" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Button type="submit" className="w-full mt-6">Join the club</Button>
            <div className="flex justify-center items-center mt-6">
            <Link to="/" className="text-center">Back to home page</Link>
            </div>
            </form>
            <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
        </div>
    </div>
    );
};

export default JoinPage;