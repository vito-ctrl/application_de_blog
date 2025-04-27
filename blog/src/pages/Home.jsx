import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import React from 'react'

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
          Publish your passions, your way
        </h1>
        
        <h5 className="text-xl md:text-2xl text-gray-300 mb-12">
          Create a unique and beautiful blog easily.
        </h5>
        <Link to={'/login'}>
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105">
            CREATE YOUR BLOG
            </button>
        </Link>
      </div>
      
      <div className="mt-20 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-3">Express Yourself</h3>
            <p className="text-gray-300">
              Share your thoughts, showcase your work, and connect with your audience through a professionally designed blog.
            </p>
          </div>
          
          <div className="bg-gray-900 -100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-white mb-3">Easy to Use</h3>
            <p className="text-gray-300">
              Our intuitive interface makes it simple to create posts, add images, and customize your blog's appearance.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}