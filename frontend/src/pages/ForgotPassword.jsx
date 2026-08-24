import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const ForgotPassword = () => {
    const primaryColor = "#4CAF50"; // Example primary color
    const hoverColor = "#45A049"; // Example hover color
    const bgColor = "#d8edda"; // Example background color
    const borderColor = "#ccc"; // Example border color

    const [step, setstep] = useState(1);

    return (
        <div className="flex w-full items-center justify-center min-h-screen p-4" style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ borderColor: borderColor }}>
                <div className="flex item-center gap-4 ">
                    <IoArrowBack size={30} style={{ color: primaryColor }} />
                    <h1 className="text-xl font-bold text-center" style={{ color: primaryColor }}>
                        Forgot Password
                    </h1>
                </div>

                {step === 1 && (
                    //email input
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
                            style={{ border: `1px solid ${borderColor}` }}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
