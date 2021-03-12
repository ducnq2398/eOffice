import React, { useState } from "react";
import "../../css/CompanyRegister.css";
import register from "../../images/register.png";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import { Button } from "@material-ui/core";
import Moment from 'moment';
import md5 from "md5";
import { getUser } from "../../utils/Common";

function CompanyRegister() {
  const [companyRegister, setCompanyRegister] = useState({
    company_name: "",
    street_address: "",
    phone_number: "",
    applicant: "",
    applicant_email: "",
    status: 1,
    applicant_password: "",
  });

  const [modal, setModal] = useState(false);
  const toogle = () => setModal(!modal);

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setCompanyRegister({
      ...companyRegister,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const tel = "+84" + companyRegister.phone_number.substring(1);
    const params = {
      name: companyRegister.applicant,
      avatar: "",
      email: companyRegister.applicant_email,
      password: md5("123Aabc").trim().toString(),
      phone: tel,
      dateCreate: Moment(new Date()).format("DD/MM/YYYY"),
      creatorId: getUser().Id,
      role: "1",
      status: 1,
    };
  }
  return (
    <div>
      <SidebarAdmin />
      <div className="main-panel">
        <Container fluid={true}>
          <div>
            <img style={{ marginTop: "20px" }} src={register} alt="" />
          </div>
          <Form className="register-form">
            <FormGroup row>
              <Label style={{ color: "blue" }} sm={2}>
                Company Name
              </Label>
              <Col sm={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="company_name"
                  required
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label style={{ color: "blue" }} sm={2}>
                Street Address
              </Label>
              <Col sm={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="street_address"
                  required
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label style={{ color: "blue" }} sm={2}>
                Phone Number
              </Label>
              <Col sm={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="tel"
                  name="phone_number"
                  required
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label style={{ color: "blue" }} sm={2}>
                Applicant Name
              </Label>
              <Col sm={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="applicant"
                  required
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label style={{ color: "blue" }} sm={2}>
                Applicant Email
              </Label>
              <Col sm={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="applicant_email"
                  required
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Button
                variant="contained"
                onClick={toogle}
                color="primary"
                size="lg"
              >
                Verification
              </Button>
            </FormGroup>
          </Form>
          <Modal className="form-modal" isOpen={modal} toggle={toogle}>
            <ModalHeader style={{ marginRight: "auto", marginLeft: "auto" }}>
              Confirm Information
            </ModalHeader>
            <ModalBody>
              <Form className="form-confirm">
                <FormGroup row>
                  <Label>Company Name:</Label>
                  <p style={{ marginLeft: "20px" }}>
                    {companyRegister.company_name}
                  </p>
                </FormGroup>
                <FormGroup row>
                  <Label>Street Address:</Label>
                  <p style={{ marginLeft: "20px" }}>
                    {companyRegister.street_address}
                  </p>
                </FormGroup>
                <FormGroup row>
                  <Label>Phone Number:</Label>
                  <p style={{ marginLeft: "20px" }}>
                    {companyRegister.phone_number}
                  </p>
                </FormGroup>
                <FormGroup row>
                  <Label>Applicant Name:</Label>
                  <p style={{ marginLeft: "20px" }}>
                    {companyRegister.applicant}
                  </p>
                </FormGroup>
                <FormGroup row>
                  <Label>Applicant Email:</Label>
                  <p style={{ marginLeft: "20px" }}>
                    {companyRegister.applicant_email}
                  </p>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button variant="contained" color="secondary" onClick={toogle}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Created
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default CompanyRegister;
