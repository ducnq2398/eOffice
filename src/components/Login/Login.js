import '../../css/Login.css';
import eoffice from './../../images/logo.png';
import {Link} from 'react-router-dom';
import fpt from '../../images/fpt.png';
import support from '../../images/support.png';
import {Alert, Button, Col,Row, Container, Form, FormGroup, Input} from 'reactstrap';
import { useEffect, useState } from 'react';
import loginAPI from '../../api/loginAPI';
import { getUser, setUserSession } from '../../utils/Common';
import axios from 'axios';
import md5 from 'md5';

function Login(props){
    const [getData, setGetData] =useState({
        username: '',
        password: '',
    })
    const [submit, setSubmit] = useState(false);

    function handleGetData(e){
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setGetData({
            ... getData,
            [name] : value,
        })
    }
    

    function handleSubmit(e){
        e.preventDefault();
        const md5pass = md5(getData.password);
        const params = {
            email: getData.username,
            password: md5pass.trim().toString(),
        }
        console.log(params)
        axios.post('https://datnxeoffice.azurewebsites.net/api/Accounts/login',params).then(function(res){
            setUserSession(res.data.token, res.data);
            if(res.data.roleId===1){
                props.history.push('/user-management');
            }else{
                props.history.push('/admin-manager');
            }
            console.log(res.data)
        }).catch(function(error){
            setSubmit(true)
        })
    }
    return(
            <Container fluid={true}>
                <Row>
                    <Col>
                        <div className="fpt">
                            <img src={fpt} alt="" width="350px" height="200px"/>
                            <h1>MANAGEMENT & CONTRACT</h1>
                            <p style={{color:'white', fontSize:'30px'}}>DOCUMENT SYSTEM</p>
                            <img style={{marginTop:'70%', marginRight:'90%'}} src={support} alt="" width="500" height="100"/>
                        </div>
                    </Col>
                    <Col>
                        <Form className="form-login" onSubmit={handleSubmit}>
                            <FormGroup>
                                <img src={eoffice} alt=""/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="username" onChange={handleGetData} required placeholder="Email"/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" onChange={handleGetData} required placeholder="Password"/>
                            </FormGroup>
                            <FormGroup className="form-forgot">
                                <Link to="/forgot-password">Forgot password?</Link>
                            </FormGroup>
                            <FormGroup>
                                <Alert isOpen={submit} color="danger">Incorrect username or password</Alert>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit" block>Sign In</Button>
                            </FormGroup>
                        </Form>
                    </Col>

                </Row>
                    
            </Container>
    );
}
export default Login;