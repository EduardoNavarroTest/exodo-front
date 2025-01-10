import { useState } from 'react';
import { Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useApiSessions from '../../hooks/api/useApiSession.js';
import './Login2.css';

const Login2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useApiSessions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate('/home');
    } else {
      alert('Error al iniciar sesión: ' + result.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-container'>
      <div className="welcome-message">
        ¡Bienvenido a Éxodo! Por favor, inicia sesión para continuar.
      </div>

      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='login-title'>Login</h1>

        <div className="input-box">
          <Person className='input-icon' />
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <Lock className='input-icon' />
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="password-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </div>
        </div>

        <div className='remember-forgot-box'>
          <label htmlFor="remember">
            <input type="checkbox" id='remember' />
            Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button className='login-btn' type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login2;
