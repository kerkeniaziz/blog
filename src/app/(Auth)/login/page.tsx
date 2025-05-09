"use client";
import { useDispatch } from "react-redux";
import {setIsLoggedIn, setRefreshToken, setToken} from "@/store/slices/authSlice";
import api from "@/utils/axios";
import Input from "@/validation/input";
import loginSchema, { LoginFormData } from "@/validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {setUser} from "@/store/slices/userSlice";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (data: LoginFormData) => {
        try {
            const res = await api.post("/login", data);
            const { accessToken, refreshToken, user } = res.data;

            // Store token in Redux state
            dispatch(setUser(user));
            dispatch(setToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
            dispatch(setIsLoggedIn(true));
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="bg-gray-900 flex flex-col justify-center sm:py-12 py-5 border-b-3">
            <div className="px-5 xs:p-0 mx-auto md:w-full md:max-w-md">
                {error && (
                    <div className="text-red-500 font-semibold mt-2 py-2 text-center">
                        {error}
                    </div>
                )}
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-600">
                    <form onSubmit={handleSubmit(handleLogin)} className="px-5 py-7">
                        <Input
                            label="Email"
                            type="email"
                            register={register("email")}
                            error={errors.email}
                        />
                        <Input
                            label="Password"
                            type="password"
                            register={register("password")}
                            error={errors.password}
                        />
                        <button
                            type="submit"
                            className="transition duration-200 mt-5 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            <span className="inline-block mr-2">Login</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-4 h-4 inline-block"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </form>

                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <Link href={"/forgot-password"}>
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        Forgot Password
                                    </button>
                                </Link>
                            </div>
                            <div className="text-center sm:text-right whitespace-nowrap">
                                <Link href={"/signup"}>
                                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
