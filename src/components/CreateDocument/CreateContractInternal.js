import { Container, Form, FormGroup, Row, Col, Label } from "reactstrap";
import { useState, useEffect } from "react";
import "../../css/CreateDoc.css";
import { useHistory } from "react-router-dom";
import userListAPI from "../../api/userListAPI";
import { getUser } from "../../utils/Common";
import demo from "../../images/demo.png";
import { Document, Page, pdfjs } from "react-pdf";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import BackupIcon from "@material-ui/icons/Backup";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
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
import { InputAdornment, Slide, Snackbar, Tooltip } from "@material-ui/core";
import TitleIcon from "@material-ui/icons/Title";
import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";
import Navbar from "../Navbar/Navbar";
import StepperContractInternal from "../Sidebar/StepperContractInternal";
import companyListAPI from "../../api/companyListAPI";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}
toast.configure();
function CreateContractInternal() {
  const [fileName, setFileName] = useState("");
  const [listSinger, setListSigner] = useState([]);
  const [listSinger2, setListSigner2] = useState([]);
  const history = useHistory();
  const [listViewB, setListViewB] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [locaA, setLocaA] = useState(true);
  const [locaB, setLocaB] = useState(true);
  const [show, setShow] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState([]);
  const [dataUpload, setDataUpload] = useState({
    title: "",
    signer: null,
    company_guest: null,
    signer_guest: null,
  });
  useEffect(() => {
    async function getCompany() {
      try {
        const response = await companyListAPI.getCompanyById(
          getUser().CompanyId
        );
        setDataUpload({
          ...dataUpload,
          company_guest: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getCompany();
  }, []);
  const [alert, setAlert] = useState({
    file: false,
    title: false,
    signerA: false,
    signerB: false,
    company: false,
    date: false,
    location: false,
    message: "",
  });
  const [positionA, setPositionA] = useState({
    x: 0,
    y: 0,
  });
  const [positionB, setPositionB] = useState({
    x: 0,
    y: 0,
  });
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });
  const [color, setColor] = useState({
    signerA: "#808080ad",
    signerB: "#808080ad",
  });
  const [viewer, setViewer] = useState([]);
  const [numPages, setNumPages] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  function handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setDataUpload({
      ...dataUpload,
      [name]: value,
    });
  }
  useEffect(() => {
    const companyId = getUser().CompanyId;
    async function fetListUser() {
      try {
        const response = await userListAPI.getUserByCompanyId(companyId);
        setListSigner(
          response.data.filter((data) => {
            if (data.status === 1) {
              return data;
            }
          })
        );
        setListSigner2(
          response.data.filter((data) => {
            if (data.status === 1) {
              return data;
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetListUser();
  }, []);

  function handleContent() {
    const listViewerId = [];
    if (dataUpload.signer.id === getUser().Id) {
      viewer.map((view) => {
        listViewerId.push(view.id);
      });
    } else {
      listViewerId.push(getUser().Id);
      viewer.map((view) => {
        listViewerId.push(view.id);
      });
    }
    if (selectedDate === null) {
      setAlert({
        ...alert,
        date: true,
        message: "Please select expiration date !!!",
      });
      setTimeout(() => {
        setAlert(
          {
            ...alert,
            date: false,
            message: "",
          },
          3000
        );
      });
    } else if (selectedDate.getTime() < new Date().getTime()) {
      setAlert({
        ...alert,
        date: true,
        message: "Expiration date can't less than current date !!!",
      });
      setTimeout(() => {
        setAlert({
          ...alert,
          date: false,
          message: "",
        });
      }, 3000);
    } else if (positionA.x === 0 && positionA.y === 0) {
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
    } else if (positionB.x === 0 && positionB.y === 0) {
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
        pathname: "/contract-confirm",
        state: {
          file: file,
          data: dataUpload,
          viewer: viewer,
          listViewerId: listViewerId,
          signLocationA: positionA,
          signLocationB: positionB,
          numberPage: pageNumber,
          date: Moment(selectedDate).format(
            "yyyy-MM-DD" + "T" + "HH:mm:ss.SSS" + "Z"
          ),
        },
      });
    }
  }

  function getLocationA(e) {
    setPositionA({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setLocaA(true);
  }
  function getLocationB(e) {
    setPositionB({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setLocaB(true);
  }

  function handleA(e) {
    e.preventDefault();
    setColor({ ...color, signerA: "#808080ad" });
    setPositionA({ x: 0, y: 0 });
    setLocaA(!locaA);
  }

  function handleB(e) {
    e.preventDefault();
    setColor({ ...color, signerB: "#808080ad" });
    setPositionB({ x: 0, y: 0 });
    setLocaB(!locaB);
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
      <header>
        <Navbar />
      </header>
      <StepperContractInternal activeStep={activeStep} />
      <main className="main-contract">
        <Snackbar
          style={{ marginTop: 70 }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alert.location}
          autoHideDuration={3000}
          TransitionComponent={TransitionLeft}
        >
          <Alert variant="filled" severity="error">
            Please choose location sign to continue...
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
          <div
            hidden={locaB}
            className="cursor"
            style={{
              left: `${cursor.x}px`,
              top: `${cursor.y}px`,
            }}
          />
          <Row>
            <Col>
              <Tooltip title="Choose location sign A" placement="top-start">
                <IconButton
                  style={{
                    float: "left",
                    background: color.signerA,
                    marginTop: "20px",
                  }}
                  color="secondary"
                  onClick={handleA}
                  hidden={pageNumber === 0 ? true : false}
                >
                  <EditLocationIcon color="error" fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Choose location sign B" placement="top-start">
                <IconButton
                  style={{
                    float: "left",
                    background: color.signerB,
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                  color="secondary"
                  onClick={handleB}
                  hidden={pageNumber === 0 ? true : false}
                >
                  <EditLocationIcon color="error" fontSize="large" />
                </IconButton>
              </Tooltip>

              <div
                hidden={activeStep === 0 ? false : true}
                style={{ marginTop: "15%" }}
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
                  value="Contract"
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
                  accept="application/pdf"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none", width: 0 }}
                  onChange={(e) => {
                    if (e.target.files.length !== 0) {
                      if (e.target.files[0].type !== "application/pdf") {
                        setAlert({
                          ...alert,
                          file: true,
                          message: "Please choose file PDF...",
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
                    }
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Choose file"
                  error={alert.file}
                  helperText={alert.message}
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
                style={{ marginTop: "15%" }}
              >
                <Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "blue",
                    float: "left",
                  }}
                >
                  TITLE OF CONTRACT
                </Label>
                <TextField
                  variant="outlined"
                  label="Title Contract"
                  type="text"
                  name="title"
                  required
                  error={alert.title}
                  helperText={alert.message}
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
                        message: "Please input title of contract !!!",
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
                style={{ marginTop: "15%" }}
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
                  SELECT SIGNER TO SIGN CONTRACT
                </Label>
                <Autocomplete
                  id="combo-box-demo"
                  options={listSinger}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setDataUpload({ ...dataUpload, signer: newValue });
                    setListSigner2(
                      listSinger.filter((data) => {
                        if (data.id !== newValue.id) {
                          return data;
                        }
                      })
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Signer name"
                      variant="outlined"
                      name="signer"
                      error={alert.signerA}
                      helperText={alert.message}
                    />
                  )}
                />
                <Button
                  variant="contained"
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
                        signerA: true,
                        message: "Please choose one signer contract !!!",
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          signerA: false,
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
                hidden={activeStep === 3 ? false : true}
                style={{ marginTop: "15%" }}
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
                  SELECT SIGNER GUEST
                </Label>
                <Autocomplete
                  id="combo-box-demo"
                  options={listSinger2}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setDataUpload({ ...dataUpload, signer_guest: newValue });
                    setListViewB(
                      listSinger.filter((data) => {
                        if (
                          data.id !== newValue.id &&
                          data.id !== dataUpload.signer.id &&
                          data.id !== getUser().Id
                        ) {
                          return data;
                        }
                      })
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Signer guest"
                      variant="outlined"
                      name="signer_guest"
                      error={alert.signerB}
                      helperText={alert.message}
                    />
                  )}
                />
                <Button
                  variant="contained"
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
                  onClick={(e) => {
                    if (dataUpload.signer_guest === null) {
                      setAlert({
                        ...alert,
                        signerB: true,
                        message:
                          "Please choose one singer guest to sign contract !!!",
                      });
                      setTimeout(() => {
                        setAlert({
                          ...alert,
                          signerB: false,
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
                hidden={activeStep === 4 ? false : true}
                style={{ marginTop: "15%" }}
              >
                <Row>
                  <Label
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "blue",
                      float: "left",
                      marginBottom: "30px",
                      marginLeft: "12px",
                    }}
                  >
                    VIEWER CAN VIEW CONTRACT
                  </Label>
                </Row>
                <Row>
                  <Col>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={listViewB}
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
                          placeholder="Viewer "
                        />
                      )}
                    />
                  </Col>
                </Row>
                <Button
                  variant="contained"
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
                hidden={activeStep === 5 ? false : true}
                style={{ marginTop: "15%" }}
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
                      error={alert.date}
                      helperText={alert.message}
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
            <Col md={6}>
              <Form className="form-doc">
                <FormGroup row>
                  <div hidden={show} style={{ marginTop: "4rem" }}>
                    <img src={demo} alt="demo" width="600" height="600" />
                  </div>
                  <Paper>
                    <Document
                      file={file[0]}
                      onLoadSuccess={onDocumentLoadSuccess}
                      noData={false}
                      onClick={(e) => {
                        if (locaA === false) {
                          getLocationA(e);
                          setColor({ ...color, signerA: "#3541da" });
                        } else if (locaB === false) {
                          getLocationB(e);
                          setColor({ ...color, signerB: "#3541da" });
                        }
                      }}
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
      </main>
    </div>
  );
}
export default CreateContractInternal;
