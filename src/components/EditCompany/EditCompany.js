import React, { useState } from 'react';
import logo from './../../images/logo.png';
import './EditCompany.css'
import {useHistory} from 'react-router-dom';
import {Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

const validateInput = (checkingText) => {
    /* reg exp để kiểm tra xem chuỗi có chỉ bao gồm 10 - 11 chữ số hay không */

    const regexp = /^\d{10}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
        return { isInputValid: true,
                 errorMessage: ''};
    } else {
        return { isInputValid: false,
                 errorMessage: 'Phone number is incorrect'};
    }
}

function CompanyRegister(props){
    const history = useHistory();
    const home = () => history.push('/admin-manager');
    const {
        className
      } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [company_name, setCompanyName] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [applicant, setApplicant] = useState('');
    const [applicant_department, setApplicantDepartment] = useState('');
    const [applicant_email, setApplicantEmail] = useState('');
    const [isInputValid, setIsInputInvalid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    

    function handleInputValidation(event){
        const { isInputValid, errorMessage } = validateInput(getPhone);
        setIsInputInvalid(isInputValid);
        setErrorMessage(errorMessage);
    }


    function FormError(props) {
        /* nếu isHidden = true, return null ngay từ đầu */
        if (props.isHidden) { return null;}
    
        return ( <div className="form-warning">{props.errorMessage}</div>)
    }
    
    
    function getCompanyName(event){
        setCompanyName(event.target.value)
    }

    function getStreetAddress(e){
        setStreetAddress(e.target.value)
    }

    function getPhone(e){
        setPhoneNumber(e.target.value)
    }

    function getApplicant(e){
        setApplicant(e.target.value)
    }

    function getDepartment(e){
        setApplicantDepartment(e.target.value)
    }
    function getEmail(e){
        setApplicantEmail(e.target.value)
    }
        return (
            <div>
                <div>
                    <img src={logo} alt="" onClick={home}/>
                </div>
                
                <Container>
                <div className="banner">
                    Editing Company
                </div>
                    <Form style={{marginTop:'20px'}}>
                        <FormGroup row>
                            <Label sm={2}>Company Name</Label>
                            <Col sm={8}>
                                <Input type="text" name="company_name" required="required" onChange={getCompanyName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Street Address</Label>
                            <Col sm={8}>
                                <Input type="text" name="street_address" onChange={getStreetAddress}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Phone Number</Label>
                            <Col sm={8}>
                                <Input type="text" name="phone_number" required="required" onChange={getPhone} onBlur={handleInputValidation}/>
                                <FormError isHidden={isInputValid} errorMessage={errorMessage} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant</Label>
                            <Col sm={8}>
                                <Input type="text" name="applicant" required="required" onChange={getApplicant}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant Department</Label>
                            <Col sm={8}>
                                <Input type="select" name="applicant_department" id="exampleSelect" onChange={getDepartment}>
                                    <option>Production</option>
                                    <option>Purchasing</option>
                                    <option>Marketing</option>
                                    <option>Humman Resource Managerment</option>
                                    <option>Accounting and Finance</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2}>Applicant Email</Label>
                            <Col sm={8}>
                                <Input type="email" name="applicant_email" required="required" onChange={getEmail}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Button style={{padding:'15px 10px 15px',width:'400px',marginLeft:'auto', marginRight:'auto',marginTop:'20px'}} color="primary" size="lg" block onClick={toggle}>Save</Button>
                        </FormGroup>
                    </Form>
                </Container>

                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Confirm Information</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label>Company Name:</Label>
                                <Col sm={6}>
                                    {company_name}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label>Street Address:</Label>
                                <Col sm={6}>
                                    {street_address}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label>Phone Number:</Label>
                                <Col sm={6}>
                                    {phone_number}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label>Applicant:</Label>
                                <Col sm={6}>
                                    {applicant}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label>Applicant Department:</Label>
                                <Col sm={6}>
                                    {applicant_department}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label>Applicant Email:</Label>
                                <Col sm={6}>
                                    {applicant_email}
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={toggle}>Create</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }

export default CompanyRegister;