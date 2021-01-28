import '../../css/Login.css';
import eoffice from './../../images/eoffice.png';
import {Link} from 'react-router-dom';
import {Alert, Button, Container, Form, FormGroup, Input} from 'reactstrap';

function Login(){
    return(
        <Container fluid={true}>
            <Form className="form-login">
                <FormGroup>
                    <img src={eoffice} alt=""/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="username" placeholder="Username"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" placeholder="Password"/>
                </FormGroup>
                <FormGroup className="form-forgot">
                    <Link to="/forgot-password">Forgot password?</Link>
                </FormGroup>
                <FormGroup>
                    <Alert isOpen={false} color="danger">Incorrect username or password</Alert>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit" block>Sign In</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}
export default Login;