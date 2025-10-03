"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function SignUpForm() {
  const [email, setEmail] = useState("family@test.com");
  const [password, setPassword] = useState("pass12345");
  const [retypePassword, setRetypePassword] = useState("pass12345");
  const [familyName, setFamilyName] = useState("The Family");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { signUp, resendVerification } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== retypePassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, familyName);
      setShowVerificationMessage(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      await resendVerification();
      setError("");
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to resend verification email"
      );
    } finally {
      setResendLoading(false);
    }
  };

  if (showVerificationMessage) {
    return (
      <div className='space-y-6'>
        <div className='text-center space-y-4'>
          <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
            <svg
              className='w-8 h-8 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-light text-gray-900'>
            Check your email
          </h2>
          <p className='text-gray-600 font-light'>
            We&apos;ve sent a verification link to <strong>{email}</strong>
          </p>
          <p className='text-sm text-gray-500'>
            Please check your email and click the verification link to activate
            your account.
          </p>
        </div>

        {error && (
          <div className='text-sm font-light text-red-600 text-center bg-red-50 py-2 px-4 rounded-2xl'>
            {error}
          </div>
        )}

        <div className='space-y-3'>
          <button
            type='button'
            onClick={handleResendVerification}
            disabled={resendLoading}
            className='w-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-700 py-3 px-6 rounded-full font-light transition-all'
          >
            {resendLoading ? "Sending..." : "Resend verification email"}
          </button>

          <button
            type='button'
            onClick={() => setShowVerificationMessage(false)}
            className='w-full text-gray-500 hover:text-gray-700 py-2 px-6 rounded-full font-light transition-all'
          >
            Back to sign up
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='familyName'
            className='block text-sm font-light text-gray-600 mb-2'
          >
            Family Name
          </label>
          <input
            id='familyName'
            type='text'
            placeholder='The Smith Family'
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            required
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-light text-gray-600 mb-2'
          >
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            required
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-light text-gray-600 mb-2'
          >
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            required
          />
        </div>

        <div>
          <label
            htmlFor='retypePassword'
            className='block text-sm font-light text-gray-600 mb-2'
          >
            Retype Password
          </label>
          <input
            id='retypePassword'
            type='password'
            placeholder='••••••••'
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-100 rounded-2xl bg-white text-gray-900 font-light placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all'
            required
          />
        </div>
      </div>

      {error && (
        <div className='text-sm font-light text-red-600 text-center bg-red-50 py-2 px-4 rounded-2xl'>
          {error}
        </div>
      )}

      <button
        type='submit'
        disabled={loading}
        className='w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-full font-light transition-all hover:scale-[1.02] shadow-lg'
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
