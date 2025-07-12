import React, { useEffect, useState } from 'react';

const daysList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function Screen3() {
  const [userId, setUserId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    location: '',
    skillsOffered: '',
    skillsRequired: '',
    availability: [],
    visibility: 'Public',
  });

  // Fetch user data on load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (storedUser?.id && token) {
      setUserId(storedUser.id);
      fetch(`/api/user/${storedUser.id}`, {
        headers: { Authorization: token }
      })
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then(data => {
          setForm({
            name: data.name || '',
            location: data.location || '',
            skillsOffered: data.skills_offered || '',
            skillsRequired: data.skills_requested || '',
            availability: data.availability?.split(',') || [],
            visibility: data.visibility || 'Public',
          });
        })
        .catch(err => {
          alert('Session expired or unauthorized');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        //   window.location.href = '/login';
        });
    } else {
      alert('You must be logged in.');
    //   window.location.href = '/login';
    }
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day) => {
    setForm(prev => {
      const updated = prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day];
      return { ...prev, availability: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!userId || !token) return alert('You must be logged in');

    const payload = {
      name: form.name,
      skills_offered: form.skillsOffered,
      skills_requested: form.skillsRequired,
      availability: form.availability.join(','),
    };

    const res = await fetch(`/api/user/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Profile updated!');
    } else {
      alert(data.error || 'Update failed.');
    }
  };

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { id: 'name', label: 'Name', value: form.name },
            { id: 'location', label: 'Location', value: form.location },
            { id: 'skillsOffered', label: 'Skills Offered', value: form.skillsOffered },
            { id: 'skillsRequired', label: 'Skills Required', value: form.skillsRequired },
          ].map(({ id, label, value }) => (
            <div key={id} className="flex items-center gap-4">
              <label htmlFor={id} className="w-40 text-right font-semibold">{label}:</label>
              <input
                id={id}
                value={value}
                onChange={(e) => handleChange(id, e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="flex-1 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="flex items-center gap-4">
            <label className="w-40 text-right font-semibold">Availability:</label>
            <div className="flex flex-wrap gap-2">
              {daysList.map(day => (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1 rounded border ${
                    form.availability.includes(day)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                >
                  {day.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-right font-semibold">Profile:</label>
            <select
              value={form.visibility}
              onChange={(e) => handleChange('visibility', e.target.value)}
              className="flex-1 border-b-2 border-gray-500 text-black bg-transparent py-2 focus:outline-none focus:border-blue-600 font-semibold"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => window.location.reload()}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Screen3;
