'use client'
import Link from "next/link";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { instance } from "./lib/axios";



export default function Home() {
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {

    try{
      const result = await login(formData);

      if (result?.status === 200) {
        setError(null);
        router.push('/main/dashboard');
      } 
    }catch(error: any){
      const message = error.response?.data.error;
      setError(message);
    }

  }
 
  const login = async (formData: FormData) => {
    
    const user = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    try {
      const res = await instance.post('auth/login',user);
      return res;

    } catch (error) {

      throw error;
    }
  }


  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form className="space-y-6" action={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Email address</label>
            <div className="mt-2">
              <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
          {error && <p>{error}</p>}
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500"> Create an account</Link>
        </p>
      </div>
    </div>
  );
}
