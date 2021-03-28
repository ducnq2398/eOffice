import { forwardRef, useEffect, useState } from "react";
import {
  FormGroup,
  Col,
  Table,
  Modal,
  ModalHeader,
  Container,
  ModalFooter,
  Row,
} from "reactstrap";
import userListAPI from "../../../api/userListAPI";
import TablePagination from "@material-ui/core/TablePagination";
import "./../../../css/UserManagement.css";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import { getUser } from "../../../utils/Common";
import GetDepartment from "../../GetData/GetDepartment";
import Switch from "@material-ui/core/Switch";
import departmentAPI from "../../../api/departmentAPI";
import ScaleLoader from "react-spinners/ScaleLoader";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {
  DialogContentText,
  FormHelperText,
  InputAdornment,
} from "@material-ui/core";
import Moment from "moment";
import md5 from "md5";
import Navbar from "../../Navbar/Navbar";
import { CSVLink } from "react-csv";
import * as Icon from "react-icons/bi";

const TransitionAdd = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const TransitionDetail = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function UserManagement() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listActive, setListActive] = useState([]);
  const [listDeactive, setListDeactive] = useState([]);
  const [postList, setPostList] = useState([]);
  const [department, setDepartment] = useState([]);
  const [subdepartment, setSubDepartment] = useState([]);
  const [subdepartment2, setSubDepartment2] = useState([]);
  const [checkAcitve, setCheckActive] = useState(true);
  const [user, setUser] = useState({
    username: "",
    department: "",
    subdepartment: "",
    phone: "",
    email: "",
    address: "",
  });
  const [detail, setDetail] = useState({
    id: "",
    username: "",
    department: "",
    subdepartment: "",
    phone: "",
    email: "",
    address: "",
    status: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);
  const add = () => setIsOpen(!isOpen);
  const [openEdit, setOpenEdit] = useState(false);
  const edit = () => setOpenEdit(!openEdit);
  const [search, setSearch] = useState("");
  const [error, setError] = useState({
    name: false,
    phone: false,
    email: false,
    depart: false,
    subdepart: false,
    address: false,
    loi: false,
    message_name: "",
    message_phone: "",
    message_email: "",
    message_depart: "",
    message_subdepart: "",
    message_address: "",
  });
  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await userListAPI.getUserByCompanyId(
          getUser().CompanyId
        );
        var list = response.data
          .sort((a, b) => {
            return (
              new Date(a.dateCreate).getTime() -
              new Date(b.dateCreate).getTime()
            );
          })
          .reverse();
        setUserList(list);
        setListActive(
          list.filter((data) => {
            if (data.status === 1) {
              return data;
            }
          })
        );
        setListDeactive(
          list.filter((data) => {
            if (data.status === 0) {
              return data;
            }
          })
        );
        setPostList(
          list.filter((data) => {
            if (data.status === 1) {
              return data;
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    fetchUserList();
  }, []);

  useEffect(() => {
    async function getDepartment() {
      try {
        const res = await departmentAPI.getDepartmentByCompanyId(
          getUser().CompanyId
        );
        setDepartment(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDepartment();
  }, []);

  useEffect(() => {
    async function getSubDepartment() {
      try {
        const res = await departmentAPI.getSubDepartment(user.department);
        setSubDepartment(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubDepartment();
  }, [user.department]);

  useEffect(() => {
    async function getSubDepartment() {
      try {
        const res = await departmentAPI.getSubDepartment(detail.department);
        setSubDepartment2(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubDepartment();
  }, [detail.department]);

  function handleOnInput(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setUser({
      ...user,
      [name]: value,
    });
  }
  function handleOnDetail(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setDetail({
      ...detail,
      [name]: value,
    });
  }

  function addUser(event) {
    event.preventDefault();
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (user.username.trim() === "") {
      setError({
        ...error,
        loi: true,
        name: true,
        message_name: "User name must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          name: false,
          message_name: "",
        });
      }, 5000);
    } else if (user.username.length > 255) {
      setError({
        ...error,
        loi: true,
        name: true,
        message_name: "User name max length 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          name: false,
          message_name: "",
        });
      }, 5000);
    } else if (user.phone.trim() === "") {
      setError({
        ...error,
        loi: true,
        phone: true,
        message_phone: "Phone number must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          phone: false,
          message_phone: "",
        });
      }, 5000);
    } else if (!user.phone.trim().match("^[0-9]{10}$")) {
      setError({
        ...error,
        loi: true,
        phone: true,
        message_phone: "Phone number is incorrect",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          phone: false,
          message_phone: "",
        });
      }, 5000);
    } else if (user.department === "") {
      setError({
        ...error,
        loi: true,
        depart: true,
        message_depart: "Please choose one department",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          depart: false,
          message_depart: "",
        });
      }, 5000);
    } else if (user.subdepartment === "") {
      setError({
        ...error,
        loi: true,
        subdepart: true,
        message_subdepart: "Please choose one child department",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          subdepart: false,
          message_subdepart: "",
        });
      }, 5000);
    } else if (user.email.trim() === "") {
      setError({
        ...error,
        loi: true,
        email: true,
        message_email: "Email must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          email: false,
          message_email: "",
        });
      }, 5000);
    } else if (!pattern.test(user.email)) {
      setError({
        ...error,
        loi: true,
        email: true,
        message_email: "Email is incorrect",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          email: false,
          message_email: "",
        });
      }, 5000);
    } else if (user.address.length > 255) {
      setError({
        ...error,
        loi: true,
        address: true,
        message_address: "Address length must not larger 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          address: false,
          message_address: "",
        });
      }, 5000);
    } else {
      const tel = "+84" + user.phone.substring(1);
      const params = {
        name: user.username,
        avatar: "",
        email: user.email,
        password: md5("123Aabc").trim().toString(),
        phone: tel,
        address: user.address,
        dateCreate: Moment(new Date()).format(
          "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
        ),
        creatorId: getUser().Id,
        subDepartmentId: user.subdepartment,
        departmentId: user.department,
        companyId: getUser().CompanyId,
        role: "2",
        status: 1,
      };
      userListAPI
        .addUser(params)
        .then(function () {
          window.location.reload();
          setUser({
            username: "",
            department: "",
            subdepartment: "",
            phone: "",
            email: "",
            address: "",
          });
          toast.success("You has created user successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch(function (error) {
          if (
            error.response.data.Message ===
            "The user with the provided phone number already exists (PHONE_NUMBER_EXISTS)."
          ) {
            setError({
              ...error,
              loi: true,
              phone: true,
              message_phone: "Phone number is already exists",
            });
            setTimeout(() => {
              setError({
                ...error,
                loi: false,
                phone: false,
                message_phone: "",
              });
            }, 5000);
          } else if (
            error.response.data.Message ===
            "The user with the provided email already exists (EMAIL_EXISTS)."
          ) {
            setError({
              ...error,
              loi: true,
              email: true,
              message_email: "Email is already exists",
            });
            setTimeout(() => {
              setError({
                ...error,
                loi: false,
                email: false,
                message_email: "",
              });
            }, 5000);
          }
          console.log(error);
        });
    }
  }
  function updateUser(event) {
    event.preventDefault();
    if (detail.department === "") {
      setError({
        ...error,
        loi: true,
        depart: true,
        message: "Please choose one department",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          depart: false,
          message: "",
        });
      }, 5000);
    } else if (detail.subdepartment === "") {
      setError({
        ...error,
        loi: true,
        subdepart: true,
        message: "Please choose one child department",
      });
      setTimeout(() => {
        setError({
          ...error,
          loi: false,
          subdepart: false,
          message: "",
        });
      }, 5000);
    } else {
      const tel = "+84" + detail.phone.substring(1);
      const params = {
        id: detail.id,
        name: detail.username,
        avatar: "",
        email: detail.email,
        phone: tel,
        address: detail.address,
        dateCreate: Moment(new Date()).format("DD/MM/YYYY"),
        creatorId: getUser().Id,
        subDepartmentId: detail.subdepartment,
        departmentId: detail.department,
        companyId: getUser().CompanyId,
        role: "2",
      };
      userListAPI
        .updateUser(params)
        .then(function (res) {
          if (detail.status === 1) {
            userListAPI
              .activeUser(res.data.id)
              .then(() => {
                window.location.reload();
                toast.success("You has updated user successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            userListAPI.deActiveUser(res.data.id).then(() => {
              window.location.reload();
              toast.success("You has updated user successfully", {
                position: toast.POSITION.TOP_CENTER,
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  function changePage(event, newPage) {
    setPage(newPage);
  }
  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function activeList(e) {
    setPage(0);
    setPostList(listActive);
  }
  function deActiveList(e) {
    setPage(0);
    setPostList(listDeactive);
  }

  const data = userList.map((user) => {
    return {
      Account: user.name,
      Email: user.email,
      Phone: user.phone,
      Address: user.address,
    };
  });
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main-panel">
        <Container fluid={true}>
          <Dialog
            open={isOpen}
            onClose={add}
            aria-labelledby="form-dialog-title"
            TransitionComponent={TransitionAdd}
            keepMounted
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Add User</DialogTitle>

            <DialogContent>
              <DialogContentText style={{ color: "red" }}>
                * If a department does not have a child department. Please
                create a child department before adding user
              </DialogContentText>
              <TextField
                error={error.name}
                helperText={error.message_name}
                label="User name"
                value={user.username}
                name="username"
                variant="outlined"
                required
                onChange={handleOnInput}
                style={{ width: "270px" }}
              />
              <TextField
                error={error.phone}
                helperText={error.message_phone}
                value={user.phone}
                label="User phone number"
                name="phone"
                type="phone"
                variant="outlined"
                required
                onChange={handleOnInput}
                style={{ marginLeft: "10px", width: "270px" }}
              />
            </DialogContent>
            <DialogContent>
              <FormControl variant="outlined" style={{ width: "270px" }}>
                <InputLabel id="demo">Department</InputLabel>
                <Select
                  name="department"
                  value={user.department}
                  onChange={handleOnInput}
                  label="Department"
                  error={error.depart}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {department.map((depart) => (
                    <MenuItem key={depart.id} value={depart.id}>
                      {depart.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {error.message_depart}
                </FormHelperText>
              </FormControl>
              <FormControl
                variant="outlined"
                style={{ marginLeft: "10px", width: "270px" }}
              >
                <InputLabel id="demo">Child Department</InputLabel>
                <Select
                  name="subdepartment"
                  value={user.subdepartment}
                  onChange={handleOnInput}
                  label="Child Department"
                  error={error.subdepart}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subdepartment.map((depart) => (
                    <MenuItem key={depart.id} value={depart.id}>
                      {depart.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {error.message_subdepart}
                </FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogContent>
              <TextField
                error={error.email}
                label="Email"
                value={user.email}
                name="email"
                type="email"
                required
                helperText={error.message_email}
                variant="outlined"
                onChange={handleOnInput}
                style={{ width: "270px" }}
              />
              <TextField
                label="Address"
                error={error.address}
                value={user.address}
                helperText={error.message_address}
                name="address"
                variant="outlined"
                onChange={handleOnInput}
                style={{ marginLeft: "10px", width: "270px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setUser({
                    username: "",
                    department: "",
                    subdepartment: "",
                    phone: "",
                    email: "",
                    address: "",
                  });
                  add();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "20px" }}
                onClick={addUser}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
          <div className="form-search">
            <FormGroup row>
              <Button variant="contained" color="primary" onClick={add}>
                +Add user
              </Button>
              <Col>
                <Row>
                  <TextField
                    name="search"
                    variant="outlined"
                    placeholder="Search by account name"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    size="small"
                    fullWidth
                    style={{ marginLeft: "10px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Row>
              </Col>
              <Col>
                <Row>
                  <Paper
                    square
                    elevation={0}
                    style={{ position: "absolute", right: 0 }}
                  >
                    <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={handleChange}
                    >
                      <Tab
                        style={{ fontWeight: "bold" }}
                        value={1}
                        onClick={activeList}
                        label="Active"
                      />
                      <Tab
                        style={{ fontWeight: "bold" }}
                        value={0}
                        onClick={deActiveList}
                        label="Deactive"
                      />
                    </Tabs>
                  </Paper>
                </Row>
                <Row></Row>
              </Col>
            </FormGroup>
            <div hidden={search !== "" ? true : false}>
              <TablePagination
                component="div"
                count={postList.length}
                page={page}
                onChangePage={changePage}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage=""
                rowsPerPageOptions={[]}
              />
            </div>
            <div hidden={search !== "" ? true : false} className="ex">
              <CSVLink filename={"data user.csv"} data={data}>
                Import
                <Icon.BiImport fontSize="25" tableValues="a" />
              </CSVLink>
              <CSVLink
                style={{ marginLeft: 10 }}
                filename={"data user.csv"}
                data={data}
              >
                Export
                <Icon.BiExport fontSize="25" />
              </CSVLink>
            </div>
          </div>
          {loading ? (
            <ScaleLoader color={"#2512DF"} loading={loading} size={35} />
          ) : (
            <Table
              hidden={search !== "" ? true : false}
              hover
              className="tb"
              style={{ textAlign: "left" }}
            >
              <thead>
                <tr>
                  <th>Account name</th>
                  <th>Department</th>
                  <th>Phone number</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((user) => (
                  <tr key={user.id} className="row_data">
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      {user.name}
                    </td>
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      <GetDepartment id={user.departmentId} />
                    </td>
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      {user.phone}
                    </td>
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      {user.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Table
            hidden={search === "" ? true : false}
            hover
            style={{ textAlign: "left" }}
          >
            <thead>
              <tr>
                <th>Account name</th>
                <th>Department</th>
                <th>Phone number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userList
                .filter((users) => {
                  if (users.name.toLowerCase().includes(search.toLowerCase())) {
                    return users;
                  }
                })
                .map((user) => (
                  <tr key={user.id} className="row_data">
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      {user.name}
                    </td>
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      <GetDepartment id={user.departmentId} />
                    </td>
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      {user.phone}
                    </td>
                    <td
                      className="demo-2"
                      onClick={() => {
                        setDetail({
                          id: user.id,
                          username: user.name,
                          phone: "0" + user.phone.substring(3),
                          department: user.departmentId,
                          subdepartment: user.subDepartmentId,
                          email: user.email,
                          address: user.address,
                          status: user.status,
                        });
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                        setOpenEdit(true);
                      }}
                    >
                      {user.email}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Dialog
            open={openEdit}
            TransitionComponent={TransitionDetail}
            keepMounted
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
          >
            <DialogTitle id="form-dialog-title">User Detail</DialogTitle>
            <DialogContent>
              <TextField
                label="User name"
                value={detail.username}
                name="username"
                variant="outlined"
                required
                onChange={handleOnDetail}
                style={{ width: "270px" }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                value={detail.phone}
                label="User phone number"
                name="phone"
                type="phone"
                variant="outlined"
                required
                onChange={handleOnDetail}
                style={{ marginLeft: "10px", width: "270px" }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </DialogContent>
            <DialogContent>
              <FormControl variant="outlined" style={{ width: "270px" }}>
                <InputLabel id="demo">Department</InputLabel>
                <Select
                  name="department"
                  value={detail.department}
                  onChange={handleOnDetail}
                  label="Department"
                  error={error.depart}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {department.map((depart) => (
                    <MenuItem key={depart.id} value={depart.id}>
                      {depart.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                style={{ marginLeft: "10px", width: "270px" }}
              >
                <InputLabel id="demo">Sub Department</InputLabel>
                <Select
                  name="subdepartment"
                  value={detail.subdepartment}
                  onChange={handleOnDetail}
                  label="Sub Department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subdepartment2.map((depart) => (
                    <MenuItem key={depart.id} value={depart.id}>
                      {depart.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogContent>
              <TextField
                label="Email"
                value={detail.email}
                name="email"
                type="email"
                required
                variant="outlined"
                onChange={handleOnDetail}
                style={{ width: "270px" }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Address"
                value={detail.address}
                name="address"
                variant="outlined"
                onChange={handleOnDetail}
                style={{ marginLeft: "10px", width: "270px" }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </DialogContent>
            <DialogContent>
              <span>
                {checkAcitve === true ? (
                  <a style={{ color: "green" }}>Active</a>
                ) : (
                  <a style={{ color: "red" }}>Deactive</a>
                )}
              </span>
              <Switch
                checked={checkAcitve}
                onChange={() => {
                  setCheckActive(!checkAcitve);
                  setDetail({
                    ...detail,
                    status: checkAcitve === true ? 0 : 1,
                  });
                }}
                name="active"
                color="primary"
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setDetail({
                    username: "",
                    phone: "",
                    department: "",
                    subdepartment: "",
                    email: "",
                    address: "",
                    status: "",
                  });
                  edit();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "20px" }}
                onClick={updateUser}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Modal isOpen={del} toggle={() => setDel(!del)}>
            <ModalHeader>Do you want delete user?</ModalHeader>
            <ModalFooter>
              <Button
                variant="contained"
                style={{ marginRight: 5 }}
                color="secondary"
                onClick={() => {
                  setDel(!del);
                }}
              >
                No
              </Button>
              <Button variant="contained" color="primary">
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </main>
    </div>
  );
}

export default UserManagement;
