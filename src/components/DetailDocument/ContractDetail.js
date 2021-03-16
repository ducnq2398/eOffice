import { Container, Form, FormGroup, Row, Col, Label } from "reactstrap";
import Header from "../Nav/Header";
import PDF from "../PDF/PDF";
import notsigned from "../../images/status.png";
import done from "../../images/true.png";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import userListAPI from "../../api/userListAPI";
import GetCreater from "../GetData/GetCreater";
import fileDownload from "js-file-download";
import contractAPI from "../../api/contractAPI";
import StepDetailContract from "../Sidebar/StepDetailContract";
import companyListAPI from "../../api/companyListAPI";
import axios from "axios";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Button from "@material-ui/core/Button";
import TitleIcon from "@material-ui/icons/Title";
import BusinessIcon from "@material-ui/icons/Business";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {
  InputAdornment,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  TextField,
  withStyles,
  TablePagination,
} from "@material-ui/core";
import GetEmail from "../GetData/GetEmail";
import GetPhone from "../GetData/GetPhone";
import moment from "moment";
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

function ContractDetail() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(1);
  const [signer1, setSigner1] = useState([]);
  const [signer2, setSigner2] = useState([]);
  const [company1, setCompany1] = useState([]);
  const [company2, setCompany2] = useState([]);
  const [document, setDocument] = useState([]);
  const [viewer, setViewer] = useState([]);
  const [id1, setId1] = useState();
  const [id2, setId2] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(2);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = viewer.slice(indexOfFirstPost, indexOfLastPost);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const par = useParams();
  useEffect(() => {
    async function getDocument() {
      try {
        const res = await contractAPI.getContractById(par.id);
        setDocument(res.data);
        setViewer(res.data.contractViewers);
        setId1(res.data.contractSigners[0].signerId);
        setId2(res.data.contractSigners[1].signerId);
        setActiveStep(res.data.status);
      } catch (error) {
        console.log(error);
      }
    }
    getDocument();
  }, []);

  useEffect(() => {
    async function getSigner1() {
      try {
        const res = await userListAPI.getUserById(id1);
        setSigner1(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSigner1();
  }, [id1]);
  useEffect(() => {
    async function getSigner2() {
      try {
        const res = await userListAPI.getUserById(id2);
        setSigner2(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSigner2();
  }, [id2]);
  useEffect(() => {
    async function getCompany1() {
      try {
        const res = await companyListAPI.getCompanyById(signer1.companyId);
        setCompany1(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCompany1();
  }, [signer1.companyId]);
  useEffect(() => {
    async function getCompany2() {
      try {
        const res = await companyListAPI.getCompanyById(signer2.companyId);
        setCompany2(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCompany2();
  }, [signer2.companyId]);

  return (
    <div>
      <StepDetailContract activeStep={activeStep} />
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
                  Contract Content
                </Label>
                <br/>
                <Label style={{marginTop:'10px'}}>
                  <img
                    hidden={document.status === 3 ? false : true}
                    src={done}
                    alt=""
                  />
                  <img
                    hidden={document.status !== 3 ? false : true}
                    src={notsigned}
                    alt=""/>
                </Label>
                
                <TextField
                  variant="standard"
                  value={document.title}
                  fullWidth
                  style={{ marginTop: "20px", padding: "10px 10px 10px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="primary" fontSize="large" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <TextField
                  variant="standard"
                  value={company1.name}
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
                  variant="standard"
                  value={signer1.name}
                  fullWidth
                  style={{ marginTop: "20px", padding: "10px 10px 10px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BorderColorIcon color="primary" fontSize="large" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <TextField
                  
                  variant="standard"
                  value={company2.name}
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
                  
                  variant="standard"
                  value={signer2.name}
                  fullWidth
                  style={{ marginTop: "20px", padding: "10px 10px 10px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BorderColorIcon color="primary" fontSize="large" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
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
                        <StyledTableRow key={row.name}>
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
                  value={moment(document.dateExpire).format("DD/MM/YYYY HH:mm:ss")}
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
                    .get(document.contractUrl, {
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
                    <PDF pdf={document.contractUrl} />
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
export default ContractDetail;
