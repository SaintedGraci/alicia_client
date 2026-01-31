import { useState } from 'react';
import { loginUser } from '../api/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            
            // Save the "ID Card" (Token) in the browser's pocket
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userRole', data.user.role);
            
            setMessage(`Success! Hello, ${data.user.username} (${data.user.role})`);
        } catch (err) {
            setMessage(`Error: ${err}`);
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Welcome Back!</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px' }}>
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;