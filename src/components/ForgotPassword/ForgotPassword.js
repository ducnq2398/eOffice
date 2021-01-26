import { useState } from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import logo from '../../images/logo.png';
import ValidatePhone from "../Validation/ValidatePhone";
import './ForgotPassword.css';

function ForgotPassword(){
    const [phone, setPhone] = useState('');
    const [validate, setValidate] = useState({
        isValid: false,
        isInvalid: false,
    })

    function handleOnChange(e) {
        setPhone(e.target.value)
    }

    function checkPhone() {
        const {isValid , isInvalid} = ValidatePhone(phone);
        setValidate({
            isValid: isValid,
            isInvalid: isInvalid,
        })
    }
    return(
        <Container>
            <img src={logo} alt=""/>
            <Form className="forgot">
                <FormGroup>
                    <h3>Forgot Password</h3>
                </FormGroup>
                <FormGroup>
                    <Input className="style_input" valid={validate.isValid} invalid={validate.isInvalid} onBlur={checkPhone} type="tel" required="required" placeholder="Please enter phone number" onChange={handleOnChange}/>
                    <Button color="primary">Send</Button>
                </FormGroup>
            </Form>
        </Container>
    );
}

export default ForgotPassword;