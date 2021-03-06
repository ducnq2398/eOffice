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

const TransitionAdd = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const TransitionDetail = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function UserManagement() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState([]);
  const [checkAcitve, setCheckActive] = useState(true);
  const [user, setUser] = useState({
    username: "",
    department: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = userList.slice(indexOfFirstPost, indexOfLastPost);
  const add = () => setIsOpen(!isOpen);
  const [openEdit, setOpenEdit] = useState(false);
  const edit = () => setOpenEdit(!openEdit);
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    const user = getUser();
    const id = user.CompanyId;
    async function fetchUserList() {
      try {
        const response = await userListAPI.getUserByCompanyId(id);
        setUserList(response.data);
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

  function handleOnInput(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setUser({
      ...user,
      [name]: value,
    });
  }
  function addUser(event) {
    event.preventDefault();
    var today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    const params = {
      name: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      dateCreate: date,
      creatorId: getUser().Id,
      departmentId: user.department,
      companyId: getUser().CompanyId,
      role: "2",
      status: 1,
    };
    userListAPI
      .addUser(params, {
        header: {
          Authorization: "Bearer" + getUser().IdToken,
        },
      })
      .then(function (res) {
        // history.push('/user-management')
        toast.success("You has created user successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function changePage(event, newPage) {
    setPage(newPage);
  }
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
                label="User name"
                name="username"
                variant="outlined"
                required
                onChange={handleOnInput}
                style={{ width: "270px" }}
              />
              <TextField
                error={false}
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
              <TextField
                error={false}
                label="Email"
                name="email"
                type="email"
                required
                variant="outlined"
                onChange={handleOnInput}
                style={{ marginLeft: "10px", width: "270px" }}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                error={false}
                label="Address"
                name="address"
                variant="outlined"
                onChange={handleOnInput}
                style={{ width: "550px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={add}>
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
                                <SearchIcon color="primary"/>
                            </InputAdornment>
                        )
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
                      <Tab value={1} label="Active" />
                      <Tab value={0} label="Deactive" />
                    </Tabs>
                  </Paper>
                </Row>
                <Row></Row>
              </Col>
            </FormGroup>
            <div hidden={search !== "" ? true : false}>
              <TablePagination
                component="div"
                count={userList.length}
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
                        setData(user);
                        setOpenEdit(true);
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                      }}
                    >
                      {user.name}
                    </td>
                    <td
                      onClick={() => {
                        setData(user);
                        setOpenEdit(true);
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                      }}
                    >
                      <GetDepartment id={user.departmentId} />
                    </td>
                    <td
                      onClick={() => {
                        setData(user);
                        setOpenEdit(true);
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                      }}
                    >
                      {user.phone}
                    </td>
                    <td
                      onClick={() => {
                        setData(user);
                        setOpenEdit(true);
                        if (user.status === 0) {
                          setCheckActive(false);
                        } else {
                          setCheckActive(true);
                        }
                      }}
                    >
                      {user.email}
                    </td>
                    <td>
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
              </tr>
            </thead>
            <tbody>
              {userList
                .filter((users) => {
                  if (users.name.toLowerCase().includes(search.toLowerCase())) {
                    return users;
                  }
                })
                .map((users) => (
                  <tr key={users.id} className="row_data">
                    <td
                      onClick={() => {
                        setData(user);
                        setOpenEdit(true);
                      }}
                    >
                      {users.name}
                    </td>
                    <td
                      onClick={() => {
                        setData(user);
                        setOpenEdit(true);
                      }}
                    >
                      <GetDepartment id={users.departmentId} />
                    </td>
                    <td
                      onClick={() => {
                        setData(user);
                        setOpenEdit(true);
                      }}
                    >
                      {users.phone}
                    </td>
                    <td
                      onClick={() => {
                        setData(user);
                        setOpenEdit(true);
                      }}
                    >
                      {users.email}
                    </td>
                    <td>
                      <DeleteIcon class="hide" onClick={() => setDel(!del)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Dialog
            open={openEdit}
            onClose={edit}
            TransitionComponent={TransitionDetail}
            keepMounted
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
          >
            <DialogTitle>User Detail</DialogTitle>
            <DialogContent>
              <TextField
                label="User name"
                name="username"
                type="text"
                required
                variant="outlined"
                defaultValue={data.name}
                onChange={handleOnInput}
                style={{ width: "270px" }}
              />
              <TextField
                error={false}
                label="User phone number"
                name="phone"
                type="phone"
                defaultValue={data.phone}
                variant="outlined"
                onChange={handleOnInput}
                required
                style={{ marginLeft: "10px", width: "270px" }}
              />
            </DialogContent>
            <DialogContent>
              <FormControl variant="outlined" style={{ width: "270px" }}>
                <InputLabel id="demo">Department</InputLabel>
                <Select
                  name="department"
                  onChange={handleOnInput}
                  label="Department"
                  required
                >
                  <MenuItem value="">
                    <em>
                      <GetDepartment id={data.departmentId} />
                    </em>
                  </MenuItem>
                  {department.map((depart) => (
                    <MenuItem key={depart.id} value={depart.id}>
                      {depart.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                error={false}
                label="Email"
                name="email"
                type="email"
                defaultValue={data.email}
                variant="outlined"
                onChange={handleOnInput}
                required
                style={{ marginLeft: "10px", width: "270px" }}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                error={false}
                label="Address"
                name="address"
                defaultValue={data.address}
                variant="outlined"
                onChange={handleOnInput}
                style={{ width: "550px" }}
                type="text"
                required
              />
            </DialogContent>
            <DialogContent>
              <span>
                {checkAcitve === true ? (
                  <a style={{ color: "green"}}>Active</a>
                ) : (
                  <a style={{ color: "red"}}>Deactive</a>
                )}
              </span>
              <Switch
                checked={checkAcitve}
                onChange={() => setCheckActive(!checkAcitve)}
                name="active"
                color="primary"
              />
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={edit}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "20px" }}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Modal isOpen={del} toggle={() => setDel(!del)}>
            <ModalHeader>Do you want delete user?</ModalHeader>
            <ModalFooter>
              <Button color="secondary" onClick={() => setDel(!del)}>
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
