"use client";

import { LoginForm } from "../components/LoginForm";
import { AppHeader } from "../components/AppHeader";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.push("/family");
    }
  }, [isAdmin, router]);

  return (
    <main className='bg-gradient-to-b from-white to-green-50/30   min-h-screen'>
      <AppHeader />

      <div className='flex flex-col items-center justify-center min-h-[80vh] px-6'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8 space-y-3'>
            <h1 className='text-4xl font-light text-gray-900 '>Welcome back</h1>
            <p className='text-gray-600  font-light'>
              Sign in to access your family photos
            </p>
          </div>
          <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm'>
            <LoginForm />
            <div className='mt-6 text-center'>
              <p className='text-gray-600 font-light'>
                Don&apos;t have an account?{" "}
                <a
                  href='/signup'
                  className='text-gray-900 hover:text-gray-700 font-light transition-colors'
                >
                  Create one here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
