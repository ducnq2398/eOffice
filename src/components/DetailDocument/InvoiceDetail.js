import { Container, Form, FormGroup, Row, Col, Label } from "reactstrap";
import StepDetail from "../Sidebar/StepDetail";
import PDF from "../PDF/PDF";
import notsigned from "../../images/status.png";
import done from "../../images/invoicecompleted.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userListAPI from "../../api/userListAPI";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";
import fileDownload from "js-file-download";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, TablePagination } from "@material-ui/core";
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
import Navbar from "../Navbar/Navbar";
import printJS from "print-js";
import companyListAPI from "../../api/companyListAPI";
import { getUser } from "../../utils/Common";
import BusinessIcon from "@material-ui/icons/Business";
import expiration from "../../images/Frame 138.png";

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
  const [company, setCompany] = useState([]);
  const [viewer, setViewer] = useState([]);
  const [signerId, setSignerId] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(2);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = viewer.slice(indexOfFirstPost, indexOfLastPost);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
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

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await companyListAPI.getCompanyById(getUser().CompanyId);
        setCompany(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCompany();
  }, [getUser().CompanyId]);

  function printFile() {
    printJS({
      printable: document.invoiceURL,
      type: "pdf",
    });
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <StepDetail activeStep={activeStep === 4 ? 1 : activeStep} />
      <main className="main-invoice">
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
                  Invoice Content
                </Label>
                <br />
                <Label style={{ marginTop: "10px" }}>
                  {document.status === 2 && <img src={done} alt="" />}
                  {document.status < 2 && <img src={notsigned} alt="" />}
                  {document.status === 3 && (
                    <img className="not-sign" src={expiration} alt="" />
                  )}
                </Label>
                <TextField
                  variant="standard"
                  value={document.title}
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
                  variant="standard"
                  value={company.name}
                  fullWidth
                  style={{ marginTop: "20px", padding: "10px 10px 10px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon color="primary" fontSize="large" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <TextField
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
                      {currentPosts.map((row) => (
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
                <TablePagination
                  component="div"
                  count={viewer.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage=""
                  onChangePage={handleChangePage}
                  rowsPerPageOptions={[]}
                />
                <TextField
                  label="Date expiration"
                  value={Moment(document.dateExpire).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
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
                hidden={activeStep === 3 ? false : true}
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
                      fileDownload(res.data, document.title + ".pdf");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              >
                Save
              </Button>
              <Button
                hidden={activeStep === 3 ? false : true}
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "20px" }}
                startIcon={<PrintIcon />}
                onClick={printFile}
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
      </main>
    </div>
  );
}
export default InvoiceDetail;
