"use client";
import forgotSchema, { ForgotFormData } from "@/validation/forgotSchema";
import Input from "@/validation/input";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";



export default function Page() {
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ForgotFormData>({
      resolver: zodResolver(forgotSchema),
    });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
 
  
  const handleForgot = async (data: ForgotFormData) => {
    const email = data.email;

    try {
      const res = await axios.post("http://localhost:8000/auth/forgot", { email });

    } catch (err) {
      console.error(err); // error
      setError("Invalid email");
    }
  }; 
  return (
<div className=" bg-gray-900 flex flex-col justify-center sm:py-12 py-5 border-b-3">
  <div className="px-5 xs:p-0 mx-auto md:w-full md:max-w-md">
  {error && (
  <div className="text-red-500 font-semibold mt-2 py-2 text-center">{error}</div>
)}
    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-600">
    <form onSubmit={handleSubmit(handleForgot)} className="px-5 py-7">
      
        <Input
                  label="Email"
                  type="email"
                  register={register("email")}
                  error={errors.email}
                />

         <button type="submit" className="transition mt-7 duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Send Email</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </button>
        </form>
      

    </div>

  </div>
</div>
  );
}
