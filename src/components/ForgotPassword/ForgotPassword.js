import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import logo from '../../images/logo.png';
import './ForgotPassword.css';

function ForgotPassword(){
    return(
        <Container>
            <img src={logo} alt=""/>
            <Form className="forgot">
                <FormGroup>
                    <h3>Forgot Password</h3>
                </FormGroup>
                <FormGroup>
                    <Input style={{width:'80%',marginLeft:'auto', marginRight:'auto'}} type="text" placeholder="Please enter phone number"/>
                    <Button color="primary" size="lg" >Send</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}

export default ForgotPassword;