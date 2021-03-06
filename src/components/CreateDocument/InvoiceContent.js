import {
  Container,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Header from "../Nav/Header";
import StepInvoice from "../Sidebar/StepInvoice";
import PDF from "../PDF/PDF";
import "../../css/CreateDoc.css";
import userListAPI from "../../api/userListAPI";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/Common";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import invoiceAPI from "../../api/invoiceAPI";
import axios from "axios";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { InputAdornment } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import Table from "@material-ui/core/Table";
import "date-fns";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

toast.configure();
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
function InvoiceContent() {
  const location = useLocation();
  const history = useHistory();
  const [create, setCreate] = useState(false);
  function toogle() {
    setCreate(!create);
  }
  const [signer, setSigner] = useState("");
  const viewer = location.state.viewer;
  useEffect(() => {
    async function getSigner() {
      try {
        const res = await userListAPI.getUserById(
          location.state.data.signer.id
        );
        setSigner(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSigner();
  }, []);
  console.log(location);
  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  async function handleCreated(e) {
    e.preventDefault();
    const file = location.state.file[0];
    const convertBase64 = await base64(file);
    const url = convertBase64.slice(28);
    const position =
      "page=" +
      location.state.numberPage +
      ",x=" +
      location.state.signLocation.x +
      ",y=" +
      location.state.signLocation.y;
    const params = {
      dateCreate: Moment(new Date()).format("DD/MM/YYYY"),
      creatorId: getUser().Id,
      dateExpire: location.state.date,
      description: location.state.data.title,
      signerId: location.state.data.signer.id,
      signLocation: position,
      invoiceURL: url,
    };
    invoiceAPI
      .addInvoice(params)
      .then(function (res) {
        const invoiceId = res.data.id;
        const viewer = {
          invoiceId: invoiceId,
          listViewersId: location.state.listViewerId,
        };
        axios
          .post(
            "https://datnxeoffice.azurewebsites.net/api/invoices/addviewertoinvoice",
            viewer
          )
          .then(function (res) {
            toast.success("You has created invoice successfully", {
              position: toast.POSITION.TOP_CENTER,
            });
            history.push({
              pathname:
                "/detail/invoice/" +
                invoiceId +
                "/" +
                location.state.data.title,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function base64(file) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
    });
  }
  return (
    <div>
      <StepInvoice activeStep={5} />
      <div className="main-panel">
        <Header />
        <Container fluid={true}>
          <Row>
            <Col>
              <Paper style={{ marginTop: "20px" }} elevation={3}>
                <Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  Document Content
                </Label>
                <TextField
                  label="Type"
                  value="INVOICE"
                  fullWidth
                  style={{ padding: "10px 10px 10px" }}
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InsertDriveFileIcon color="primary" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Title"
                  variant="standard"
                  value={location.state.data.title}
                  fullWidth
                  style={{ marginTop: "20px", padding: "10px 10px 10px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="primary" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Signer"
                  value={signer.name}
                  fullWidth
                  style={{ marginTop: "20px", padding: "10px 10px 10px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BorderColorIcon color="primary" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />

                <TableContainer style={{ marginTop: "20px", padding: "10px" }}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Viewer name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">
                          Phone number
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {viewer.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.phone}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TextField
                  label="Date signed"
                  value={location.state.date}
                  fullWidth
                  style={{ marginTop: "20px", padding: "10px 10px 10px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventAvailableIcon color="primary" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
              </Paper>
              <Button
                style={{ marginTop: "20px", marginRight: "10px" }}
                color="secondary"
                variant="contained"
                onClick={() => history.push("/document")}
              >
                Cancel
              </Button>
              <Button
                style={{ marginTop: "20px" }}
                color="primary"
                variant="contained"
                onClick={toogle}
              >
                Create
              </Button>
            </Col>
            <Col>
              <Form className="form-doc">
                <FormGroup row>
                  <div>
                    <PDF pdf={location.state.file[0]} />
                  </div>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        <Modal
          isOpen={create}
          toggle={toogle}
          style={{ marginTop: "20%", marginRight: "50%" }}
        >
          <ModalHeader>Do you want create Invoice?</ModalHeader>
          <ModalFooter>
            <Button color="secondary" onClick={toogle}>
              No
            </Button>{" "}
            <Button color="primary" onClick={handleCreated}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
export default InvoiceContent;
