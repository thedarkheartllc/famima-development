"use client";

import { SignUpForm } from "../components/SignUpForm";
import { AppHeader } from "../components/AppHeader";
import { Footer } from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isAdmin, isEmailVerified } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin && isEmailVerified) {
      router.push("/family");
    }
  }, [isAdmin, isEmailVerified, router]);

  return (
    <main className='bg-gradient-to-b from-white to-green-50/30 min-h-screen'>
      <AppHeader />

      <div className='flex flex-col items-center justify-center min-h-[80vh] px-6 py-12'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8 space-y-4'>
            <img
              src='/homepage/famima-7.jpg'
              alt='Family moments'
              className='w-24 h-24 rounded-full object-cover mx-auto shadow-lg'
            />
            <h1 className='text-4xl font-light text-gray-900'>Join Famima</h1>
            <p className='text-gray-600 font-light'>
              Create your family account to start sharing memories
            </p>
          </div>
          <div className='bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm'>
            <SignUpForm />
            <div className='mt-6 text-center'>
              <p className='text-gray-600 font-light'>
                Already have an account?{" "}
                <a
                  href='/login'
                  className='text-gray-900 hover:text-gray-700 font-light transition-colors'
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
