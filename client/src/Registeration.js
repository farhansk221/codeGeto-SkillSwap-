import React from 'react'

function Registeration() {
 return (
    <div className="min-h-screen bg-gray-100">
     <div className='bg-slate-800 font-bold text-white flex justify-between items-center px-3 py-5 '>
            <h2>
                Skill Swap Platform
            </h2>
            <button className='mx-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded'>
                Home
            </button>
        </div>
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              placeholder="Type Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Type Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default  Registeration
