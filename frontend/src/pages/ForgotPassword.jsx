import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const ForgotPassword = () => {
    const primaryColor = "#4CAF50"; // Example primary color
    const hoverColor = "#45A049"; // Example hover color
    const bgColor = "#d8edda"; // Example background color
    const borderColor = "#ccc"; // Example border color

    const [step, setstep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true });
            console.log(result);
            setstep(2);
        } catch (error) {
            console.error("Error during OTP send:", error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true });
            console.log(result);
            setstep(3);
        } catch (error) {
            console.error("Error during OTP verification:", error);
        }
    };

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword: password }, { withCredentials: true });
            console.log(result);

            alert("Password reset successfully");
            navigate("/signin");
        } catch (error) {
            console.error("Error during password reset:", error);
        }
    };

    return (
        <div className="flex w-full items-center justify-center min-h-screen p-4" style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ borderColor: borderColor }}>
                <div className="flex item-center gap-4 ">
                    <IoArrowBack className="cursor-pointer" size={30} style={{ color: primaryColor }} onClick={() => navigate("/signin")} />
                    <h1 className="text-xl font-bold text-center" style={{ color: primaryColor }}>
                        Forgot Password
                    </h1>
                </div>

                {/* step 1 enter email */}
                {step === 1 && (
                    <div>
                        <div className="mb-4 mt-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                                style={{ border: `1px solid ${borderColor}` }}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white shadow-sm transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                                backgroundColor: primaryColor,
                                border: `1px solid ${primaryColor}`,
                                "--tw-ring-color": primaryColor,
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.backgroundColor = hoverColor;
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.backgroundColor = primaryColor;
                            }}
                            onClick={handleSendOtp}>
                            Send OTP
                        </button>
                    </div>
                )}

                {/* step 2 verify otp */}
                {step === 2 && (
                    <div>
                        <div className="mb-4 mt-4">
                            <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">
                                OTP
                            </label>
                            <input
                                type="otp"
                                id="otp"
                                name="otp"
                                placeholder="Enter OTP"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                                style={{ border: `1px solid ${borderColor}` }}
                                onChange={(e) => setOtp(e.target.value)}
                                value={otp}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white shadow-sm transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                                backgroundColor: primaryColor,
                                border: `1px solid ${primaryColor}`,
                                "--tw-ring-color": primaryColor,
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.backgroundColor = hoverColor;
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.backgroundColor = primaryColor;
                            }}
                            onClick={handleVerifyOtp}>
                            Verify
                        </button>
                    </div>
                )}
                {/* Step 3: Reset Password */}
                {step === 3 && (
                    //input new password and confirm password and a button to submit
                    <div>
                        {/* new password */}
                        <div className="mb-4 mt-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your new password"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                                    style={{ border: `1px solid ${borderColor}` }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide new password" : "Show new password"}
                                    className="absolute right-3 top-[13px] cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* confirm password */}
                        <div className="mb-4 mt-4">
                            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    name="confirmPassword"
                                    placeholder="Re-enter your new password"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                                    style={{ border: `1px solid ${borderColor}` }}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                />
                                <button
                                    type="button"
                                    aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                                    className="absolute right-3 top-[13px] cursor-pointer text-gray-500"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* submit button */}
                        <button
                            type="submit"
                            className="w-full mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white shadow-sm transition duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                                backgroundColor: primaryColor,
                                border: `1px solid ${primaryColor}`,
                                "--tw-ring-color": primaryColor,
                            }}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.backgroundColor = hoverColor;
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.backgroundColor = primaryColor;
                            }}
                            onClick={handleResetPassword}>
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
