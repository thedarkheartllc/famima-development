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
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
      <h2 className='text-2xl font-bold text-black mb-6 text-center'>Login</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg bg-white text-black'
            required
          />
        </div>

        <div>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg bg-white text-black'
            required
          />
        </div>

        {error && (
          <div className='text-red-500 text-sm text-center'>{error}</div>
        )}

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-lg font-semibold transition-colors'
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
