import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Login failed');
        return;
      }

      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert('Login successful!');
      // Redirect to home or dashboard here
      window.location.href = '/'; // or your dashboard path
    } catch (err) {
      console.error(err);
      alert('An error occurred while logging in.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-slate-800 font-bold text-white flex justify-between items-center px-3 py-5">
        <h2>Skill Swap Platform</h2>
        <a href="/"><button className="mx-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
          Home
        </button></a>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Type Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
