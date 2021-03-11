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
import CountDown from "react-countdown";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import firebase from "../../firebase";
import { useHistory } from "react-router";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [check, setCheck] = useState({
    error: false,
    message: "",
  });
  const [opt, setOtp] = useState(null);
  function handleOnChange(e) {
    setPhone(e.target.value);
  }
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
      const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
      const number = "+84" + phone.substring(1);
      firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then(function (confirmationResult) {
          // setModal(true);
          // setTimeout(() => {
          //   setModal(false);
          // }, 59000);
          const code = prompt('Enter OTP', '');
          confirmationResult.confirm(code).then(function(result){
            window.history.pushState(JSON.stringify(result.user),'','/reset-password')
            console.log(result.user);
          }).catch(function(error){
            console.log(error);
          })
        });
    }
  };

  const renderer = ({ seconds }) => {
    return <span>{seconds}</span>;
  };
  return (
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
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Col>
                <Col
                  sm={2}
                  style={{
                    marginTop: "11px",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  <CountDown date={Date.now() + 59000} renderer={renderer} />s
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col sm={5}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setModal(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col sm={5}>
              <Button id="verify" variant="contained" color="primary">
                Verifying
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ForgotPassword;
