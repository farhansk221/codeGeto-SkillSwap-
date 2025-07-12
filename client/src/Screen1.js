import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import { Link } from 'react-router-dom'

function Screen1() {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-end sticky z-50 right-0 mx-3 my-3 '>
        <button className='mx-4 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded'>Availabilty</button>
            <input placeholder='' className='border-2 rounded-md border-black py-2 px-4'/>
            <button className='mx-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded'>Search</button>
            
      </div>
      <div>
        <Card/>
      </div>
    </div>
  )
}

export default Screen1
