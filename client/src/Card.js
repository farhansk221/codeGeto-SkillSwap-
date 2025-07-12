import React, { useEffect, useState } from 'react';

function Card() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const cardsPerPage = 4;

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to load users:', err));
  }, []);

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / cardsPerPage);

  const changePage = (page) => setCurrentPage(page);

  const openProfile = (user) => setSelectedUser(user);
  const goBack = () => setSelectedUser(null);

  // 👤 Profile view
  if (selectedUser) {
    return (
      <div className="p-10">
        <button onClick={goBack} className=" px-2 py-1 bg-blue-600 font-bold border-2 border-black rounded-sm text-mb-4 text-white-600 underline">← Back</button>
        <img src={selectedUser.pp} className="w-20 h-20 rounded-full mb-4" alt="Avatar" />
        <h1 className="text-2xl font-bold">{selectedUser.name}</h1>
        <p className='font-bold'><strong>Skill Offered:</strong> {selectedUser.skill}</p>
        <p><strong>Skill Needs:</strong> {selectedUser.skillneeded}</p>
        <p className='font-bold'><strong>Rating & Review:</strong> ⭐ {selectedUser.rating}</p>
      </div>
    );
  }

  // 🧾 List view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-20">
      {currentUsers.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer"
          onClick={() => openProfile(user)}
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
                Skill Offered: <span className="font-medium">{user.skill}</span>
              </p>
              <p className="text-sm text-gray-600">
                Skills Needs : <span className="font-medium">{user.skillneeded}</span>
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
      <div className="flex justify-center mt-6 space-x-2 col-span-full">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
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
