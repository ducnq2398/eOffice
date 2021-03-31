import "../../css/Login.css";
import eoffice from "./../../images/logo.png";
import { Link, useHistory } from "react-router-dom";
import fpt from "../../images/fpt.png";
import support from "../../images/support.png";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { Col, Row, Container, Form, FormGroup } from "reactstrap";
import { useState } from "react";
import loginAPI from "../../api/loginAPI";
import { setUserSession } from "../../utils/Common";
import TextField from "@material-ui/core/TextField";
import md5 from "md5";
import { Button, InputAdornment, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import firebase from "../App/firebase";
import { browserName, osVersion, osName } from "react-device-detect";
import packageJson from "../../../package.json";
import textbg from "../../images/bg-preview.png";

function Login() {
  const [token, setToken] = useState();
  const messaging = firebase.messaging();
  messaging
    .requestPermission()
    .then(function () {
      return messaging.getToken();
    })
    .then(function (token) {
      setToken(token);
    })
    .catch(function (error) {
      console.log(error);
    });

  const history = useHistory();
  const [getData, setGetData] = useState({
    username: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  function handleGetData(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setGetData({
      ...getData,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const os = osName + " " + osVersion;
    const md5pass = md5(getData.password);
    const params = {
      email: getData.username,
      password: md5pass.trim().toString(),
      device: browserName,
      osVersion: os,
      appVersion: packageJson.version,
      reqToken: token,
    };
    loginAPI
      .loginUser(params)
      .then(function (res) {
        setUserSession(res.data.IdToken, res.data);
        history.push("/dashboard");
      })
      .catch(function (error) {
        setSubmit(true);
        setTimeout(() => {
          setSubmit(false);
        }, 2000);
      });
  }

  return (
    <div className="background">
      <Container fluid>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={submit}
          autoHideDuration={3000}
        >
          <Alert variant="filled" severity="error">
            Invalid username or password
          </Alert>
        </Snackbar>
        <Row>
          <Col md={6} style={{ marginTop: "5%" }}>
            <div>
              <img className="logo-fpt" src={fpt} alt="" />
            </div>
            <div>
              <img src={textbg} alt="" />
            </div>
          </Col>
          <Col md={4} style={{marginTop:'20px'}}>
            <div className="content-panel form-login">
              <div className="nameHT">
                <img className="logo-system" src={eoffice} alt="" />
              </div>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <TextField
                    type="email"
                    name="username"
                    variant="outlined"
                    onChange={handleGetData}
                    required
                    placeholder="Email"
                    size="medium"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    type="password"
                    name="password"
                    variant="outlined"
                    onChange={handleGetData}
                    required
                    placeholder="Password"
                    size="medium"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormGroup>
                <FormGroup className="form-forgot">
                  <Link to="/forgot-password">Forgot password?</Link>
                </FormGroup>
                <FormGroup>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                    size="large"
                  >
                    Sign In
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </Col>
          <img
            className="logo-sp"
            style={{ position: "absolute", bottom: 0, left: -40 }}
            src={support}
            alt=""
          />
        </Row>
      </Container>
    </div>
  );
}
export default Login;
