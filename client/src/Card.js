import React from 'react';
import { useState } from 'react';

const users = [
  {
    id: 1,
    pp: 'Image', 
    name: 'Farhan',
    skill: 'JavaScript',
    skillneeded: 'Python',
    isbuttonreq: true,
    rating: 3.9,
  },
  {
    id: 2,
    pp: 'Image',
    name: 'Aisha',
    skill: 'React',
    skillneeded: 'Node.js',
    isbuttonreq: true,
    rating: 4.2,
  },
  {
    id: 3,
    pp: 'Image',
    name: 'Om',
    skill: 'Python',
    skillneeded: 'Node.js',
    isbuttonreq: true,
    rating: 4.2,
  },
  {
    id: 4,
    pp: 'Image',
    name: 'Rahul',
    skill: 'Java',
    skillneeded: 'Node.js',
    isbuttonreq: true,
    rating: 4.2,
  },
 
];

function Card() {

    const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 2;

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / cardsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-20">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center space-x-4">
            <img
              src={user.pp}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-blue-500"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-600">
                Skill: <span className="font-medium">{user.skill}</span>
              </p>
              <p className="text-sm text-gray-600">
                Needs: <span className="font-medium">{user.skillneeded}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-yellow-500 font-semibold">
              ⭐ {user.rating}
            </span>
            {user.isbuttonreq && (
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Request
              </button>
            )}
          </div>
        </div>
      ))}
       <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border-blue-500'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;
