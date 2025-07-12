import React, { useState } from 'react'

function Screen3() {
    const [visibility, setVisibility] = useState('public')
    return (
        <div>
            <div className='bg-slate-800 font-bold text-white flex justify-between items-center px-3 py-5 '>
                <div className='ml-40'>
                    <button className='mx-5'>Swap Request</button>
                </div>
                <button className='mx-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded'>
                    Home
                </button>
            </div>
            <div className=''>
                <label htmlFor='name' className=''>Name</label>
                <input placeholder='' /><br></br>

                <label htmlFor='location'>Location</label>
                <input placeholder='' /><br></br>

                <label htmlFor='Skills'>Skills Offered</label>
                <input placeholder='' />

                <label htmlFor='skills-want'>Skills Required</label>
                <input placeholder='' /><br></br>

                <label htmlFor='Available'>Availabilty</label>
                <input placeholder='' /><br></br>

                <div className="flex items-center gap-6 p-4 max-w-sm mx-auto">
                    <label className="text-lg font-semibold text-gray-800">Profile</label>

                    <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-600 bg-transparent text-lg font-semibold"
                    >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>

            </div>
        </div>
    )
}

export default Screen3