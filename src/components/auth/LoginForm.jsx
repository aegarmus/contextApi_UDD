// src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/User/userContext';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const { login, loginWithGoogle } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ correo: email, password });
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            <button onClick={handleGoogleLogin}>Iniciar Sesión con Google</button>
        </div>
    );
}

