import logo from './../../images/logo.png';
import './AdminLogin.css';
import React, {useState } from 'react';
import { setUserSession } from '../../utils/Common';
import axios from 'axios';
import {Alert} from 'reactstrap';
import queryString from 'query-string';

function AdminLogin(props){
        const [adminLogin, setAdminLogin] = useState({
            username: '',
            password: '',
        })
        const [submit, setSubmit] = useState(false);

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
            
            axios.post('https://datnxeoffice.azurewebsites.net/api/Admins/login',{
                username: adminLogin.username,
                password: adminLogin.password
            }).then(function(res){
                if(res.data ==='fail'){
                    setSubmit(true);
                }else{
                    setUserSession(res.data.token,res.data);
                    props.history.push('/admin-manager');
                }
            }).catch(function(error){
                console.log(error);
                setSubmit(true);
            });     
        }
        return (
            <div className="bg">
                <img src={logo} alt=""/>
                <h3/>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="username" required onChange={handleChange} placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" required onChange={handleChange} placeholder="Password"/>
                    </div>
                    <Alert color="danger" isOpen={submit}>Incorrect username or password!</Alert>
                    <button type="submit" className="btn btn-primary btn-block btn-large">Login</button>
                </form>
            </div>
        );
    }

export default AdminLogin;