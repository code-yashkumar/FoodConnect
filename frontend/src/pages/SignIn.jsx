import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const SignIn = () => {
    const primaryColor = "#4CAF50"; // Example primary color
    const hoverColor = "#45A049"; // Example hover color    
    const bgColor = "#d8edda"; // Example background color
    const borderColor = "#ccc"; // Example border color
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async() => {
        try {
            const result= await axios.post(`${serverUrl}/api/auth/signin`,{ 
                email,password
            },{withCredentials:true})
            console.log(result);
        } 
        catch (error) {
            console.error("Signup error:",
                error.response?.data?.message || error.message);
        }
    };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{backgroundColor:bgColor}}>
        <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{borderColor:borderColor}}>
            <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                FoodConnect
            </h1>
            <p className="text-gray-600 mb-8"> 
                Sign In to your account.
            </p>

            {/* email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                    style={{border:`1px solid ${borderColor}`}}
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                />
            </div>

            {/* password */}
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={`${showPassword ? "text" : "password"}`}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                        style={{border:`1px solid ${borderColor}`}}
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                    />
                    <button className="absolute right-3 top-[13px] cursor-pointer text-gray-500" onClick={()=>setShowPassword(prev=>!prev)}>{showPassword?<FaRegEye />:<FaRegEyeSlash />}</button>
                </div>
            </div>

            {/* forgot password feature button */}
            <div 
            className="text-right mb-2 hover:underline cursor-pointer" 
            style={{ color: primaryColor }}
            onClick={()=>navigate("/forgot-password")}
            >
                Forgot Password?
            </div>

            <button
                type="submit"
                onClick={handleSignIn}
                className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white shadow-sm transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                    backgroundColor: primaryColor,
                    border: `1px solid ${primaryColor}`,
                    '--tw-ring-color': primaryColor,
                }}
                onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = hoverColor;
                }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = primaryColor;
                }}
            >
                Sign In
            </button>

            <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-gray-600 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                    backgroundColor: "white",
                    border: `1px solid #4285F4`,
                    '--tw-ring-color': "#4285F4",
                }}
                onMouseEnter={(event) => {
                    event.currentTarget.style.backgroundColor = "#f1f1f1";
                }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.backgroundColor = "white";
                }}
            >
                <FcGoogle size={25} />
                <span>Continue with Google</span>
            </button>
            <p className="text-gray-600 text-center cursor-pointer mt-2" onClick={()=>navigate("/signin")}>
                Want to create an account? <a href="/signup" className="font-semibold" style={{ color: primaryColor }}>Sign In</a>
            </p>
        </div>
    </div>
  )
}

                    
 

export default SignIn