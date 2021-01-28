import {useState } from "react";
import {Button, Col, Container, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import logo from '../../images/logo.png';
import ValidatePhone from "../Validation/ValidatePhone";
import '../../css/ForgotPassword.css';

function ForgotPassword(){
    const [phone, setPhone] = useState('');
    function handleOnChange(e) {
        setPhone(e.target.value)
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [vaildPhone, setValidPhone] = useState({
        isValid: false,
        isInvalid: false,
    })

    function checkPhone(){
        const {isValid, isInvalid} = ValidatePhone(phone);
        setValidPhone({
            isValid: isValid,
            isInvalid: isInvalid,
        })
    }
    return(
        <Container>
            <img src={logo} alt=""/>
            <Form className="forgot">
                <FormGroup>
                    <h3>Forgot Password?</h3>
                </FormGroup>
                <FormGroup className="style_input">
                    <Input type="tel" required="required" placeholder="Please enter phone number" onChange={handleOnChange}/>
                </FormGroup>
                <FormGroup className="btn_next">
                    <Button className="btn_next_2" color="primary" onClick={toggle}>Next</Button>
                </FormGroup>
            </Form>
            <Modal style={{marginTop:'18%'}} isOpen={modal} toggle={toggle}>
                <ModalHeader className="otp_banner">Verifying OTP</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <span>Please enter the OTP sent to Phone number to retrieve your password</span>
                        </FormGroup>
                        <FormGroup>
                            <Input valid={vaildPhone.isValid} invalid={vaildPhone.isInvalid} onChange={handleOnChange} onBlur={checkPhone} type="text" name="otp"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col sm={5}>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </Col>
                        <Col sm={5}>
                            <Button color="primary" onClick={toggle}>Verifying</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </Container>
    );
}

export default ForgotPassword;