import { Container, Form, FormGroup, Row, Col, Label} from "reactstrap";
import Header from "../Nav/Header";
import StepDetail from "../Sidebar/StepDetail";
import PDF from "../PDF/PDF";
import notsigned from "../../images/status.png";
import done from "../../images/invoicecompleted.png";
import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import userListAPI from "../../api/userListAPI";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";
import fileDownload from "js-file-download";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { InputAdornment } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import Table from "@material-ui/core/Table";
import "date-fns";
import Moment from "moment";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import GetEmail from "../GetData/GetEmail";
import GetPhone from "../GetData/GetPhone";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";

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

function InvoiceDetail() {
  const [activeStep, setActiveStep] = useState(1);
  const [document, setDocument] = useState([]);
  const [signer, setSigner] = useState([]);
  const [viewer, setViewer] = useState([]);
  const [signerId, setSignerId] = useState();
  const param = useParams();
  useEffect(() => {
    async function getInvoiceById() {
      try {
        const res = await invoiceAPI.getInvoiceById(param.id);
        setDocument(res.data);
        setViewer(res.data.viewers);
        setActiveStep(res.data.status + 1);
        setSignerId(res.data.signerId);
      } catch (error) {
        console.log(error);
      }
    }
    getInvoiceById();
  }, []);
  useEffect(() => {
    async function getSigner() {
      try {
        const res = await userListAPI.getUserById(signerId);
        setSigner(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSigner();
  }, [signerId]);

  return (
    <div>
      <StepDetail activeStep={activeStep} />
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
                  label="Status"
                  fullWidth
                  style={{ padding: "10px 10px 10px" }}
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img hidden={activeStep===3 ? false : true} src={done} alt="" />
                        <img hidden={activeStep<3 ? false : true} src={notsigned} alt="" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
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
                  value={document.description}
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
                        <StyledTableRow key={row.viewerId}>
                          <StyledTableCell component="th" scope="row">
                            <GetCreater id={row.viewerId} />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <GetEmail id={row.viewerId} />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <GetPhone id={row.viewerId} />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TextField
                  label="Date signed"
                  value={Moment(document.dateSign).format("DD/MM/YYYY")}
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
                hidden={activeStep >= 3 ? false : true}
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "20px", marginRight: "10px" }}
                startIcon={<SaveIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .get(document.invoiceURL, {
                      responseType: "blob",
                    })
                    .then(function (res) {
                      fileDownload(res.data, document.description + ".pdf");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              >
                Save
              </Button>
              <Button
                hidden={activeStep >= 3 ? false : true}
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "20px" }}
                startIcon={<PrintIcon />}
              >
                Print
              </Button>
            </Col>

            <Col>
              <Form className="form-doc">
                <FormGroup row>
                  <div>
                    <PDF pdf={document.invoiceURL} />
                  </div>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default InvoiceDetail;
