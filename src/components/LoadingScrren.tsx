import Lottie from "lottie-react";
import loading from "../assets/icons/loading.json"
import Logo2 from '../assets/Image/Logo2.png';

const LoadingScrren = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-[#4A69E2]">
        <div>
        <Lottie animationData={loading} autoPlay={true} loop={true} style={{width: "100%" , height: "500px"}}/>
        <div className="w-[80%] mx-auto hidden lg:block">
        <img src={Logo2} alt='logo' style={{ objectFit: 'cover', width: '100%', height: '170px', objectPosition: "center"}} />
        </div>
        </div>
    </div>
    );
};

export default LoadingScrren;