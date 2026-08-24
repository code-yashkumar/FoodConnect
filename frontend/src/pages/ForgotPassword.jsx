import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

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
                            }}>
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
                            }}>
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
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your new password"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                                style={{ border: `1px solid ${borderColor}` }}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        {/* confirm password */}
                        <div className="mb-4 mt-4">
                            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                placeholder="Re-enter your new password"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                                style={{ border: `1px solid ${borderColor}` }}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
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
                            }}>
                            Reset Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
