import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-light transition-all rounded-full inline-flex items-center justify-center gap-2";

  const variantClasses = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:scale-[1.02]",
    secondary:
      "border border-gray-100 text-gray-700 hover:text-gray-900 hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className='animate-spin'>⏳</span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
