import Link from "next/link";


import React from 'react'

export default function notFound() {
    return (
        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://image.tmdb.org/t/p/original/xDkTbLqZPY3cJwopSYpUk9xaOBV.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h1 className="text-6xl font-extrabold mb-4">{`404 - Page Not Found`}</h1>
            <p className="text-xl mb-6">{`Oops! The page you're looking for doesn't exist.`}</p>
            <Link href="/" className="bg-red-600 px-6 py-3 text-lg font-semibold rounded-lg hover:bg-red-700 transition duration-300">
              Back to Home
            </Link>
          </div>
        </div>
      );
}

