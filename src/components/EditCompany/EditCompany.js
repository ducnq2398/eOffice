import React, { useEffect, useState } from "react";
import "../../css/EditCompany.css";
import register from "../../images/register.png";
import { Col, Container, Form, Label, Row } from "reactstrap";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import userListAPI from "../../api/userListAPI";
import companyListAPI from "../../api/companyListAPI";
import { toast } from "react-toastify";

function CompanyRegister() {
  const location = useLocation();
  const history = useHistory();
  const [active, setActive] = useState(
    location.state.status === 1 ? "active" : "deactive"
  );
  const [admin, setAdmin] = useState([]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    async function getAdminCompany() {
      try {
        const res = await userListAPI.getUserById(location.state.adminId);
        setAdmin(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAdminCompany();
  }, [location.state.adminId]);
  const handleChange = (event) => {
    setActive(event.target.value);
  };
  function handleUpdate(event) {
    event.preventDefault();
    if (active === "active") {
      companyListAPI
        .activeCompany(location.state.id)
        .then(function () {
          toast.success("Active company successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          history.push("company-list");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (active === "deactive") {
      companyListAPI
        .deactiveCompany(location.state.id)
        .then(function () {
          toast.success("Deactive company successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          history.push("company-list");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <div>
      <SidebarAdmin />
      <div className="main-panel">
        <Container fluid={true}>
          <div>
            <img className="lo1" style={{ marginTop: "20px" }} src={register} alt="" />
          </div>
          <Form
            style={{
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 50,
              textAlign: "left",
            }}
          >
            <Row>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Company Name
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="company_name"
                  required
                  size="small"
                  value={location.state.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Manager Name
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="manager_name"
                  required
                  size="small"
                  value={admin.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Phone Number
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="phone"
                  name="phone"
                  required
                  size="small"
                  value={"0" + location.state.phone.substring(3)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Manager Email
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="manager_email"
                  required
                  size="small"
                  value={admin.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>
                  Street Address
                </Label>
              </Col>
              <Col>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="address"
                  required
                  size="small"
                  value={location.state.address}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col sm={3}>
                <Label style={{ fontSize: 20, color: "blue" }}>Status</Label>
              </Col>
              <Col>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio color="primary" />}
                      label="Active"
                      checked={active === "active"}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      value="deactive"
                      control={<Radio color="primary" />}
                      label="Deactive"
                      checked={active === "deactive"}
                      onChange={handleChange}
                    />
                  </RadioGroup>
                </FormControl>
              </Col>
            </Row>
          </Form>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
            style={{ marginTop: 20 }}
          >
            Update
          </Button>
          <Dialog open={open} fullWidth>
            <DialogTitle>Are you want update company?</DialogTitle>
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
                onClick={handleUpdate}
                color="primary"
                autoFocus
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
}

export default CompanyRegister;
