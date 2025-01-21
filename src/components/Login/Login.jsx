import { useState } from 'react';
import { Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import useApiSessions from '../../hooks/api/useApiSession.js';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { login } = useApiSessions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const result = await login(username, password);
      if (result.success) {
        navigate('/home');
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setSnackbarMessage(error || 'Error al iniciar sesión');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };


  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-body">
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

        <LoadingSpinner loading={loading} />

        <CustomSnackbar open={snackbarOpen} onClose={handleCloseSnackbar} severity={snackbarSeverity} message={snackbarMessage} />
      </div>
    </div>
  );
};

export default Login;
