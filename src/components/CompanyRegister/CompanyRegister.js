import React, { useState } from "react";
import "../../css/CompanyRegister.css";
import register from "../../images/register.png";
import { Col, Container, Form, Label, Row } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Snackbar,
} from "@material-ui/core";
import Moment from "moment";
import md5 from "md5";
import Alert from "@material-ui/lab/Alert";
import { getUser } from "../../utils/Common";

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

function CompanyRegister() {
  const [companyRegister, setCompanyRegister] = useState({
    company_name: "",
    address: "",
    phone: null,
    manager_name: "",
    manager_email: "",
  });

  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState({
    company_name: false,
    address: false,
    phone: false,
    manager_name: false,
    email: false,
    message: "",
  });

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
  function handleConfirm(e) {
    e.preventDefault();
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (companyRegister.company_name.length > 255) {
      setError({
        ...error,
        company_name: true,
        message: "Company name max length 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          company_name: false,
          message: "",
        });
      }, 3000);
    } else if (companyRegister.company_name === "") {
      setError({
        ...error,
        company_name: true,
        message: "Company name must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          company_name: false,
          message: "",
        });
      }, 3000);
    } else if (companyRegister.address.length > 255) {
      setError({
        ...error,
        address: true,
        message: "Address max length 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          address: false,
          message: "",
        });
      }, 3000);
    } else if (companyRegister.phone === null) {
      setError({
        ...error,
        phone: true,
        message: "Phone number must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          phone: false,
          message: "",
        });
      }, 3000);
    } else if (!companyRegister.phone.trim().match("^[0-9]{10}$")) {
      setError({
        ...error,
        phone: true,
        message: "Invalid phone number",
      });
      setTimeout(() => {
        setError({
          ...error,
          phone: false,
          message: "",
        });
      }, 3000);
    } else if (
      !pattern.test(companyRegister.manager_email) ||
      companyRegister.manager_email.trim() === ""
    ) {
      setError({
        ...error,
        email: true,
        message: "Invalid email",
      });
      setTimeout(() => {
        setError({
          ...error,
          email: false,
          message: "",
        });
      }, 3000);
    } else if (companyRegister.manager_name.length > 255) {
      setError({
        ...error,
        manager_name: true,
        message: "Manager name max length 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          manager_name: false,
          message: "",
        });
      }, 3000);
    } else if (companyRegister.manager_name === "") {
      setError({
        ...error,
        manager_name: true,
        message: "Manager name must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          manager_name: false,
          message: "",
        });
      }, 3000);
    } else {
      setConfirm(true);
    }
  }
  return (
    <div>
      <SidebarAdmin />
      <div className="main-panel">
        <Container fluid={true}>
          <Snackbar
            open={error.company_name}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={TransitionLeft}
          >
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={error.address}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={TransitionLeft}
          >
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={error.phone}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={TransitionLeft}
          >
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={error.manager_name}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={TransitionLeft}
          >
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={error.email}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={TransitionLeft}
          >
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          </Snackbar>

          <div>
            <img style={{ marginTop: "20px" }} src={register} alt="" />
          </div>
          <Form
            style={{
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 50,
              textAlign: "left",
            }}
          >
            <Row>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Company Name
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="company_name"
                  required
                  size="small"
                  error={error.company_name}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Manager Name
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="manager_name"
                  required
                  error={error.manager_name}
                  size="small"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Phone Number
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="phone"
                  name="phone"
                  required
                  size="small"
                  error={error.phone}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Manager Email
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="manager_email"
                  required
                  error={error.email}
                  size="small"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Street Address
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="address"
                  required
                  error={error.address}
                  size="small"
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form>
          <Button
            style={{ marginTop: 20 }}
            color="primary"
            variant="contained"
            onClick={handleConfirm}
          >
            Verification
          </Button>
          <Dialog open={confirm} fullWidth>
            <DialogTitle>Confirm Information</DialogTitle>
            <DialogContent>
              <Form style={{ textAlign: "left", fontSize: 18 }}>
                <Row>
                  <Col sm={4}>
                    <Label>Company Name:</Label>
                  </Col>
                  <Col>
                    <Label>{companyRegister.company_name}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Label>Manager Name:</Label>
                  </Col>
                  <Col>
                    <Label>{companyRegister.manager_name}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Label>Phone Number:</Label>
                  </Col>
                  <Col>
                    <Label>{companyRegister.phone}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Label>Manager Email:</Label>
                  </Col>
                  <Col>
                    <Label>{companyRegister.manager_email}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Label>Street Address:</Label>
                  </Col>
                  <Col>
                    <Label>{companyRegister.address}</Label>
                  </Col>
                </Row>
              </Form>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setConfirm(false)}
              >
                Cancel
              </Button>
              <Button color="primary" variant="contained">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
}

export default CompanyRegister;
