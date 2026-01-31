import { useState } from 'react';
import { registerUser } from '../api/auth';

const RegisterPage = () => {
    // 1. Added username state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear old messages
        
        try {
            // 2. Passing username, email, and password to the API
            const data = await registerUser(username, email, password);
            setMessage(`Registration successful! You can now log in, ${username}`);
            
            // Optional: Clear fields after success
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    required
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    required
                />
                <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
            {message && <p style={{ marginTop: '15px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default RegisterPage;