"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";



export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
 
  const handleLogin = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await axios.post("http://localhost:8000/auth/login", { email, password });
      const { accessToken, refrechToken, userId } = res.data;

      document.cookie = `accessToken=${accessToken}; path=/; secure; HttpOnly; SameSite=Strict`;
      document.cookie = `refreshToken=${refrechToken}; path=/; secure; HttpOnly; SameSite=Strict`;
      document.cookie = `refreshToken=${userId}; path=/; secure; HttpOnly; SameSite=Strict`;
      
      router.push("/dashboard"); 
    } catch (err) {
      console.error(err); // error
      setError("Invalid email or password. Please try again.");
    }
  }; 
  return (
<div className=" bg-gray-900 flex flex-col justify-center sm:py-12 py-5 border-b-3">
  <div className="px-5 xs:p-0 mx-auto md:w-full md:max-w-md">
  {error && (
  <div className="text-red-500 font-semibold mt-2 py-2 text-center">{error}</div>
)}
    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-600">
      <div className="px-5 py-7">
        <label  className="font-semibold text-sm text-gray-900 pb-1 block">E-mail</label>
        <input ref={emailRef} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-900" />
        <label className="font-semibold text-sm text-gray-900 pb-1 block">Password</label>
        <input ref={passwordRef} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-gray-900" />
        <button onClick={handleLogin} type="button" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
            <span className="inline-block mr-2">Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </button>
      </div>
      <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <Link href={"/forgotpassword"}>
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="inline-block ml-1">Forgot Password</span>
            </button>
            </Link>
          </div>
          <div className="text-center sm:text-right  whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="inline-block ml-1">Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
  );
}
