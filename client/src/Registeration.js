import React, { useState } from 'react';

function Registeration() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await fetch('/api/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('OTP sent to your email.');
        setOtpSent(true);
      } else {
        alert(data.error || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending OTP.');
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          otp,
          name: email.split('@')[0], // default name from email
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registered successfully!');
        window.location.reload();
      } else {
        alert(data.error || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error registering.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-slate-800 font-bold text-white flex justify-between items-center px-3 py-5">
        <h2>Skill Swap Platform</h2>
        <button className="mx-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {otpSent && (
            <>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-700 font-semibold mb-1">
                  OTP:
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <button
            onClick={otpSent ? handleRegister : handleSendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {otpSent ? 'Register' : 'Send OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registeration;
