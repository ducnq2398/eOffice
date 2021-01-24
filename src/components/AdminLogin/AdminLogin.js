import logo from './../../images/logo.png';
import './AdminLogin.css';
import React, {useState } from 'react';
import { setUserSession } from '../../utils/Common';
import axios from 'axios';

function AdminLogin(props){
        const [adminLogin, setAdminLogin] = useState({
            username: '',
            password: '',
        })

        function handleChange(event){
            const target = event.target;
            const name = target.name;
            const value = target.value;
            setAdminLogin({
                ... adminLogin,
                [name] : value,
            })
        }
        function handleSubmit(e){
            e.preventDefault();
            axios.post('https://reqres.in/api/login',{
                email: adminLogin.username,
                password: adminLogin.password
            }).then(function(res){
                console.log(res);
                setUserSession(res.data.token,res.data);
                props.history.push('/admin-manager');
            }).catch(function(error){
                console.log(error);
            });
            console.log(adminLogin);        
        }
        return (
            <div className="bg">
                <img src={logo} alt=""/>
                <h3/>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" onChange={handleChange} placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onChange={handleChange} placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                </form>
            </div>
        );
    }

export default AdminLogin;