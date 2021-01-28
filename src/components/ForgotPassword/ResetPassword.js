import {useState } from "react";
import {Button, Container, Form, FormGroup, Input} from "reactstrap";
import logo from '../../images/logo.png';
import '../../css/ForgotPassword.css';
import ValidatePassword from '../Validation/ValidatePassword';

function ResetPassword(){
    const [password, setPassword] = useState({
        new_password: '',
        confirm_password: '',
    });
    const [validPassword, setValidPassword] = useState({
        isValid: false,
        isInValid: false
    });
    const [validConfirmPassword, setValidConfirmPassword] = useState({
        isValid: false,
        isInValid: false
    });

    function handleOnChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setPassword({
            ... password,
            [name] : value,
        })
    }

    function checkPassword() {
        const{isValid , isInValid} = ValidatePassword(password.new_password);
        setValidPassword({
            isValid: isValid,
            isInValid: isInValid
        })
    }

    function checkConfirm(){
        if(password.confirm_password===password.new_password){
            setValidConfirmPassword({
                isValid: true,
                isInValid: false,
            })
        }else{
            setValidConfirmPassword({
                isValid: false,
                isInValid: true,
            })
        }
    }

    return(
        <Container>
            <img src={logo} alt=""/>
            <Form className="forgot">
                <FormGroup>
                    <h3>Forgot Password?</h3>
                </FormGroup>
                <FormGroup className="style_input">
                    <Input valid={validPassword.isValid} invalid={validPassword.isInValid} type="password" name="new_password" required="required" onChange={handleOnChange} onBlur={checkPassword} placeholder="New password"/>
                </FormGroup>
                <FormGroup className="style_input2">
                    <Input valid={validConfirmPassword.isValid} invalid={validConfirmPassword.isInValid} type="password" name="confirm_password" required="required" onChange={handleOnChange} onBlur={checkConfirm} placeholder="Confirm new password"/>
                </FormGroup>
                <FormGroup className="btn_next">
                    <Button className="btn_update" color="primary">Update</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}

export default ResetPassword;