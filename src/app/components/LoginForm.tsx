"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function LoginForm() {
  const [email, setEmail] = useState("admin@famima.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
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
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
