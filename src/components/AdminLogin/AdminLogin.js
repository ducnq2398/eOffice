import logo from './../../images/logo.png';
import './../../css/AdminLogin.css';
import React, {useState } from 'react';
import {setUserSession} from '../../utils/Common';
import {Alert, Button, Container, Form, FormGroup, Input} from 'reactstrap';
import loginAPI from '../../api/loginAPI';
import md5 from 'md5';

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
                ...adminLogin,
                [name] : value,
            })
        }
        function handleSubmit(e){
            e.preventDefault();
            const md5pass = md5(adminLogin.password);
            const params = {
                username: adminLogin.username,
                password: md5pass.trim().toString(),
            }
        
            loginAPI.loginAdmin(params).then(function(res){
                    setUserSession(res.data.token, res.data)
                    props.history.push('/admin-manager');
                }).catch(function(error){
                    setSubmit(true)
                    setTimeout(()=>{
                        setSubmit(false)
                    },2000)
            })
        }
        
        return (
            <Container fluid={true} className="a">
                <Form className="form-admin" onSubmit={handleSubmit}>
                    <FormGroup>
                        <img src={logo} alt=""/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="username" required onChange={handleChange} placeholder="Email"/>
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