import logo from "./../../images/logo.png";
import "./../../css/AdminLogin.css";
import React, { useState } from "react";
import { setUserSession } from "../../utils/Common";
import { Container, Form, FormGroup } from "reactstrap";
import loginAPI from "../../api/loginAPI";
import md5 from "md5";
import Alert from "@material-ui/lab/Alert";
import { Button, Snackbar, TextField } from "@material-ui/core";
import { useHistory } from "react-router";

function AdminLogin() {
  const history = useHistory();
  const [adminLogin, setAdminLogin] = useState({
    username: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setAdminLogin({
      ...adminLogin,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const md5pass = md5(adminLogin.password);
    const params = {
      username: adminLogin.username,
      password: md5pass.trim().toString(),
    };

    loginAPI
      .loginAdmin(params)
      .then(function (res) {
        setUserSession(res.data.token, res.data);
        if (res.data.Role === "3") {
          history.push("/admin-manager");
        } else {
          history.push("/error");
        }
      })
      .catch(function (error) {
        setSubmit(true);
        setTimeout(() => {
          setSubmit(false);
        }, 3000);
      });
  }

  return (
    <div className="background">
      <Container fluid={true} className="a">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={submit}
          autoHideDuration={3000}
        >
          <Alert variant="filled" severity="error">
            Invalid username or password
          </Alert>
        </Snackbar>
        <Form className="form-admin" onSubmit={handleSubmit}>
          <FormGroup>
            <img className="logo-system" src={logo} alt="" />
          </FormGroup>
          <FormGroup>
            <TextField
              fullWidth
              type="email"
              name="username"
              required
              onChange={handleChange}
              placeholder="Email"
              variant="outlined"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              fullWidth
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="Password"
              variant="outlined"
            />
          </FormGroup>
          <FormGroup>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default AdminLogin;
