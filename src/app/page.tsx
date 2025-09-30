"use client";

import Link from "next/link";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FamilyTree } from "./components/FamilyTree";
import { LoginForm } from "./components/LoginForm";
import { HomePageHeader } from "./components/HomePageHeader";
import { useAuth } from "./contexts/AuthContext";

function HomeContent() {
  const { isAdmin } = useAuth();

  return (
    <main className='bg-black dark:bg-white min-h-screen flex flex-col items-center '>
      <HomePageHeader />

      {isAdmin ? (
        <FamilyTree />
      ) : (
        <div className='flex flex-col items-center justify-center min-h-[40vh]'>
          <LoginForm />
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
