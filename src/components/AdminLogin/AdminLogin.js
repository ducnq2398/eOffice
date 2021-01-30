import logo from './../../images/logo.png';
import './../../css/AdminLogin.css';
import React, {useState } from 'react';
import { setAdminSession} from '../../utils/Common';
import axios from 'axios';
import queryString from 'query-string';
import {Alert, Button, Container, Form, FormGroup, Input} from 'reactstrap';
import loginAPI from '../../api/loginAPI';
import axiosClient from '../../api/axiosClient';

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
            const params = {
                username: adminLogin.username,
                password: adminLogin.password,
            }
            
            // loginAPI.loginAdmin(params).then(function(res){
            //     if(res.status==='400'){
            //         setSubmit(true);
            //     }else{
            //         setUserSession(res.data.token, res.data);
            //         props.history.push('/admin-manager');
            //     }
            // }).catch(function(error){
            //     console.log(error);
            // })
        
            axios.post('https://datnxeoffice.azurewebsites.net/api/Admins/login',params).then(function(res){
                    setAdminSession(res.data.token);
                    props.history.push('/admin-manager');
                }).catch(function(error){
                    setSubmit(true)
            })
        }
        
        return (
            <Container fluid={true}>
                <Form className="form-admin" onSubmit={handleSubmit}>
                    <FormGroup>
                        <img src={logo} alt=""/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="username" required onChange={handleChange} placeholder="Username"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" required onChange={handleChange} placeholder="Password"/>
                    </FormGroup>
                    <FormGroup>
                        <Alert color="danger" isOpen={submit}>Incorrect username or password</Alert>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" color="primary" block>Login</Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }

export default AdminLogin;