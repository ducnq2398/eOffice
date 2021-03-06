import { Container, Form, FormGroup, Row, Col, Label } from "reactstrap";
import Header from "../Nav/Header";
import StepInvoice from "../Sidebar/StepInvoice";
import { useState, useEffect } from "react";
import "../../css/CreateDoc.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { getUser } from "../../utils/Common";
import demo from "../../images/demo.png";
import userListAPI from "../../api/userListAPI";
import { Document, Page, pdfjs } from "react-pdf";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import BackupIcon from "@material-ui/icons/Backup";
import Snackbar from "@material-ui/core/Snackbar";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Moment from "moment";
import { InputAdornment } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function CreateInvoice() {
  const history = useHistory();
  const [listSinger, setListSigner] = useState([]);
  const [show, setShow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState([]);
  const [alert, setAlert] = useState({
    hidden: false,
    text: "",
  });
  const handleChange = (event, value) => {
    setPageNumber(value);
  };
  const [fileName, setFileName] = useState("");
  const [dataUpload, setDataUpload] = useState({
    title: "",
    signer: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });
  const [viewer, setViewer] = useState([]);
  const [numPages, setNumPages] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setDataUpload({
      ...dataUpload,
      [name]: value,
    });
  }
  function handleContent() {
    const listViewerId = [];
    viewer.map((view) => {
      listViewerId.push(view.id);
    });

    if (selectedDate === null) {
      setAlert({
        hidden: true,
        text: "Please select expiration date",
      });
    } else if (new Date(selectedDate) < new Date()) {
      setAlert({
        hidden: true,
        text: "Expiration date must be larger current date",
      });
    } else if (position.x === 0 && position.y === 0) {
      setAlert({
        hidden: true,
        text: "Please select location to sign",
      });
    } else {
      history.push({
        pathname: "/invoice-confirm",
        state: {
          file: file,
          data: dataUpload,
          date: Moment(selectedDate).format("DD/MM/YYYY"),
          viewer: viewer,
          listViewerId: listViewerId,
          signLocation: position,
          numberPage: numPages,
        },
      });
    }
  }
  useEffect(() => {
    const companyId = getUser().CompanyId;
    async function fetListUser() {
      try {
        const response = await userListAPI.getUserByCompanyId(companyId);
        setListSigner(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetListUser();
  }, []);
  const [locaA, setLocaA] = useState(true);
  function getLocation(e) {
    setPosition({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setLocaA(true);
  }
  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
  };
  const onMouseMove = (e) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  return (
    <div>
      <StepInvoice activeStep={activeStep} />
      <div className="main-panel">
        <Header />
        <Container fluid={true}>
          <Snackbar
            open={alert.hidden}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={() => setAlert({ ...alert, hidden: false })}
          >
            <Alert variant="filled" severity="error">
              {alert.text}
            </Alert>
          </Snackbar>

          <div
            hidden={locaA}
            className="cursor"
            style={{
              left: `${cursor.x}px`,
              top: `${cursor.y}px`,
            }}
          />
          <Row>
            <Col className="form-upload">
              <IconButton
                style={{ float: "left", background: "#3541da" }}
                color="secondary"
                onClick={() => setLocaA(!locaA)}
              >
                <EditLocationIcon color="error" fontSize="large" />
              </IconButton>
              <div
                hidden={activeStep === 0 ? false : true}
                style={{ marginTop: "10%" }}
              >
                <Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "blue",
                    float: "left",
                  }}
                >
                  Document information input
                </Label>

                <TextField
                  variant="outlined"
                  label="Document type"
                  value="Invoice"
                  fullWidth
                  disabled
                  style={{ marginTop: "20px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <label htmlFor="icon-button-file">
                          <IconButton color="primary" component="span">
                            <InsertDriveFileIcon fontSize="large" />
                          </IconButton>
                        </label>
                      </InputAdornment>
                    ),
                  }}
                />

                <input
                  accept=".pdf"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.target.files);
                    setFileName(e.target.files[0].name);
                    setShow(true);
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Choose file"
                  disabled
                  value={fileName}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <label htmlFor="icon-button-file">
                          <IconButton color="primary" component="span">
                            <BackupIcon fontSize="large" />
                          </IconButton>
                        </label>
                      </InputAdornment>
                    ),
                  }}
                  style={{ marginTop: "30px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (file.length === 0) {
                      setAlert({
                        hidden: true,
                        text: "Please choose file upload !!!",
                      });
                    } else {
                      setActiveStep(activeStep + 1);
                    }
                  }}
                  style={{ marginTop: "30px" }}
                >
                  Next
                </Button>
              </div>
              <div
                hidden={activeStep === 1 ? false : true}
                style={{ marginTop: "10%" }}
              >
                <Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "blue",
                    float: "left",
                  }}
                >
                  Please input title of invoice
                </Label>
                <TextField
                  variant="outlined"
                  label="Title invoice"
                  type="text"
                  name="title"
                  required
                  fullWidth
                  style={{ marginTop: "20px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon color="primary" fontSize="large" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleOnChange}
                />
                <Button
                  variant="contained"
                  hidden={activeStep === 0 ? true : false}
                  color="primary"
                  style={{ marginTop: "30px" }}
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: "30px", marginLeft: "10px" }}
                  color="primary"
                  onClick={() => {
                    if (dataUpload.title === "") {
                      setAlert({
                        hidden: true,
                        text: "Please input title of invoice !!!",
                      });
                    } else {
                      setActiveStep(activeStep + 1);
                    }
                  }}
                >
                  Next
                </Button>
              </div>
              <div
                hidden={activeStep === 2 ? false : true}
                style={{ marginTop: "10%" }}
              >
                <Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "blue",
                    float: "left",
                    marginBottom: "30px",
                  }}
                >
                  Please select signer to sign invoice
                </Label>
                <Autocomplete
                  id="combo-box-demo"
                  options={listSinger}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setDataUpload({ ...dataUpload, signer: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Signer name"
                      variant="outlined"
                      name="signer"
                    />
                  )}
                />

                <Button
                  variant="contained"
                  hidden={activeStep === 0 ? true : false}
                  color="primary"
                  style={{ marginTop: "30px" }}
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: "30px", marginLeft: "10px" }}
                  color="primary"
                  onClick={() => {
                    if (dataUpload.signer === null) {
                      setAlert({
                        hidden: true,
                        text: "Please choose one signer invoice !!!",
                      });
                    } else {
                      setActiveStep(activeStep + 1);
                    }
                  }}
                >
                  Next
                </Button>
              </div>
              <div
                hidden={activeStep === 3 ? false : true}
                style={{ marginTop: "10%" }}
              >
                <Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "blue",
                    float: "left",
                    marginBottom: "30px",
                  }}
                >
                  Please select viewer can view the invoice
                </Label>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={listSinger}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    setViewer(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select viewer"
                      placeholder="Viewer"
                    />
                  )}
                />
                <Button
                  variant="contained"
                  hidden={activeStep === 0 ? true : false}
                  color="primary"
                  style={{ marginTop: "30px" }}
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: "30px", marginLeft: "10px" }}
                  color="primary"
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                >
                  Next
                </Button>
              </div>
              <div
                hidden={activeStep === 4 ? false : true}
                style={{ marginTop: "10%" }}
              >
                <Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "blue",
                    float: "left",
                  }}
                >
                  Please select the contract expiration date
                </Label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      fullWidth
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date expiration"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      name="date"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Button
                  variant="contained"
                  hidden={activeStep === 0 ? true : false}
                  color="primary"
                  style={{ marginTop: "30px" }}
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{ marginTop: "30px", marginLeft: "10px" }}
                  color="primary"
                  onClick={handleContent}
                >
                  Next
                </Button>
              </div>
            </Col>
            <Col>
              <Form className="form-doc">
                <FormGroup row>
                  <div hidden={show} style={{ marginTop: "4rem" }}>
                    <img src={demo} alt="demo" width="600" height="600" />
                  </div>

                  <Paper elevation={3}>
                    <Document
                      file={file[0]}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onClick={getLocation}
                      noData={false}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                  </Paper>
                  <div
                    hidden={pageNumber === 0 ? true : false}
                    style={{ marginLeft: "30%" }}
                  >
                    <Typography
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      Page: {pageNumber}/{numPages}
                    </Typography>
                    <Pagination
                      variant="outlined"
                      count={numPages}
                      page={pageNumber}
                      onChange={handleChange}
                    />
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
export default CreateInvoice;
