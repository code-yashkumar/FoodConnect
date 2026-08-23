import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const SignUp = () => {
    const primaryColor = "#4CAF50"; // Example primary color
    const hoverColor = "#45A049"; // Example hover color    
    const bgColor = "#d8edda"; // Example background color
    const borderColor = "#ccc"; // Example border color
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("User")
    const navigate=useNavigate()
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async() => {
        try {
            const result= await axios.post(`${serverUrl}/api/auth/signup`,{ 
                fullname,email,mobile,password,role
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
                Create your account to get started with delicious food and seamless ordering experience.
            </p>

            {/* fullname */}
            <div className="mb-4">
                <label htmlFor="fullname" className="block text-gray-700 font-semibold mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                    style={{border:`1px solid ${borderColor}`}}
                    onChange={(e)=>setFullname(e.target.value)}
                    value={fullname}
                />
            </div>

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

            {/* mobile number */}
            <div className="mb-4">
                <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2">
                    Mobile Number
                </label>
                <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                    style={{border:`1px solid ${borderColor}`}}
                    onChange={(e)=>setMobile(e.target.value)}
                    value={mobile}
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


            {/* role */}
            <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
                    Role
                </label>
                <div className="flex gap-2"> 
                    {["User","Owner","Delivery Boy"].map((r) => (
                        <button 
                        className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                        onClick={()=>setRole(r)}
                        style={
                            role==r?{
                                backgroundColor:primaryColor,
                                color:"white",
                                border:`1px solid ${primaryColor}`
                            }:{
                                backgroundColor: "white",
                                color: `${primaryColor}`,
                                border:`1px solid ${primaryColor}`
                            }
                        }
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                onClick={handleSignUp}
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
                SignUp
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
                Already have an account? <a href="/signin" className="font-semibold" style={{ color: primaryColor }}>Sign In</a>
            </p>
        </div>
    </div>
  )
}

                    
 

export default SignUp