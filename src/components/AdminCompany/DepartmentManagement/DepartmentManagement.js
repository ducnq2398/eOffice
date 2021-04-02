import { forwardRef, useEffect, useState } from "react";
import { Container, Col, Row, Label, Table } from "reactstrap";
import "../../../css/Department.css";
import departmentAPI from "../../../api/departmentAPI";
import { getUser } from "../../../utils/Common";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from "moment";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import * as Icon from "react-icons/ai";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TablePagination from "@material-ui/core/TablePagination";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Slide,
  TextField,
} from "@material-ui/core";
import Navbar from "../../Navbar/Navbar";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));
function DepartmentManagerment() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [openEditDepart, setOpenEditDepart] = useState(false);
  const [openEditSubDepart, setOpenEditSubDepart] = useState(false);
  const [listChild, setListChild] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  const [child_department, setChild_Department] = useState("");
  const [departmentID, setDepartmentID] = useState([]);
  const [sub_departmentID, setSub_DepartmentID] = useState([]);
  const [page, setPage] = useState(0);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage] = useState(10);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfLastPost2 = (page2 + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const indexOfFirstPost2 = indexOfLastPost2 - rowsPerPage;
  const currentPosts = listDepartment.slice(indexOfFirstPost, indexOfLastPost);
  const currentPosts2 = listChild.slice(indexOfFirstPost2, indexOfLastPost2);
  const [error, setError] = useState({
    depart: false,
    subdepart: false,
    message_depart: "",
    message_subdepart: "",
  });
  function changePage(event, newPage) {
    setPage(newPage);
    setListChild([]);
  }
  function changePage2(event, newPage) {
    setPage2(newPage);
  }
  function toogle() {
    setIsOpen(!isOpen);
  }
  function toogle2() {
    setIsOpen2(!isOpen2);
  }
  useEffect(() => {
    async function getDepartment() {
      const id = getUser().CompanyId;
      try {
        const response = await departmentAPI.getDepartmentByCompanyId(id);
        setListDepartment(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDepartment();
  }, []);
  function getChildDepartment(id) {
    departmentAPI
      .getSubDepartment(id)
      .then(function (res) {
        setListChild(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function addDepartment(e) {
    e.preventDefault();
    if (department.trim() === "") {
      setError({
        ...error,
        depart: true,
        message_depart: "Department name must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          depart: false,
          message_depart: "",
        });
      }, 3000);
    } else if (department.trim().length > 255) {
      setError({
        ...error,
        depart: true,
        message_depart: "Department name can not larger 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          depart: false,
          message_depart: "",
        });
      }, 3000);
    } else {
      const params = {
        name: department,
        companyId: getUser().CompanyId,
        creatorId: getUser().Id,
        dateCreate: Moment(new Date()).format(
          "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
        ),
        status: 1,
      };
      departmentAPI
        .addDepartment(params)
        .then(function () {
          toast.success("Add department successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          setError({
            ...error,
            depart: true,
            message_depart: "Department name already exists",
          });
          setTimeout(() => {
            setError({
              ...error,
              depart: false,
              message_depart: "",
            });
          }, 3000);
        });
    }
  }
  function addSubDepartment(e) {
    e.preventDefault();
    if (child_department.trim() === "") {
      setError({
        ...error,
        subdepart: true,
        message_subdepart: "Child department name must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          subdepart: false,
          message_subdepart: "",
        });
      }, 3000);
    } else if (child_department.trim().length > 255) {
      setError({
        ...error,
        subdepart: true,
        message_subdepart:
          "Child department name can not larger 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          subdepart: false,
          message_subdepart: "",
        });
      }, 3000);
    } else {
      const params = {
        name: child_department,
        departmentId: departmentID.id,
        companyId: getUser().CompanyId,
        creatorId: getUser().Id,
        dateCreate: Moment(new Date()).format(
          "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
        ),
        status: 1,
      };
      departmentAPI
        .addSubDepartment(params)
        .then(function () {
          toast.success("Add child department successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          window.location.reload();
        })
        .catch(function (error) {
          setError({
            ...error,
            subdepart: true,
            message_subdepart: "Child department name already exists",
          });
          setTimeout(() => {
            setError({
              ...error,
              subdepart: false,
              message_subdepart: "",
            });
          }, 3000);
        });
    }
  }
  function editDepartment(e) {
    e.preventDefault();
    if (department.trim() === "") {
      setError({
        ...error,
        depart: true,
        message_depart: "Department name must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          depart: false,
          message_depart: "",
        });
      }, 3000);
    } else if (department.trim().length > 255) {
      setError({
        ...error,
        depart: true,
        message_depart: "Department name can not larger 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          depart: false,
          message_depart: "",
        });
      }, 3000);
    } else {
      const params = {
        id: departmentID.id,
        name: department,
        companyId: getUser().CompanyId,
        creatorId: getUser().Id,
        dateCreate: Moment(new Date()).format(
          "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
        ),
        status: 1,
      };
      departmentAPI
        .editDepartmentById(params)
        .then(function () {
          toast.success("Update department successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          setError({
            ...error,
            depart: true,
            message_depart: "Department name already exists",
          });
          setTimeout(() => {
            setError({
              ...error,
              depart: false,
              message_depart: "",
            });
          }, 3000);
        });
    }
  }
  function editSubDepartment(e) {
    e.preventDefault();
    if (child_department.trim() === "") {
      setError({
        ...error,
        subdepart: true,
        message_subdepart: "Department name must not empty",
      });
      setTimeout(() => {
        setError({
          ...error,
          subdepart: false,
          message_subdepart: "",
        });
      }, 3000);
    } else if (child_department.trim().length > 255) {
      setError({
        ...error,
        subdepart: true,
        message_subdepart: "Department name can not larger 255 characters",
      });
      setTimeout(() => {
        setError({
          ...error,
          subdepart: false,
          message_subdepart: "",
        });
      }, 3000);
    } else {
      const params = {
        id: sub_departmentID.id,
        name: child_department,
        departmentId: sub_departmentID.departmentId,
        companyId: getUser().CompanyId,
        creatorId: getUser().Id,
        dateCreate: Moment(new Date()).format(
          "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
        ),
        status: 1,
      };
      departmentAPI
        .editSubDepartmentById(params)
        .then(function () {
          toast.success("Update child department successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          setError({
            ...error,
            subdepart: true,
            message_subdepart: "Child department name already exists",
          });
          setTimeout(() => {
            setError({
              ...error,
              subdepart: false,
              message_subdepart: "",
            });
          }, 3000);
        });
    }
  }
  function deleteSubDepartment(e) {
    e.preventDefault();
    departmentAPI
      .deactiveSubDepartment(departmentID.id)
      .then(function () {
        departmentAPI
          .deleteSubDepartmentById(departmentID.id)
          .then(function () {
            toast.success("Delete child department successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            window.location.reload();
          })
          .catch(function (error) {
            toast.error("You can not delete child department", {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteDepartment() {
    departmentAPI
      .deactiveDepartment(departmentID.id)
      .then(function () {
        departmentAPI
          .deleteDepartmentById(departmentID.id)
          .then(function () {
            toast.success("Delete department successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            window.location.reload();
          })
          .catch(function (error) {
            toast.error("You can not delete department", {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log(error);
          });
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
        <div className="header-bg">
          <span className="mask bg-gradient-default opacity-8"></span>
          <div>
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
                position: "relative",
              }}
            >
              DEPARTMENT MANAGER
            </Label>
          </div>
          <Container fluid className="d-flex1 align-items-center">
            <Row>
              <Col md={10} lg={7}>
                <h1 className="display-2 text-white">Hello {getUser().Name}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your management department page. You can add new
                  department or child department, delete department. But you
                  cannot delete the department containing the staff
                </p>
                <Button
                  style={{ float: "left" }}
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  onClick={toogle}
                >
                  Add new
                </Button>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row style={{ position: "relative" }}>
              <Paper
                style={{
                  width: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <List
                  className={classes.root}
                  subheader={
                    <ListSubheader component="div">Department</ListSubheader>
                  }
                >
                  {listDepartment.map((row) => {
                    return (
                      <ListItem button>
                        <ListItemText
                          onClick={(event) => {
                            event.preventDefault();
                            getChildDepartment(row.id);
                            setIsOpen5(!isOpen5);
                          }}
                        >
                          {row.name}
                        </ListItemText>
                        <ListItemIcon>
                          <AddIcon
                            color="primary"
                            onClick={() => {
                              toogle2();
                              setDepartmentID(row);
                            }}
                          />
                        </ListItemIcon>
                        <ListItemIcon>
                          <EditIcon
                            color="primary"
                            onClick={() => {
                              setOpenEditDepart(true);
                              setDepartmentID(row);
                              setDepartment(row.name);
                            }}
                          />
                        </ListItemIcon>
                        <ListItemIcon>
                          <DeleteForeverIcon
                            color="primary"
                            onClick={() => {
                              setIsOpen4(true);
                              setDepartmentID(row);
                            }}
                          />
                        </ListItemIcon>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Row>
            <Dialog
              open={isOpen5}
              fullWidth
              disableBackdropClick
              disableEscapeKeyDown
            >
              <DialogTitle>
                Child Department
                <Icon.AiOutlineClose
                  style={{ cursor: "pointer", float: "right" }}
                  onClick={() => {
                    setIsOpen5(false);
                  }}
                />
              </DialogTitle>
              <DialogContent>
                <TablePagination
                  component="div"
                  count={listChild.length}
                  page={page2}
                  onChangePage={changePage2}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage=""
                  rowsPerPageOptions={[]}
                />
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>Name</th>
                      <th>Date Modify</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts2.map((row, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ textAlign: "left" }} className="demo-2">
                            {row.name}
                          </td>
                          <td>
                            {moment(row.dateModify).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </td>
                          <td>
                            <Button
                              color="primary"
                              startIcon={<EditIcon />}
                              style={{
                                minWidth: 20,
                                position: "absolute",
                                right: 50,
                              }}
                              onClick={() => {
                                setSub_DepartmentID(row);
                                setOpenEditSubDepart(true);
                                setChild_Department(row.name);
                              }}
                            />
                            <Button
                              color="primary"
                              startIcon={<DeleteForeverIcon />}
                              style={{
                                minWidth: 20,
                                position: "absolute",
                                right: 10,
                              }}
                              onClick={() => {
                                setDepartmentID(row);
                                setIsOpen3(!isOpen3);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </DialogContent>
            </Dialog>
          </Container>
        </div>
        <Dialog
          onClose={toogle}
          open={isOpen}
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="form-dialog-title">Department</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter new department name ...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Department name"
              type="text"
              fullWidth
              error={error.depart}
              helperText={error.message_depart}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={toogle}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={addDepartment}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditDepart}
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="form-dialog-title">Department</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Department name"
              type="text"
              fullWidth
              value={department}
              error={error.depart}
              helperText={error.message_depart}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenEditDepart(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={editDepartment}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
          onClose={toogle2}
          open={isOpen2}
        >
          <DialogTitle id="form-dialog-title">Child Department</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter new child department name ...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Child department name"
              type="text"
              fullWidth
              error={error.subdepart}
              helperText={error.message_subdepart}
              onChange={(e) => setChild_Department(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={toogle2}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addSubDepartment}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditSubDepart}
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="form-dialog-title">Child Department</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Department name"
              type="text"
              fullWidth
              value={child_department}
              error={error.subdepart}
              helperText={error.message_subdepart}
              onChange={(e) => setChild_Department(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenEditSubDepart(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={editSubDepartment}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isOpen4}
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
        >
          <DialogTitle>{"Are you sure delete?"}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => setIsOpen4(false)}
              color="secondary"
              variant="contained"
            >
              No
            </Button>
            <Button
              onClick={deleteDepartment}
              color="primary"
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isOpen3}
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
        >
          <DialogTitle>{"Are you sure delete?"}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => setIsOpen3(false)}
              color="secondary"
              variant="contained"
            >
              No
            </Button>
            <Button
              onClick={deleteSubDepartment}
              color="primary"
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}
export default DepartmentManagerment;
