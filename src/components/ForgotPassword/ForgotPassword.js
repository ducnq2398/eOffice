import { useState } from "react";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import logo from "../../images/logo.png";
import "../../css/ForgotPassword.css";
import support from "../../images/support.png";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import firebase from "../App/firebase";

function ForgotPassword(props) {
  const [phone, setPhone] = useState("");
  const [check, setCheck] = useState({
    error: false,
    message: "",
  });
  const [otp, setOtp] = useState(null);
  function handleOnChange(e) {
    setPhone(e.target.value);
  }
  const [errorOTP, setErrorOTP] = useState({
    error: false,
    message: ''
  });
  const [modal, setModal] = useState(false);
  const toggle = () => {
    if (!phone.trim().match("^[0-9]{10}$")) {
      setCheck({
        error: true,
        message: "Invalid phone number",
      });
      setTimeout(() => {
        setCheck({
          error: false,
          message: "",
        });
      }, 3000);
    } else {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha"
      );
      const appVerifier = window.recaptchaVerifier;
      const number = "+84" + phone.substring(1);
      firebase
        .auth()
        .signInWithPhoneNumber(number, appVerifier)
        .then(function (confirmationResult) {
          setModal(true);
          window.confirmationResult = confirmationResult;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  function handleConfirm(e) {
    e.preventDefault();
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("user", user.email);
        window.location = "/reset-password";
      })
      .catch(function (error) {
        console.log(error);
        setErrorOTP({
          error: true,
          message: 'Invalid verification code'
        });
        setTimeout(() => {
          setErrorOTP({
            error: false,
            message:''
          });
        }, 5000);
      });
  }
  return (
    <div className="background">
      <Container className="a">
        <Form className="forgot">
          <FormGroup>
            <img src={logo} alt="" />
          </FormGroup>
          <FormGroup>
            <h3>Forgot Password?</h3>
          </FormGroup>
          <FormGroup>
            <TextField
              error={check.error}
              helperText={check.message}
              fullWidth
              type="phone"
              required
              variant="outlined"
              placeholder="Please enter phone number"
              onChange={handleOnChange}
            />
            <div
              id="recaptcha"
              style={{ marginLeft: "90px", marginTop: "10px" }}
            ></div>
          </FormGroup>
          <FormGroup className="next">
            <Button color="primary" variant="contained" onClick={toggle}>
              Next
            </Button>
          </FormGroup>
        </Form>
        <Modal style={{ marginTop: "18%" }} isOpen={modal} toggle={toggle}>
          <ModalHeader className="otp_banner">Verifying OTP</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <span>
                  Please enter the OTP sent to Phone number to retrieve your
                  password
                </span>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="otp"
                      error={errorOTP.error}
                      helperText={errorOTP.message}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => window.location.reload()}
              style={{ marginRight: 5 }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="contained" color="primary">
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
        <img
          style={{ position: "fixed", bottom: 0, left: 0 }}
          src={support}
          alt=""
          width="500"
          height="100"
        />
      </Container>
    </div>
  );
}

export default ForgotPassword;
