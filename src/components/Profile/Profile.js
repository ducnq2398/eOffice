import {
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
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
import EditIcon from "@material-ui/icons/Edit";
import BusinessIcon from "@material-ui/icons/Business";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import md5 from "md5";
import userListAPI from "../../api/userListAPI";
import * as Icon from "react-icons/ai";
import { toast } from "react-toastify";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Profile() {
  const history = useHistory();
  const classes = useStyles();
  const [process, setProcess] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [childDepartment, setChildDepartment] = useState("");
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
  const [userProfile, setUserProfile] = useState({
    username: "",
    address: "",
  });
  const [open, setOpen] = useState(false);
  const [newAvater, setNewAvatar] = useState(false);
  const [error1, setError1] = useState(true);
  const [error2, setError2] = useState(true);
  const [error3, setError3] = useState({
    1: true,
    2: true,
    3: true,
  });
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
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
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
        message_new: "Password must be at least 8 characters, 1 upper case",
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
          toast.success("Change password successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setChangePassword(false);
          setTimeout(() => {
            removeUserSession();
            history.push("/");
          }, 5000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    async function fetCompany() {
      try {
        const response = await companyListAPI.getCompanyById(
          getUser().CompanyId
        );
        setCompany(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetCompany();
  }, []);

  useEffect(() => {
    async function fetDepartment() {
      try {
        const response = await departmentAPI.getDepartmentById(
          getUser().DepartmentId
        );
        setDepartment(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetDepartment();
  }, []);

  useEffect(() => {
    async function fetSubDepartment() {
      try {
        const response = await departmentAPI.getSubDepartmentById(
          getUser().SubDepartmentId
        );
        setChildDepartment(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetSubDepartment();
  }, []);

  function handleNewAvatar(e) {
    setProcess(!process);
    setNewAvatar(!newAvater);
    e.preventDefault();
    const url = avatar.substring(23);
    const params = {
      id: getUser().Id,
      avatar: url,
      password: oldPass,
      phone: getUser().Phone,
      address: getUser().Address,
      subDepartmentId: getUser().SubDepartmentId,
      departmentId: getUser().DepartmentId,
      status: 1,
    };
    userListAPI
      .changeAvatar(params)
      .then(function () {
        toast.success("Update avatar successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [a, setA] = useState("");
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        resolve(base64data);
        setA(base64data);
      };
    });
  };
  getBase64FromUrl(user1.avatar);
  function handleEdit(e) {
    e.preventDefault();
    if (userProfile.address.trim().length > 255) {
      setError3({
        ...error3,
        3: false,
      });
      setTimeout(() => {
        setError3({
          ...error3,
          3: true,
        });
      });
    } else {
      setProcess(!process);
      setOpen(!open);
      const params = {
        id: getUser().Id,
        password: oldPass,
        avatar: a.substring(37),
        phone: getUser().Phone,
        address: userProfile.address,
        subDepartmentId: getUser().SubDepartmentId,
        departmentId: getUser().DepartmentId,
        status: 1,
      };
      userListAPI
        .updateUser(params)
        .then(function () {
          toast.success("Update profile successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main-panel" style={{ backgroundColor: "#e8e7e7" }}>
        <div className="avatar-col">
          <Label
            style={{
              float: "left",
              fontWeight: "bolder",
              color: "white",
              marginTop: 20,
              marginLeft: 20,
              border: "1px solid #ffff",
              borderRadius: "25px",
              padding: 10,
            }}
          >
            USER PROFILE
          </Label>
        </div>
        <Container fluid>
          <Col style={{ top: "-100px" }}>
            <div>
              <img
                src={user1.avatar}
                alt="avatar"
                style={{ borderRadius: "50%" }}
                className="avt"
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
                    if (
                      e.target.files[0].type !== "image/jpeg" &&
                      e.target.files[0].type !== "image/png" &&
                      e.target.files[0].type !== "image/jpg"
                    ) {
                      setError1(false);
                      setTimeout(() => {
                        setError1(true);
                      }, 3000);
                    } else if (e.target.files[0].size > 31457280) {
                      setError2(false);
                      setTimeout(() => {
                        setError2(true);
                      }, 3000);
                    } else {
                      var file = e.target.files[0];
                      var reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = function () {
                        setAvatar(reader.result);
                      }.bind(this);
                      setNewAvatar(true);
                    }
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
              <div hidden={error1} style={{ color: "red" }}>
                We only support PNG or JPG pictures.
              </div>
              <div hidden={error2} style={{ color: "red" }}>
                We don't support image larger 30MB .
              </div>
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
          <Row>
            <Col xl={8} style={{ top: "-100px" }}>
              <Card>
                <CardHeader
                  style={{ padding: "1.25rem 1.5rem", marginBottom: 0 }}
                >
                  <Row>
                    <Col xs={8}>
                      <h5 className="mb-0">My account</h5>
                    </Col>
                    <Col xs={4} className="text-right">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        style={{ float: "right" }}
                        size="small"
                        onClick={() => setOpen(true)}
                      >
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg={6}>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label
                              className="form-control-label"
                              for="input-username"
                            >
                              Account name
                            </Label>
                            <input
                              id="input-username"
                              name="username"
                              placeholder="Username"
                              type="text"
                              className="form-control1-alternative form-control1"
                              value={getUser().Name}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label
                              className="form-control-label"
                              for="input-email"
                            >
                              Email
                            </Label>
                            <input
                              id="input-email"
                              placeholder="Email"
                              type="email"
                              className="form-control1-alternative form-control1"
                              value={getUser().Email}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label
                              className="form-control-label"
                              for="input-department"
                            >
                              Department
                            </Label>
                            <input
                              id="input-department"
                              placeholder="Department"
                              type="text"
                              className="form-control1-alternative form-control1"
                              value={department.name}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label
                              className="form-control-label"
                              for="input-username"
                            >
                              Child Department
                            </Label>
                            <input
                              id="input-username"
                              placeholder="Child Department"
                              type="text"
                              className="form-control1-alternative form-control1"
                              value={childDepartment.name}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg={6}>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label
                              className="form-control-label"
                              for="input-phone"
                            >
                              Phone number
                            </Label>
                            <input
                              id="input-phone"
                              placeholder="Phone number"
                              type="tel"
                              className="form-control1-alternative form-control1"
                              value={getUser().Phone}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup style={{ textAlign: "left" }}>
                            <Label
                              className="form-control-label"
                              for="input-address"
                            >
                              Address
                            </Label>
                            <input
                              name="address"
                              onChange={(e) =>
                                setUserProfile({
                                  ...userProfile,
                                  address: e.target.value,
                                })
                              }
                              id="input-address"
                              placeholder="Address"
                              type="text"
                              className="form-control1-alternative form-control1"
                              defaultValue={user1.address}
                            />
                            <div hidden={error3[3]} style={{ color: "red" }}>
                              Address must not larger 255 characters
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} style={{ top: "-100px" }}>
              <Card>
                <CardHeader
                  style={{ padding: "1.25rem 1.5rem", marginBottom: 0 }}
                >
                  <Row>
                    <Col>
                      <BusinessIcon color="primary" fontSize="large" />
                      <h5>{company.name}</h5>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Company information
                    </h6>
                    <Row>
                      <Col>
                        <FormGroup style={{ textAlign: "left" }}>
                          <Label
                            className="form-control-label"
                            for="input-address"
                          >
                            Address
                          </Label>
                          <input
                            id="input-address"
                            placeholder="Address"
                            type="text"
                            className="form-control1-alternative form-control1"
                            value={company.address}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
                variant="contained"
                onClick={() => setChangePassword(!changePassword)}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleChangePassword}
              >
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
                className="new-avt"
                src={avatar}
                style={{ borderRadius: "50%" }}
                alt=""
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
          <Dialog open={open} fullWidth>
            <DialogTitle>Are you want update profile?</DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleEdit}
                color="primary"
                autoFocus
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </main>
      <Backdrop className={classes.backdrop} open={process}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Profile;
