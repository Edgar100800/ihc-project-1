"use client";

import LoginButton from "@/components/LoginLogoutButton";
import UserGreetText from "@/components/UserGreetText";
import Link from "next/link";
import Particles from "@/components/ui/particles";

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
      <Particles
        className="absolute inset-0"
        quantity={120}
        staticity={70}
        ease={50}
        color="#ffffff"
      />
      <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="absolute top-0 left-0 right-0 flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <UserGreetText />
          <LoginButton />
        </header>

        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Create AR Experiences with Art
          </h1>
          <p className="text-2xl text-white mb-8">
            Transform your artwork into immersive augmented reality experiences
          </p>
          <Link href="/explore">
            <button className="bg-white text-purple-600 font-bold py-4 px-10 rounded-full hover:bg-opacity-90 transition duration-300 text-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
