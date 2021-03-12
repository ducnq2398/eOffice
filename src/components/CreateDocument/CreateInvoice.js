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
import BackupIcon from "@material-ui/icons/Backup";
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
import {
  InputAdornment,
  Slide,
  Tooltip,
} from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import { toast } from "react-toastify";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

toast.configure();
function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}
function CreateInvoice() {
  const history = useHistory();
  const [listSinger, setListSigner] = useState([]);
  const [show, setShow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState([]);
  const [color, setColor] = useState("#808080ad");
  const [alert, setAlert] = useState({
    file: false,
    title: false,
    signer: false,
    location: false,
    date: false,
    message: "",
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
        ...alert,
        date: true,
        message: "Please choose date expiration invoice",
      });
      setTimeout(() => {
        setAlert({
          ...alert,
          date: false,
        });
      }, 3000);
    } else if (
      Moment(selectedDate).format('yyyy-MM-DD'+'T'+'HH:mm:ss.SSS'+'Z') <
      Moment(new Date()).format('yyyy-MM-DD'+'T'+'HH:mm:ss.SSS'+'Z')
    ) {
      setAlert({
        ...alert,
        date: true,
        message: "Expiration date can't less than current date",
      });
      setTimeout(() => {
        setAlert({
          ...alert,
          date: false,
          message: "",
        });
      }, 3000);
    } else if (position.x === 0 && position.y === 0) {
      setAlert({
        ...alert,
        location: true,
      });
      setTimeout(() => {
        setAlert({
          ...alert,
          location: false,
        });
      }, 3000);
    } else {
      history.push({
        pathname: "/invoice-confirm",
        state: {
          file: file,
          data: dataUpload,
          date: Moment(selectedDate).format('yyyy-MM-DD'+'T'+'HH:mm:ss.SSS'+'Z'),
          viewer: viewer,
          listViewerId: listViewerId,
          signLocation: position,
          numberPage: pageNumber,
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
  function choseLocation(e) {
    e.preventDefault();
    setColor("#808080ad");
    setPosition({ x: 0, y: 0 });
    setLocaA(!locaA);
  }
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

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.file}
          TransitionComponent={TransitionLeft}
          autoHideDuration={3000}
        >
          <Alert variant="filled" severity="error">
            {alert.message}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.title}
          autoHideDuration={3000}
          TransitionComponent={TransitionLeft}
        >
          <Alert variant="filled" severity="error">
            {alert.message}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.signer}
          autoHideDuration={3000}
          TransitionComponent={TransitionLeft}
        >
          <Alert variant="filled" severity="error">
            Please select a signer to sign invoice
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.date}
          autoHideDuration={3000}
          TransitionComponent={TransitionLeft}
        >
          <Alert variant="filled" severity="error">
            {alert.message}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.location}
          autoHideDuration={3000}
          TransitionComponent={TransitionLeft}
        >
          <Alert variant="filled" severity="error">
            Please choose location sign to continue
          </Alert>
        </Snackbar>

        <Container fluid={true}>
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
              <Tooltip title="Select location sign" placement="right">
                <IconButton
                  style={{ float: "left", background: color }}
                  color="secondary"
                  onClick={choseLocation}
                  hidden={pageNumber === 0 ? true : false}
                >
                  <EditLocationIcon color="error" fontSize="large" />
                </IconButton>
              </Tooltip>
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
                  DOCUMENT INFORMATION
                </Label>

                <TextField
                  variant="outlined"
                  label="Document type"
                  value="Invoice"
                  fullWidth
                  style={{ marginTop: "20px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InsertDriveFileIcon fontSize="large" color="primary" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />

                <input
                  accept=".pdf"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none", width: 0 }}
                  onChange={(e) => {
                    if (e.target.files[0].type !== "application/pdf") {
                      setAlert({
                        ...alert,
                        file: true,
                        message: "Please choose file PDF",
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          file: false,
                          message: "",
                        });
                      }, 3000);
                    } else if (e.target.files[0].size > 10485760) {
                      setAlert({
                        ...alert,
                        file: true,
                        message: "File don't larger 10MB",
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          file: false,
                          message: "",
                        });
                      }, 3000);
                    } else {
                      setFile(e.target.files);
                      setFileName(e.target.files[0].name);
                      setShow(true);
                    }
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Choose file"
                  error={alert.file}
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
                    readOnly: true,
                  }}
                  style={{ marginTop: "30px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (file.length === 0) {
                      setAlert({
                        ...alert,
                        file: true,
                        message: "Please choose file upload !!!",
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          file: false,
                          message: "",
                        });
                      }, 3000);
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
                  TITLE OF INVOICE
                </Label>
                <TextField
                  variant="outlined"
                  label="Title invoice"
                  type="text"
                  name="title"
                  required
                  error={alert.title}
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
                    if (dataUpload.title.trim() === "") {
                      setAlert({
                        ...alert,
                        title: true,
                        message: "Please input title invoice",
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          title: false,
                          message: "",
                        });
                      }, 3000);
                    } else if (dataUpload.title.length > 255) {
                      setAlert({
                        ...alert,
                        title: true,
                        message: "Title max length 255 characters !!!",
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          title: false,
                          message: "",
                        });
                      }, 3000);
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
                  SELECT SIGNER TO SIGN INVOICE
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
                      error={alert.signer}
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
                        ...alert,
                        signer: true,
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          signer: false,
                        });
                      }, 3000);
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
                  VIEWER CAN VIEW INVOICE
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
                  DATE EXPIRATION INVOICE
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
                      error={alert.hidden}
                      helperText={alert.text}
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
                      onClick={(e) => {
                        if (locaA === false) {
                          getLocation(e);
                          setColor("#3541da");
                        }
                      }}
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
