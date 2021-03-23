import { Col, Container, Row } from "reactstrap";
import companyListAPI from "../../api/companyListAPI";
import "../../css/Profile.css";
import { getUser, removeUserSession } from "../../utils/Common";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentAPI from "../../api/departmentAPI";
import Navbar from "../Navbar/Navbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import md5 from "md5";
import userListAPI from "../../api/userListAPI";
import * as Icon from "react-icons/ai";
import { toast } from "react-toastify";

const user = getUser();
function Profile() {
  const history = useHistory();
  const [changePassword, setChangePassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [password, setPassword] = useState({
    current_pass: "",
    new_pass: "",
    confirm_pass: "",
  });
  const [user1, setUser] = useState([]);
  const [error, setError] = useState({
    old: false,
    message_old: "",
    new: false,
    message_new: "",
    confirm_new: false,
    message_confirm: "",
  });
  const [newAvater, setNewAvatar] = useState(false);
  function handleOnChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setPassword({
      ...password,
      [name]: value,
    });
  }
  useEffect(() => {
    async function fetPassword() {
      try {
        const response = await userListAPI.getUserById(getUser().Id);
        setOldPass(response.data.password);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetPassword();
  }, []);
  function handleChangePassword(e) {
    e.preventDefault();
    const md5CurrentPass = md5(password.current_pass);
    var pattern = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
    );
    if (password.current_pass.trim() === "") {
      setError({
        ...error,
        old: true,
        message_old: "Please enter current password",
      });
      setTimeout(() => {
        setError({
          ...error,
          old: false,
          message_old: "",
        });
      }, 3000);
    } else if (password.new_pass.trim() === "") {
      setError({
        ...error,
        new: true,
        message_new: "Please enter new password",
      });
      setTimeout(() => {
        setError({
          ...error,
          new: false,
          message_new: "",
        });
      }, 3000);
    } else if (password.confirm_pass.trim() === "") {
      setError({
        ...error,
        confirm_new: true,
        message_confirm: "Please enter confirm new password",
      });
      setTimeout(() => {
        setError({
          ...error,
          confirm_new: false,
          message_confirm: "",
        });
      }, 3000);
    } else if (!pattern.test(password.new_pass.trim())) {
      setError({
        ...error,
        new: true,
        message_new: "Password must be at least 6 characters, 1 upper case",
      });
      setTimeout(() => {
        setError({
          ...error,
          confirm_new: false,
          message_confirm: "",
        });
      }, 3000);
    } else if (password.new_pass.trim() !== password.confirm_pass.trim()) {
      setError({
        ...error,
        confirm_new: true,
        message_confirm: "Password confirm is not match",
      });
      setTimeout(() => {
        setError({
          ...error,
          confirm_new: false,
          message_confirm: "",
        });
      }, 3000);
    } else if (md5CurrentPass !== oldPass) {
      setError({
        ...error,
        old: true,
        message_old: "Current password is incorrect",
      });
      setTimeout(() => {
        setError({
          ...error,
          old: false,
          message_old: "",
        });
      }, 3000);
    } else {
      const md5Newpass = md5(password.new_pass);
      const params = {
        id: getUser().Id,
        oldPassword: md5CurrentPass,
        newPassword: md5Newpass,
      };
      userListAPI
        .changePassword(params)
        .then(function () {
          removeUserSession();
          history.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    async function fetCompany() {
      const companyId = user.CompanyId;
      try {
        const response = await companyListAPI.getCompanyById(companyId);
        setCompany(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetCompany();
  }, []);

  useEffect(() => {
    async function fetDepartment() {
      const id = user.DepartmentId;
      try {
        const response = await departmentAPI.getDepartmentById(id);
        setDepartment(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetDepartment();
  }, []);
  function handleNewAvatar(e) {
    e.preventDefault();
    const url = avatar.substring(23);
    console.log(url);
    const params = {
      id: getUser().Id,
      avatar: url,
      password: oldPass,
      phone: getUser().Phone,
      address: getUser().Address,
      subDepartmentId: getUser().SubDepartmentId,
      departmentId: getUser().DepartmentId,
    };
    userListAPI
      .changeAvatar(params)
      .then(function () {
        history.push("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main-panel">
        <div className="avatar-col" />
        <Container fluid={true}>
          <Col style={{ top: "-200px" }}>
            <div>
              <img
                src={user1.avatar}
                alt="avatar"
                style={{ borderRadius: "50%" }}
                width="300px"
                height="300px"
              />
            </div>
            <div>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                hidden={true}
                onChange={(e) => {
                  if (e.target.files.length !== 0) {
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    var url = reader.readAsDataURL(file);
                    reader.onloadend = function () {
                      setAvatar(reader.result);
                    }.bind(this);
                    setNewAvatar(true);
                  }
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <div>
              <Button
                color="primary"
                onClick={() => setChangePassword(!changePassword)}
              >
                Change password
              </Button>
            </div>
          </Col>
          <Dialog open={changePassword}>
            <DialogTitle>Create new password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To change your password, please enter your current password
                here. And enter new your password then confirm.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="current_pass"
                label="Current Password"
                type="password"
                onChange={handleOnChange}
                error={error.old}
                helperText={error.message_old}
                fullWidth
              />
              <TextField
                autoFocus
                name="new_pass"
                margin="dense"
                label="New Password"
                type="password"
                error={error.new}
                helperText={error.message_new}
                onChange={handleOnChange}
                fullWidth
              />
              <TextField
                autoFocus
                name="confirm_pass"
                margin="dense"
                label="Confirm Password"
                type="password"
                error={error.confirm_new}
                helperText={error.message_confirm}
                onChange={handleOnChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                onClick={() => setChangePassword(!changePassword)}
              >
                Cancel
              </Button>
              <Button color="primary" onClick={handleChangePassword}>
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={newAvater}>
            <DialogTitle>
              Confirm your new profile picture
              <Icon.AiOutlineClose
                style={{ cursor: "pointer", float: "right" }}
                onClick={() => {
                  setAvatar("");
                  setNewAvatar(false);
                }}
              />
            </DialogTitle>
            <DialogContent>
              <img
                src={avatar}
                style={{ borderRadius: "50%" }}
                alt=""
                width="400px"
                height="400px"
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={handleNewAvatar}
              >
                Set new profile picture
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </main>
    </div>
  );
}
export default Profile;
