import { Container, Form, FormGroup, Row, Col, Label } from "reactstrap";
import StepContract from "../Sidebar/Stepper";
import PDF from "../PDF/PDF";
import "../../css/CreateDoc.css";
import { useHistory, useLocation } from "react-router-dom";
import { forwardRef, useState } from "react";
import { getUser } from "../../utils/Common";
import contractAPI from "../../api/contractAPI";
import "react-toastify/dist/ReactToastify.css";
import Moment from "moment";
import { toast } from "react-toastify";
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
  Dialog,
  DialogTitle,
  DialogActions,
  Slide,
  makeStyles,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import Navbar from "../Navbar/Navbar";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
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

function ContractContent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [create, setCreate] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(2);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const viewer = location.state.viewer;
  const currentPosts = viewer.slice(indexOfFirstPost, indexOfLastPost);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function toogle() {
    setCreate(!create);
  }

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
      location.state.signLocationA.x +
      ",y=" +
      location.state.signLocationA.y +
      "|page=" +
      location.state.numberPage +
      ",x=" +
      location.state.signLocationB.x +
      ",y=" +
      location.state.signLocationB.y;
    const params = {
      dateCreate: Moment(new Date()).format(
        "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
      ),
      creatorId: getUser().Id,
      dateExpire: location.state.date,
      title: location.state.data.title,
      contractURL: url,
      signLocation: position,
    };
    contractAPI
      .addContract(params)
      .then(function (res) {
        const contractId = res.data.id;
        const listSigner = [];
        listSigner.push(location.state.data.signer.id);
        listSigner.push(location.state.data.signer_guest.id);
        const data = {
          contractId: contractId,
          listSignersId: listSigner,
        };
        axios
          .put(
            "https://datnxeoffice.azurewebsites.net/api/contracts/addsignertocontract",
            data,
            {
              headers: {
                Authorization: `Bearer ${getUser().IdToken}`,
              },
            }
          )
          .then(function () {
            const viewer = {
              contractId: contractId,
              listViewersId: location.state.listViewerId,
            };
            axios
              .put(
                "https://datnxeoffice.azurewebsites.net/api/contracts/addviewertocontract",
                viewer,
                {
                  headers: {
                    Authorization: `Bearer ${getUser().IdToken}`,
                  },
                }
              )
              .then(function (res) {
                toast.success("You has created contract successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
                history.push({
                  pathname:
                    "/detail/contract/" +
                    contractId +
                    "/" +
                    location.state.data.title,
                });
              })
              .catch(function (error) {});
          })
          .catch(function (error) {});
      })
      .catch(function (error) {});
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
      <StepContract activeStep={7} />
      <main className="main-contract">
        <Container fluid>
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
                  value={location.state.data.signer.companyName}
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
                  value={location.state.data.signer.name}
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
                  value={location.state.data.company_guest.name}
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
                  value={location.state.data.signer_guest.name}
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
          <DialogTitle>{"Do you want create Contract?"}</DialogTitle>
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
export default ContractContent;
