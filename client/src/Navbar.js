import React from 'react'

 function Navbar() {
  return (
    <div>
        <div className='bg-slate-800 font-bold text-white flex justify-between items-center px-3 py-5 '>
            <h2>
                Skill Swap Platform
            </h2>
            <button className='mx-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded'>
                Login
            </button>
        </div>
    </div>
  )
}

export default Navbar
