import { useState } from "react";
import {Container, Form, FormGroup } from "reactstrap";
import logo from "../../images/logo.png";
import "../../css/ResetPassword.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useLocation } from "react-router";
import support from "../../images/support.png";

function ResetPassword() {
  const location = useLocation();
  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });
  console.log(location);
  const [error, setError] = useState({
    correct: false,
    message: "",
  });
  function handleSubmit(event) {
    event.preventDefault();
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (regex.exec(password.new_password) === null) {
      setError({
        correct: true,
        message: "Password must be more than 6 characters",
      });
      setTimeout(() => {
        setError({
          correct: false,
          message: "",
        });
      }, 3000);
    }
  }

  function handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setPassword({
      ...password,
      [name]: value,
    });
  }

  return (
    <Container className="a">
      <Form className="reset">
        <FormGroup>
          <img src={logo} alt="" />
        </FormGroup>
        <FormGroup>
          <h3>Forgot Password?</h3>
        </FormGroup>
        <FormGroup>
          <div>
            <TextField
              fullWidth
              type="password"
              name="new_password"
              required
              onChange={handleOnChange}
              placeholder="New password"
              variant="outlined"
              error={error.correct}
              helperText={error.message}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <TextField
            fullWidth
            type="password"
            name="confirm_password"
            required
            onChange={handleOnChange}
            placeholder="Confirm new password"
            variant="outlined"
           
          />
        </FormGroup>
        <FormGroup className="update">
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update
          </Button>
        </FormGroup>
      </Form>
      <img
        style={{ position: "fixed", bottom: 0, left: 0 }}
        src={support}
        alt=""
        width="500"
        height="100"
      />
    </Container>
  );
}

export default ResetPassword;
