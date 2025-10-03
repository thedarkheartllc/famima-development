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
  const { signUp } = useAuth();

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
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

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
