import { useState } from "react";
import { Container, Form, FormGroup } from "reactstrap";
import logo from "../../images/logo.png";
import "../../css/ResetPassword.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory} from "react-router";
import support from "../../images/support.png";
import md5 from "md5";
import userListAPI from "../../api/userListAPI";
import { toast } from "react-toastify";

function ResetPassword() {
  const user = localStorage.getItem("user");
  const history = useHistory();
  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({
    correct: false,
    message: "",
  });
  const [error2, setError2] = useState({
    correct: false,
    message: "",
  });
  function handleSubmit(event) {
    event.preventDefault();
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    if (regex.exec(password.new_password) === null) {
      setError({
        correct: true,
        message: "Password must be more than 6 characters, 1 upper case",
      });
      setTimeout(() => {
        setError({
          correct: false,
          message: "",
        });
      }, 3000);
    } else if (!regex.test(password.new_password.trim())) {
      setError({
        correct: true,
        message: "Password must be at least 6 characters,",
      });
      setTimeout(() => {
        setError({
          correct: false,
          message: "",
        });
      }, 3000);
    } else if (password.confirm_password.trim() === null) {
      setError2({
        correct: true,
        message: "Please input new password again",
      });
      setTimeout(() => {
        setError2({
          correct: false,
          message: "",
        });
      }, 3000);
    } else if (
      password.confirm_password.trim() !== password.new_password.trim()
    ) {
      setError2({
        correct: true,
        message: "Password confirm is not match",
      });
      setTimeout(() => {
        setError2({
          correct: false,
          message: "",
        });
      }, 3000);
    } else {
      const params = {
        email: user,
        newPassword: md5(password.new_password),
      };
      userListAPI
        .forgotPassword(params)
        .then(function () {
          toast.success("Change password successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            localStorage.removeItem("user");
            history.push("/");
          }, 5000);
        })
        .catch(function (error) {
          console.log(error);
        });
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
    <div className="background">
      <Container fluid>
        <Form className="reset">
          <FormGroup>
            <img className="logo-system" src={logo} alt="" />
          </FormGroup>
          <FormGroup>
            <h3>Create New Password</h3>
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
              error={error2.correct}
              helperText={error2.message}
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
          className="logo-sp"
          style={{ position: "absolute", bottom: 0, left: -40 }}
          src={support}
          alt=""
          width="500"
          height="100"
        />
      </Container>
    </div>
  );
}

export default ResetPassword;
