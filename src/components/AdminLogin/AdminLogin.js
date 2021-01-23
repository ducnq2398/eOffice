import logo from './../../images/logo.png';
import './AdminLogin.css';
import PropTypes from 'prop-types';
import React, {useEffect, useState } from 'react';

AdminLogin.propTypes = {
    setToken: PropTypes.func.isRequired
}

async function loginAdmin(credentials){
    return fetch('https://reqres.in/api/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

function AdminLogin({setToken}){
        const [admin, setAdmin] = useState();
        const [password, setPassword] = useState();
        const handleSubmit = async e => {
            e.preventDefault();
            const token = await loginAdmin({
                admin,
                password
            });
            setToken(token);
        }
        return (
            <div className="bg">
                <img src={logo} alt=""/>
                <h3/>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" onChange={e => setAdmin(e.target.value)} placeholder="Admin"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                </form>
            </div>
        );
    }

export default AdminLogin;