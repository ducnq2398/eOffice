import {useState } from "react";
import {Button, Col, Container, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import logo from '../../images/logo.png';
import ValidatePhone from "../Validation/ValidatePhone";
import '../../css/ForgotPassword.css';
import CountDown from 'react-countdown';
import { render } from "@testing-library/react";

function ForgotPassword(){
    const [phone, setPhone] = useState('');
    function handleOnChange(e) {
        setPhone(e.target.value)
    }
    const [modal, setModal] = useState(false);
    const toggle = () =>{
        setModal(true);
        setTimeout(()=>{
            setModal(false)
        },59000)
    } 

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
    const renderer = ({seconds}) => {
          return <span>{seconds}</span>;
    }
    return(
        <Container className="a">
            <Form className="forgot">
                <FormGroup>
                    <img src={logo} alt=""/>
                </FormGroup>
                <FormGroup>
                    <h3>Forgot Password?</h3>
                </FormGroup>
                <FormGroup>
                    <Input type="tel" required="required" placeholder="Please enter phone number" onChange={handleOnChange}/>
                </FormGroup>
                <FormGroup className="next">
                    <Button color="primary" onClick={toggle}>Next</Button>
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
                            <Row>
                                <Col style={{width:'10%'}}>
                                    <Input valid={vaildPhone.isValid} invalid={vaildPhone.isInvalid} onChange={handleOnChange} onBlur={checkPhone} type="text" name="otp"/>
                                </Col>
                                <Col sm={2}>
                                    <CountDown date={Date.now() + 59000} renderer={renderer} />s
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col sm={5}>
                            <Button color="secondary" onClick={() =>setModal(false)}>Cancel</Button>
                        </Col>
                        <Col sm={5}>
                            <Button color="primary">Verifying</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </Container>
    );
}

export default ForgotPassword;