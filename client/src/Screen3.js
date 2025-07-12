import React, { useState } from 'react';

function Screen3() {
    const [visibility, setVisibility] = useState('public');

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="bg-slate-800 text-white font-bold flex justify-between items-center px-10 py-5">
                <div className="ml-10">
                    <button className="mx-5">Swap Request</button>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    Home
                </button>
            </div>


            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
                <form className="space-y-4">

                    {[
                        { id: 'name', label: 'Name' },
                        { id: 'location', label: 'Location' },
                        { id: 'skillsOffered', label: 'Skills Offered' },
                        { id: 'skillsRequired', label: 'Skills Required' },
                        { id: 'availability', label: 'Availability' },
                    ].map(({ id, label }) => (
                        <div key={id} className="flex items-center gap-4">
                            <label htmlFor={id} className="w-40 text-right font-semibold">
                                {label}:
                            </label>
                            <input
                                id={id}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                className="flex-1 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ))}
                    <div className="flex items-center gap-4">
                        <label className="w-40 text-right font-semibold">Profile:</label>
                        <select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            className="flex-1 border-b-2 border-gray-500 text-black bg-transparent py-2 focus:outline-none focus:border-blue-600 font-semibold"
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-500 text-gray-700 hover:bg-gray-100 rounded"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
                        >
                            Save
                        </button>
                        <button>Om Shaikh</button>
                        <button>Om Shaikh</button>
                        
                        
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Screen3;
