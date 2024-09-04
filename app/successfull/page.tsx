"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
const Successfull = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center pt-24 min-h-screen bg-gray-100 dark:bg-[#1F1F1F] px-4">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-[#2B2B2B] rounded-lg shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)] shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                <FaCheckCircle className="text-green-500 dark:text-green-400 text-6xl mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
                <button className="bg-[#d84e55] dark:bg-[#e27e84] text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#c0383f] dark:hover:bg-[#d2596b] transition-colors" onClick={()=>{
                    router.push("/")
                }}>
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}

export default Successfull;
