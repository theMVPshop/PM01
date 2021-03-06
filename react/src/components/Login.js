import React, { useState } from 'react';

function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const loading = null;
    return(
        <div className="login-wrapper">
            <h3>Please log in.</h3>
            <form className="login-form" action="/auth/login" method="post">
            <label>Username</label>
            <input
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
                name="username"
                value={username}
                type="text"
                required />
            <label>Password</label>
            <input
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                name="password"
                value={password}
                type="password"
                required />
            <button
                type="submit"
                className="button login-button"
                value={loading ? 'Loading...' : 'Login'}
                disabled={loading}
                >Log In</button>
            </form>
        </div>
    )
}

export default Login