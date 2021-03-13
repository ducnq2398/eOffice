import { useEffect, useState } from "react";
import {
  Container,
  FormGroup,
  Col,
  Row,
} from "reactstrap";
import Header from "../../Nav/Header";
import Sidebar from "../../Sidebar/Sidebar";
import "../../../css/Department.css";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Autocomplete, createFilterOptions, TreeItem } from "@material-ui/lab";
import departmentAPI from "../../../api/departmentAPI";
import { getUser } from "../../../utils/Common";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Moment from "moment";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import GetSubDepartment from "../../GetData/GetSubDepartment";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";

const filter = createFilterOptions();
function DepartmentManagerment() {
  const [isOpen, setIsOpen] = useState(false);
  const [listDepartment, setListDepartment] = useState([]);
  const [value, setValue] = useState(null);
  const [sub_department, setSubDepartment] = useState(null);
  const [checkDepart, setCheckDepart] = useState({
    error: false,
    message: "",
  });
  const [checkSubDepart, setSubCheckDepart] = useState({
    error: false,
    message: "",
  });

  function toogle() {
    setIsOpen(!isOpen);
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
  }, [isOpen]);

  function addDepartment(e) {
    e.preventDefault();
    if (value === null) {
      setCheckDepart({
        error: true,
        message: "choose one department or input new",
      });
    } else if (value !== Object && value.name.length > 255) {
      setCheckDepart({
        error: true,
        message: "Department name max length 255 characters",
      });
    } else if (sub_department === null) {
      setSubCheckDepart({
        error: true,
        message: "Please input subdepartment",
      });
    } else if (sub_department.length > 255) {
      setSubCheckDepart({
        error: true,
        message: "Subdepartment name max length 255 characters",
      });
    } else if (value !== Object) {
      const params = {
        name: value.name,
        companyId: getUser().CompanyId,
        creatorId: getUser().Id,
        dateCreate: Moment(new Date()).format('yyyy-MM-DD'+'T'+'HH:mm:ss.SSS'+'Z'),
      };
      departmentAPI
        .addDepartment(params)
        .then(function (res) {
          console.log(res.data);
          const params = {
            name: sub_department,
            departmentId: res.data.id,
            companyId: getUser().CompanyId,
            creatorId: getUser().Id,
            dateCreate: Moment(new Date()).format('yyyy-MM-DD'+'T'+'HH:mm:ss.SSS'+'Z'),
          };
          departmentAPI
            .addSubDepartment(params)
            .then(function (res) {
              toast.success("Add department successfully", {
                position: toast.POSITION.TOP_CENTER,
              });
              setIsOpen(false)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const params = {
        name: sub_department,
        departmentId: value.id,
        companyId: getUser().CompanyId,
        creatorId: getUser().Id,
        dateCreate: Moment(new Date()).format('yyyy-MM-DD'+'T'+'HH:mm:ss.SSS'+'Z'),
      };
      departmentAPI
        .addSubDepartment(params)
        .then(function (res) {
          toast.success("Add department successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setIsOpen(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <div>
      <Sidebar />
      <div className="main-panel">
        <Header />
        <Container fluid={true}>
          <div className="add">
            <FormGroup row>
              <Button variant="contained" onClick={toogle} color="primary">
                Add department
              </Button>
            </FormGroup>
          </div>
          <div>
            <TreeView
              className="tree"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {listDepartment.map((department) => (
                <TreeItem
                  key={department.id}
                  nodeId={department.id}
                  label={department.name}
                >
                  <GetSubDepartment id={department.id} />
                </TreeItem>
              ))}
            </TreeView>
          </div>
        </Container>
        <Dialog
          onClose={toogle}
          open={isOpen}
          fullWidth
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle>Add Department</DialogTitle>
          <DialogContent>
            <Row>
              <Col sm={6}>
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setValue({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      setValue({
                        name: newValue.inputValue,
                      });
                    } else {
                      setValue(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== "") {
                      filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={listDepartment}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.name;
                  }}
                  renderOption={(option) => option.name}
                  style={{ width: 260 }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Department"
                      variant="outlined"
                      error={checkDepart.error}
                      helperText={checkDepart.message}
                    />
                  )}
                />
              </Col>
              <Col sm={5}>
                <TextField
                  style={{ width: "250px" }}
                  error={checkSubDepart.error}
                  helperText={checkSubDepart.message}
                  label="Sub Department"
                  name="sub_department"
                  variant="outlined"
                  required
                  onChange={(e) => setSubDepartment(e.target.value)}
                />
              </Col>
            </Row>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setIsOpen(!isOpen)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight: "29px" }}
              onClick={addDepartment}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
export default DepartmentManagerment;
