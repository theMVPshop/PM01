import React, { useState } from 'react';

function Signup() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const loading = null;

    return(
        <div className="App">
            <h3>Please create a username and password.</h3>
            <form className="login-form" action="/auth/signup" method="post">
            <label>Create Username</label>
            <input
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
                name="username"
                value={username}
                type="text"
                required />
            <label>Create Password</label>
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
                >Sign Up</button>
            </form>
        </div>
    )
}

export default Signup