import "../../css/Login.css";
import eoffice from "./../../images/logo.png";
import { Link, useHistory } from "react-router-dom";
import fpt from "../../images/fpt.png";
import support from "../../images/support.png";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import {
  Alert,
  Button,
  Col,
  Row,
  Container,
  Form,
  FormGroup,
} from "reactstrap";
import { useState } from "react";
import loginAPI from "../../api/loginAPI";
import { setUserSession } from "../../utils/Common";
import TextField from "@material-ui/core/TextField";
import md5 from "md5";
import { InputAdornment } from "@material-ui/core";


function Login() {
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
    const md5pass = md5(getData.password);
    const params = {
      email: getData.username,
      password: md5pass.trim().toString(),
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
    <Container fluid={true} className="b">
      <Row>
        <Col>
          <div className="fpt">
            <img src={fpt} alt="" width="60%" height="50%" />
            <h1>MANAGEMENT & CONTRACT</h1>
            <p style={{ color: "white", fontSize: "30px" }}>DOCUMENT SYSTEM</p>
          </div>
        </Col>
        <Col>
          <Form className="form-login" onSubmit={handleSubmit}>
            <FormGroup>
              <img src={eoffice} alt="" />
            </FormGroup>
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
              <Alert isOpen={submit} color="danger">
                Incorrect username or password
              </Alert>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" block>
                Sign In
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <img
        style={{ position: "absolute", bottom: 0, left: 0 }}
        src={support}
        alt=""
        width="500"
        height="100"
      />
    </Container>
  );
}
export default Login;
