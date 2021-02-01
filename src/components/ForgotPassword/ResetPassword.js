import {useState } from "react";
import {Alert, Button, Container, Form, FormGroup, Input} from "reactstrap";
import logo from '../../images/logo.png';
import '../../css/ResetPassword.css';

function ResetPassword(props){
    const [password, setPassword] = useState({
        new_password: '',
        confirm_password: '',
    });
    const [error, setError] = useState(false);
    function handleSubmit(event){
        event.preventDefault();
        const regex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        if(regex.exec(password.new_password) !==null && password.confirm_password===password.new_password){
            props.history.push('/login');
        }else{
            setError(true);
        }
    }

    function handleOnChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setPassword({
            ... password,
            [name] : value,
        })
    }
    console.log(password)
    return(
        <Container className="a">
            <Form className="reset" onSubmit={handleSubmit}>
                <FormGroup>
                    <img src={logo} alt=""/>
                </FormGroup>
                <FormGroup>
                    <h3>Forgot Password?</h3>
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="new_password" required="required" onChange={handleOnChange} placeholder="New password"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="confirm_password" required="required" onChange={handleOnChange} placeholder="Confirm new password"/>
                </FormGroup>
                <FormGroup>
                    <Alert isOpen={error} color="danger">Password incorrect! Try again!</Alert>
                </FormGroup>
                <FormGroup className="update">
                    <Button color="primary">Update</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}

export default ResetPassword;