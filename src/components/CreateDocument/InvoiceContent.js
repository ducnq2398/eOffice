import { Container, Form, FormGroup, Row, Col, Label } from "reactstrap";
import StepInvoice from "../Sidebar/StepInvoice";
import PDF from "../PDF/PDF";
import "../../css/CreateDoc.css";
import userListAPI from "../../api/userListAPI";
import { useHistory, useLocation } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import { getUser } from "../../utils/Common";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import invoiceAPI from "../../api/invoiceAPI";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import BusinessIcon from "@material-ui/icons/Business";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  Slide,
  TablePagination,
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import Table from "@material-ui/core/Table";
import "date-fns";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import Navbar from "../Navbar/Navbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import companyListAPI from "../../api/companyListAPI";

toast.configure();
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function InvoiceContent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [create, setCreate] = useState(false);
  function toogle() {
    setCreate(!create);
  }
  const [signer, setSigner] = useState("");
  const [company, setCompany] = useState([]);
  const viewer = location.state.viewer;
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = viewer.slice(indexOfFirstPost, indexOfLastPost);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
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
  }, [location.state.data.signer.id]);

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await companyListAPI.getCompanyById(
          location.state.data.signer.companyId
        );
        setCompany(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCompany();
  }, [location.state.data.signer.companyId]);

  async function handleCreated(e) {
    e.preventDefault();
    setOpen(!open);
    setCreate(!create);
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
      dateCreate: Moment(new Date()).format(
        "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
      ),
      creatorId: getUser().Id,
      dateExpire: location.state.date,
      title: location.state.data.title,
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
        invoiceAPI
          .addViewerInvoice(viewer)
          .then(function () {
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
      <header>
        <Navbar />
      </header>
      <StepInvoice activeStep={5} />
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
                <TextField
                  variant="standard"
                  value={location.state.data.title}
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
                        <BorderColorIcon color="primary" fontSize="large" />
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
                  value={moment(location.state.date).format(
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
        <Dialog
          open={create}
          TransitionComponent={Transition}
          keepMounted
          onClose={toogle}
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
        >
          <DialogTitle>{"Do you want create Invoice?"}</DialogTitle>
          <DialogActions>
            <Button onClick={toogle} color="secondary" variant="contained">
              No
            </Button>
            <Button onClick={handleCreated} color="primary" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </main>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default InvoiceContent;
