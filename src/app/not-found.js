"use client";

import Link from 'next/link';
import Image from 'next/image';
import "@/app/globals.css"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="text-center mb-6">
        <Image
          src="/image/notfound.jpg"
          alt="Error"
          width={500}
          height={300}
          className="rounded-lg shadow-xl transform hover:scale-110 transition duration-300 ease-in-out"
        />
      </div>
      <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeInUp">
        Oops! Page Not Found
      </h1>
      <p className="text-lg mb-8 text-opacity-80">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:from-pink-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
}
