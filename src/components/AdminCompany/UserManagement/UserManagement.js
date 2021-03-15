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
import Header from "../../Nav/Header";
import TablePagination from "@material-ui/core/TablePagination";
import Sidebar from "../../Sidebar/Sidebar";
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
import DeleteIcon from "@material-ui/icons/Delete";
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
import { InputAdornment } from "@material-ui/core";
import Moment from "moment";
import md5 from "md5";

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
    message_name: "",
    message_phone: "",
    message_email: "",
    message_depart: "",
    message_subdepart: "",
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
      const user = getUser();
      const id = user.CompanyId;
      try {
        const res = await departmentAPI.getDepartmentByCompanyId(id);
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
        name: true,
        message_name: "Please input user name",
      });
      setTimeout(() => {
        setError({
          ...error,
          name: false,
          message_name: "",
        });
      }, 5000);
    } else if (user.username.length > 255) {
      setError({
        ...error,
        name: true,
        message_name: "User name max length 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          name: false,
          message_name: "",
        });
      }, 5000);
    } else if (!user.phone.trim().match("^[0-9]{10}$")) {
      setError({
        ...error,
        phone: true,
        message_phone: "Phone number is incorrect",
      });
      setTimeout(() => {
        setError({
          ...error,
          phone: false,
          message_phone: "",
        });
      }, 5000);
    } else if (user.department === "") {
      setError({
        ...error,
        depart: true,
        message_depart: "Select department",
      });
      setTimeout(() => {
        setError({
          ...error,
          depart: false,
          message_depart: "",
        });
      }, 5000);
    } else if (user.subdepartment === "") {
      setError({
        ...error,
        subdepart: true,
        message_subdepart: "Select sub department",
      });
      setTimeout(() => {
        setError({
          ...error,
          subdepart: false,
          message_subdepart: "",
        });
      }, 5000);
    } else if (!pattern.test(user.email) || user.email.trim() === "") {
      setError({
        ...error,
        email: true,
        message_email: "Email is incorrect",
      });
      setTimeout(() => {
        setError({
          ...error,
          email: false,
          message_email: "",
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
        .then(function (res) {
          add();
          setValue(1);
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
              phone: true,
              message_phone: "Phone number is already exists",
            });
            setTimeout(() => {
              setError({
                ...error,
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
              email: true,
              message_email: "Phone number is already exists",
            });
            setTimeout(() => {
              setError({
                ...error,
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
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (detail.username.trim() === "") {
      setError({
        ...error,
        name: true,
        message_name: "Please input user name",
      });
      setTimeout(() => {
        setError({
          ...error,
          name: false,
          message_name: "",
        });
      }, 5000);
    } else if (!detail.phone.trim().match("^[0-9]{10}$")) {
      setError({
        ...error,
        phone: true,
        message_phone: "Phone number is incorrect",
      });
      setTimeout(() => {
        setError({
          ...error,
          phone: false,
          message_phone: "",
        });
      }, 5000);
    } else if (detail.department === "") {
      setError({
        ...error,
        depart: true,
        message_depart: "Select department",
      });
      setTimeout(() => {
        setError({
          ...error,
          depart: false,
          message_depart: "",
        });
      }, 5000);
    } else if (detail.subdepartment === "") {
      setError({
        ...error,
        subdepart: true,
        message_subdepart: "Select sub department",
      });
      setTimeout(() => {
        setError({
          ...error,
          subdepart: false,
          message_subdepart: "",
        });
      }, 5000);
    } else if (!pattern.test(detail.email) || detail.email.trim() === "") {
      setError({
        ...error,
        email: true,
        message_email: "Email is incorrect",
      });
      setTimeout(() => {
        setError({
          ...error,
          email: false,
          message_email: "",
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
                edit();
                setValue(1);
                activeList();
                toast.success("You has updated user successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            userListAPI.deActiveUser(res.data.id).then(() => {
              edit();
              setValue(1);
              activeList();
              toast.success("You has updated user successfully", {
                position: toast.POSITION.TOP_CENTER,
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error.response.data.Message);
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
  return (
    <div>
      <Sidebar />
      <div className="main-panel1">
        <Header />
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
              </FormControl>
              <FormControl
                variant="outlined"
                style={{ marginLeft: "10px", width: "270px" }}
              >
                <InputLabel id="demo">Sub Department</InputLabel>
                <Select
                  name="subdepartment"
                  value={user.subdepartment}
                  onChange={handleOnInput}
                  label="Sub Department"
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
              </FormControl>
            </DialogContent>
            <DialogContent>
              <TextField
                error={error.email}
                helperText={error.message_email}
                label="Email"
                value={user.email}
                name="email"
                type="email"
                required
                variant="outlined"
                onChange={handleOnInput}
                style={{ width: "270px" }}
              />
              <TextField
                error={false}
                label="Address"
                value={user.address}
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
                  <Paper square style={{ position: "absolute", right: 0 }}>
                    <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={handleChange}
                    >
                      <Tab value={1} onClick={activeList} label="Active" />
                      <Tab value={0} onClick={deActiveList} label="Deactive" />
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
          </div>
          {loading ? (
            <ScaleLoader color={"#2512DF"} loading={loading} size={35} />
          ) : (
            <Table hidden={search !== "" ? true : false} hover>
              <thead>
                <tr>
                  <th>Account name</th>
                  <th>Department</th>
                  <th>Phone number</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((user) => (
                  <tr key={user.id} className="row_data">
                    <td
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
                    <td hidden={user.status === 1 ? true : false}>
                      <DeleteIcon class="hide" onClick={() => setDel(!del)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Table hidden={search === "" ? true : false} hover>
            <thead>
              <tr>
                <th>Account name</th>
                <th>Department</th>
                <th>Phone number</th>
                <th>Email</th>
                <th></th>
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
                    <td hidden={user.status === 1 ? true : false}>
                      <DeleteIcon class="hide" onClick={() => setDel(true)} />
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
                error={error.name}
                helperText={error.message_name}
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
                error={error.phone}
                helperText={error.message_phone}
                value={detail.phone}
                label="User phone number"
                name="phone"
                type="phone"
                variant="outlined"
                required
                onChange={handleOnDetail}
                style={{ marginLeft: "10px", width: "270px" }}
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
                  error={error.subdepart}
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
                error={error.email}
                helperText={error.message_email}
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
                error={false}
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
                color="secondary"
                onClick={() => {
                  setDel(!del);
                }}
              >
                No
              </Button>{" "}
              <Button color="primary">Yes</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default UserManagement;
