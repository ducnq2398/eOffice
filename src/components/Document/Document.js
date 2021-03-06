import { Container, Row, FormGroup, Col, Label } from "reactstrap";

import "../../css/Document.css";
import TablePagination from "@material-ui/core/TablePagination";
import { forwardRef, useEffect, useState } from "react";
import notsigned from "../../images/status.png";
import done from "../../images/true.png";
import invoicecompleted from "../../images/invoicecompleted.png";
import choo from "../../images/choo.png";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";
import { useHistory, useParams } from "react-router-dom";
import contractAPI from "../../api/contractAPI";
import { getUser } from "../../utils/Common";
import ScaleLoader from "react-spinners/ScaleLoader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Tab from "@material-ui/core/Tab";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import expiration from "../../images/Frame 138.png";
import {
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete";
import Navbar from "../Navbar/Navbar";
import InvoiceStepper from "../Stepper/InvoiceStepper";
import ContractStepper from "../Stepper/ContractStepper";
import { toast } from "react-toastify";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Document() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [dele, setDel] = useState(false);
  const toogle = () => setIsOpen(!isOpen);
  const [selectType, setSelectType] = useState(false);
  const toogle2 = () => setSelectType(!selectType);
  const [filter, setFilter] = useState("");
  const [postList, setPostList] = useState([]);
  const [listAllDocument, setListAllDocument] = useState([]);
  const [listInvoice, setListInvoice] = useState([]);
  const [listContract, setListContract] = useState([]);
  const [find, setFind] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  var post = postList
    .sort((a, b) => {
      return (
        new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
      );
    })
    .reverse();
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
  function changePage(event, newPage) {
    setPage(newPage);
  }
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getListDocument() {
      try {
        if (getUser().Role === "1") {
          await contractAPI
            .getContractByCompanyId(getUser().CompanyId)
            .then(function (contract) {
              invoiceAPI
                .getInvoiceByCompanyId(getUser().CompanyId)
                .then(function (invoice) {
                  const list = [...contract.data, ...invoice.data];
                  if (history.location.state === "contract") {
                    setListAllDocument(list);
                    setPostList(contract.data);
                    setListInvoice(invoice.data);
                    setListContract(contract.data);
                    setFilter('2');
                    setTimeout(() => {
                      setLoading(false);
                    }, 2000);
                  } else if (history.location.state === "invoice") {
                    setListAllDocument(list);
                    setPostList(invoice.data);
                    setListInvoice(invoice.data);
                    setListContract(contract.data);
                    setFilter('3');
                    setTimeout(() => {
                      setLoading(false);
                    }, 2000);
                  } else {
                    setListAllDocument(list);
                    setPostList(list);
                    setListInvoice(invoice.data);
                    setListContract(contract.data);
                    setFilter('1');
                    setTimeout(() => {
                      setLoading(false);
                    }, 2000);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          await invoiceAPI
            .getInvoiceByViewerId(getUser().Id)
            .then(function (res1) {
              invoiceAPI
                .getInvoiceBySignerId(getUser().Id)
                .then(function (res2) {
                  contractAPI
                    .getContractByViewerId(getUser().Id)
                    .then(function (res3) {
                      contractAPI
                        .getContractBySignerId(getUser().Id)
                        .then(function (res4) {
                          const list = [
                            ...res1.data,
                            ...res2.data,
                            ...res3.data,
                            ...res4.data,
                          ];
                          const listInvoice1 = [...res1.data, ...res2.data];
                          const listContract1 = [...res3.data, ...res4.data];
                          if (history.location.state === "invoice") {
                            setListAllDocument(list);
                            setPostList(listContract1);
                            setListInvoice(listInvoice1);
                            setListContract(listContract1);
                            setFilter('2');
                            setTimeout(() => {
                              setLoading(false);
                            }, 2000);
                          } else if (history.location.state === "invoice") {
                            setListAllDocument(list);
                            setPostList(listInvoice1);
                            setListInvoice(listInvoice1);
                            setListContract(listContract1);
                            setFilter('3');
                            setTimeout(() => {
                              setLoading(false);
                            }, 2000);
                          } else {
                            setListAllDocument(list);
                            setPostList(list);
                            setListInvoice(listInvoice1);
                            setListContract(listContract1);
                            setFilter('1');
                            setTimeout(() => {
                              setLoading(false);
                            }, 2000);
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    })
                    .catch(function (error) {
                      console.log(error);
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
      } catch (error) {
        console.log(error);
      }
    }
    getListDocument();
  }, []);

  function All() {
    setPage(0);
    setPostList(listAllDocument);
    setValue(0);
  }
  function Invoice() {
    setPage(0);
    setPostList(
      listAllDocument.filter((data) => {
        if (data.invoiceURL) {
          return data;
        }
      })
    );
    setValue(0);
  }
  function Contract() {
    setPage(0);
    setPostList(
      listAllDocument.filter((data) => {
        if (data.contractUrl) {
          return data;
        }
      })
    );

    setValue(0);
  }
  function Signed() {
    setPage(0);
    if (filter === "1") {
      setPostList(
        listAllDocument.filter((data) => {
          if (data.status === 2) {
            return data;
          }
        })
      );
    } else if (filter === "2") {
      setPostList(
        listContract.filter((data) => {
          if (data.status === 2) {
            return data;
          }
        })
      );
    } else {
      setPostList(
        listInvoice.filter((data) => {
          if (data.status === 2) {
            return data;
          }
        })
      );
    }
  }
  function NotSigned() {
    setPage(0);
    if (filter === "1") {
      setPostList(
        listAllDocument.filter((data) => {
          if (data.status !== 2) {
            return data;
          }
        })
      );
    } else if (filter === "2") {
      setPostList(
        listContract.filter((data) => {
          if (data.status !== 2) {
            return data;
          }
        })
      );
    } else {
      setPostList(
        listInvoice.filter((data) => {
          if (data.status !== 2) {
            return data;
          }
        })
      );
    }
  }
  const [documentDelete, setDocumentDelete] = useState("");
  function deleteDocument(e) {
    e.preventDefault();
    setOpen(!open);
    setDel(!dele);
    if (documentDelete.invoiceURL) {
      invoiceAPI
        .deleteInvoice(documentDelete.id)
        .then(function () {
          toast.success("Delete document successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setDel(false);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      contractAPI
        .deleteContract(documentDelete.id)
        .then(function () {
          toast.success("Delete document successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setDel(false);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main-panel">
        <Dialog open={isOpen} onClose={toogle} TransitionComponent={Transition}>
          <DialogContent
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <img src={choo} alt="" className="l" />
          </DialogContent>
          <DialogTitle>
            Please select the type of document you want create?
          </DialogTitle>
          <DialogActions
            style={{
              paddingBottom: "30px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectType(!selectType)}
            >
              Contract
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/invoice")}
            >
              Invoice
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={selectType}
          onClose={toogle2}
          TransitionComponent={Transition}
        >
          <DialogTitle>Please select the type of contract?</DialogTitle>
          <DialogActions
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/contract-internal")}
            >
              Internal
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/contract")}
            >
              Guest
            </Button>
          </DialogActions>
        </Dialog>
        <Container fluid={true}>
          <div className="form-create">
            <FormGroup row>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={toogle}
              >
                +Create
              </Button>
              <Col>
                <Row>
                  <TextField
                    name="search"
                    type="text"
                    variant="outlined"
                    value={find}
                    placeholder="Search by name document"
                    onChange={(event) => {
                      setFind(event.target.value);
                    }}
                    size="small"
                    fullWidth
                    style={{ marginLeft: 20 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Row>
              </Col>

              <FormControl
                size="small"
                variant="outlined"
                style={{ marginLeft: 20 }}
              >
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <MenuItem onClick={All} value="1">
                    All
                  </MenuItem>
                  <MenuItem onClick={Contract} value="2">
                    Contract
                  </MenuItem>
                  <MenuItem onClick={Invoice} value="3">
                    Invoice
                  </MenuItem>
                </Select>
              </FormControl>
              <Col>
                <Row>
                  <Paper
                    square
                    elevation={0}
                    style={{ position: "absolute", right: 0, height: 40 }}
                  >
                    <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={handleChange}
                    >
                      <Tab
                        style={{ fontWeight: "bold" }}
                        value={3}
                        onClick={Signed}
                        label="Signed"
                      />
                      <Tab
                        style={{ fontWeight: "bold" }}
                        value={2}
                        onClick={NotSigned}
                        label="Not signed"
                      />
                    </Tabs>
                  </Paper>
                </Row>
              </Col>
            </FormGroup>
            <TablePagination
              hidden={find !== "" ? true : false}
              component="div"
              count={postList.length}
              page={page}
              onChangePage={changePage}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage=""
              rowsPerPageOptions={[]}
            />
          </div>
          {loading ? (
            <ScaleLoader color={"#2512DF"} loading={loading} size={40} />
          ) : (
            <TableContainer
              hidden={find !== "" ? true : false}
              style={{ maxHeight: "650px" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead style={{ backgroundColor: "blue" }}>
                  <TableRow>
                    <TableCell
                      style={{
                        textAlign: "center",
                        background: "#3f51b5",
                        color: "white",
                      }}
                    >
                      Creator name
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        background: "#3f51b5",
                        color: "white",
                      }}
                    >
                      Title document
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        background: "#3f51b5",
                        color: "white",
                      }}
                    >
                      Processing
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        background: "#3f51b5",
                        color: "white",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        background: "#3f51b5",
                        color: "white",
                      }}
                    >
                      Date create
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        background: "#3f51b5",
                        color: "white",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPosts.map((doc) => {
                    return (
                      <TableRow hover tabIndex={-1} key={doc.id}>
                        <TableCell
                          style={{ textAlign: "center" }}
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                        >
                          <GetCreater id={doc.creatorId} />
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          {doc.title}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          <Label className="step">
                            {doc.contractUrl ? (
                              <ContractStepper
                                value={doc.status === 3 ? 0 : doc.status}
                              />
                            ) : (
                              <div style={{ marginRight: 70 }}>
                                <InvoiceStepper
                                  value={
                                    doc.status === 2
                                      ? 1
                                      : doc.status === 3
                                      ? 0
                                      : doc.status
                                  }
                                />
                              </div>
                            )}
                          </Label>
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          <Label>
                            {doc.invoiceURL ? (
                              <img
                                hidden={doc.status === 2 ? false : true}
                                src={invoicecompleted}
                                alt=""
                              />
                            ) : (
                              <img
                                hidden={doc.status === 2 ? false : true}
                                src={done}
                                alt=""
                              />
                            )}
                            <img
                              hidden={doc.status < 2 ? false : true}
                              src={notsigned}
                              alt=""
                            />
                            {doc.status === 3 && (
                              <img
                                className="not-sign"
                                src={expiration}
                                alt=""
                              />
                            )}
                          </Label>
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          {Moment(doc.dateCreate).format("DD/MM/YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Label hidden={doc.status === 0 || doc.status===3 ? false : true}>
                            <DeleteIcon
                              onClick={() => {
                                setDel(true);
                                setDocumentDelete(doc);
                              }}
                              fontSize="default"
                              style={{ cursor: "pointer" }}
                            />
                          </Label>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TableContainer
            hidden={find === "" ? true : false}
            style={{ maxHeight: "750px" }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      textAlign: "center",
                      background: "#3f51b5",
                      color: "white",
                    }}
                  >
                    Creator name
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      background: "#3f51b5",
                      color: "white",
                    }}
                  >
                    Title document
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      background: "#3f51b5",
                      color: "white",
                    }}
                  >
                    Processing
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      background: "#3f51b5",
                      color: "white",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      background: "#3f51b5",
                      color: "white",
                    }}
                  >
                    Date create
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      background: "#3f51b5",
                      color: "white",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postList
                  .filter((data) => {
                    if (data.title.toLowerCase().includes(find.toLowerCase())) {
                      return data;
                    }
                  })
                  .map((doc) => {
                    return (
                      <TableRow hover tabIndex={-1} key={doc.id}>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          <GetCreater id={doc.creatorId} />
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          {doc.title}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          <Label className="step">
                            {doc.contractUrl ? (
                              <ContractStepper
                                value={doc.status === 3 ? 0 : doc.status}
                              />
                            ) : (
                              <div style={{ marginRight: 70 }}>
                                <InvoiceStepper
                                  value={
                                    doc.status === 2
                                      ? 1
                                      : doc.status === 3
                                      ? 0
                                      : doc.status
                                  }
                                />
                              </div>
                            )}
                          </Label>
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          <Label>
                            {doc.invoiceURL ? (
                              <img
                                hidden={doc.status === 2 ? false : true}
                                src={invoicecompleted}
                                alt=""
                              />
                            ) : (
                              <img
                                hidden={doc.status === 2 ? false : true}
                                src={done}
                                alt=""
                              />
                            )}
                            <img
                              hidden={doc.status < 2 ? false : true}
                              src={notsigned}
                              alt=""
                            />
                            {doc.status === 3 && (
                              <img
                                className="not-sign"
                                src={expiration}
                                alt=""
                              />
                            )}
                          </Label>
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            if (doc.contractUrl) {
                              history.push({
                                pathname:
                                  "/detail/contract/" +
                                  doc.id +
                                  "/" +
                                  doc.title,
                                state: doc,
                              });
                            } else if (doc.invoiceURL) {
                              history.push({
                                pathname:
                                  "/detail/invoice/" + doc.id + "/" + doc.title,
                                state: doc,
                              });
                            }
                          }}
                          style={{ textAlign: "center" }}
                        >
                          {Moment(doc.dateCreate).format("DD/MM/YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <Label hidden={doc.status === 0 || doc.status===3 ? false : true}>
                            <DeleteIcon
                              onClick={() => {
                                setDel(true);
                                setDocumentDelete(doc);
                              }}
                              fontSize="default"
                              style={{ cursor: "pointer" }}
                            />
                          </Label>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            open={dele}
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
          >
            <DialogTitle>{"Are you sure delete document?"}</DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setDel(!dele)}
                color="secondary"
                variant="contained"
              >
                No
              </Button>
              <Button
                onClick={deleteDocument}
                color="primary"
                variant="contained"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </main>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Document;
