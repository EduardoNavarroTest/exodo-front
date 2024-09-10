import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">INICIAR SESIÓN</h2>
          <p className="text-gray-600">Inicia sesión para acceder a tu cuenta</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <input
              type="text"
              id="username"
              placeholder="User"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline block text-right mt-2"
            >
              Forgot your password?
            </a>
          </div>
          <Link to='/home'
            className="w-full block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center flex justify-center">
            Iniciar sesión
          </Link>


        </form>
      </div>
    </div>
  );
};

export default Login;
