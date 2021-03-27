import {
  Container,
  Row,
  FormGroup,
  Col,
  Table,
  Label,
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

import "../../css/Document.css";
import TablePagination from "@material-ui/core/TablePagination";
import { forwardRef, useEffect, useState } from "react";
import notsigned from "../../images/status.png";
import done from "../../images/true.png";
import invoicecompleted from "../../images/invoicecompleted.png";
import choo from "../../images/choo.png";
import invoiceAPI from "../../api/invoiceAPI";
import GetCreater from "../GetData/GetCreater";
import { useHistory } from "react-router-dom";
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
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete";
import Navbar from "../Navbar/Navbar";
import InvoiceStepper from "../Stepper/InvoiceStepper";
import ContractStepper from "../Stepper/ContractStepper";
import moment from "moment";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Document() {
  const history = useHistory();
  let [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [dele, setDel] = useState(false);
  const toogle = () => setIsOpen(!isOpen);
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
                  setListAllDocument(
                    list.filter((row) => {
                      if (
                        row.status !== 0 &&
                        moment(row.dateExpire).format("DD/MM/YYYY HH:mm:ss") <
                          moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                      ) {
                        return row;
                      }
                    })
                  );
                  setPostList(
                    list.filter((row) => {
                      if (
                        row.status !== 0 &&
                        moment(row.dateExpire).format("DD/MM/YYYY HH:mm:ss") <
                          moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                      ) {
                        return row;
                      }
                    })
                  );
                  setListInvoice(
                    invoice.data.filter((row) => {
                      if (
                        row.status !== 0 &&
                        moment(row.dateExpire).format("DD/MM/YYYY HH:mm:ss") <
                          moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                      ) {
                        return row;
                      }
                    })
                  );
                  setListContract(
                    contract.data.filter((row) => {
                      if (
                        row.status !== 0 &&
                        moment(row.dateExpire).format("DD/MM/YYYY HH:mm:ss") <
                          moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
                      ) {
                        return row;
                      }
                    })
                  );
                  setTimeout(() => {
                    setLoading(false);
                  }, 2000);
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
                          setListAllDocument(
                            list.filter((row) => {
                              if (
                                row.status !== 0 &&
                                moment(row.dateExpire).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                ) <
                                  moment(new Date()).format(
                                    "DD/MM/YYYY HH:mm:ss"
                                  )
                              ) {
                                return row;
                              }
                            })
                          );
                          setPostList(
                            list.filter((row) => {
                              if (
                                row.status !== 0 &&
                                moment(row.dateExpire).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                ) <
                                  moment(new Date()).format(
                                    "DD/MM/YYYY HH:mm:ss"
                                  )
                              ) {
                                return row;
                              }
                            })
                          );
                          setListInvoice(
                            listInvoice1.filter((row) => {
                              if (
                                row.status !== 0 &&
                                moment(row.dateExpire).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                ) <
                                  moment(new Date()).format(
                                    "DD/MM/YYYY HH:mm:ss"
                                  )
                              ) {
                                return row;
                              }
                            })
                          );
                          setListContract(
                            listContract1.filter((row) => {
                              if (
                                row.status !== 0 &&
                                moment(row.dateExpire).format(
                                  "DD/MM/YYYY HH:mm:ss"
                                ) <
                                  moment(new Date()).format(
                                    "DD/MM/YYYY HH:mm:ss"
                                  )
                              ) {
                                return row;
                              }
                            })
                          );
                          setTimeout(() => {
                            setLoading(false);
                          }, 2000);
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

  function AddContract() {
    history.push("/contract");
  }
  function AddInvoice() {
    history.push("/invoice");
  }

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
          if (data.status === 3) {
            return data;
          }
        })
      );
    } else if (filter === "2") {
      setPostList(
        listContract.filter((data) => {
          if (data.status === 3) {
            return data;
          }
        })
      );
    } else {
      setPostList(
        listInvoice.filter((data) => {
          if (data.status === 3) {
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
          if (data.status < 3) {
            return data;
          }
        })
      );
    } else if (filter === "2") {
      setPostList(
        listContract.filter((data) => {
          if (data.status < 3) {
            return data;
          }
        })
      );
    } else {
      setPostList(
        listInvoice.filter((data) => {
          if (data.status < 3) {
            return data;
          }
        })
      );
    }
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main-panel">
        <Dialog open={isOpen} onClose={toogle} TransitionComponent={Transition}>
          <DialogContent>
            <img
              style={{ marginLeft: "20%" }}
              src={choo}
              alt=""
              width="280px"
              height="280px"
            />
          </DialogContent>
          <DialogTitle>
            Please select the type of document you want create?
          </DialogTitle>
          <DialogActions style={{ paddingBottom: "30px" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "15%" }}
              onClick={AddContract}
            >
              Contract
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "20%", width: "104px" }}
              onClick={AddInvoice}
            >
              Invoice
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
                  defaultValue={1}
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
            <Table hidden={find !== "" ? true : false} hover>
              <tbody>
                {currentPosts.map((doc, key) => (
                  <tr key={key}>
                    <td
                      onClick={() => {
                        if (doc.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + doc.id + "/" + doc.title,
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
                      <Label style={{ fontWeight: "bold" }}>Creator name</Label>
                      <br />
                      <Label className="demo-2">
                        <GetCreater id={doc.creatorId} />
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (doc.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + doc.id + "/" + doc.title,
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
                      <Label style={{ fontWeight: "bold" }}>
                        Title document
                      </Label>
                      <br />
                      <Label className="demo demo-2">{doc.title}</Label>
                    </td>
                    <td
                      onClick={() => {
                        if (doc.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + doc.id + "/" + doc.title,
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
                      <Label style={{ fontWeight: "bold" }}>Status</Label>
                      <br />
                      <Label className="step">
                        {doc.contractUrl ? (
                          <ContractStepper value={doc.status} />
                        ) : (
                          <div>
                            <InvoiceStepper value={doc.status} />
                          </div>
                        )}
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (doc.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + doc.id + "/" + doc.title,
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
                      <Label></Label>
                      <br />
                      <Label>
                        {doc.invoiceURL ? (
                          <img
                            hidden={doc.status >= 3 ? false : true}
                            src={invoicecompleted}
                            alt=""
                          />
                        ) : (
                          <img
                            hidden={doc.status >= 3 ? false : true}
                            src={done}
                            alt=""
                          />
                        )}
                        <img
                          hidden={doc.status < 3 ? false : true}
                          src={notsigned}
                          alt=""
                        />
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (doc.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + doc.id + "/" + doc.title,
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
                      <Label style={{ fontWeight: "bold" }}></Label>
                      <br />
                      <Label>
                        {Moment(doc.dateCreate).format("DD/MM/YYYY HH:mm:ss")}
                      </Label>
                    </td>
                    <td>
                      <Label></Label>
                      <br />
                      <Label hidden={doc.status < 3 ? false : true}>
                        <DeleteIcon
                          onClick={() => setDel(true)}
                          fontSize="default"
                          style={{ cursor: "pointer" }}
                        />
                      </Label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Table hover hidden={find === "" ? true : false}>
            <tbody>
              {postList
                .filter((data) => {
                  if (data.title.toLowerCase().includes(find.toLowerCase())) {
                    return data;
                  }
                })
                .map((data, key) => (
                  <tr key={key}>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + data.id + "/" + data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" + data.id + "/" + data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>Creator name</Label>
                      <br />
                      <Label className="demo-2">
                        <GetCreater id={data.creatorId} />
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + data.id + "/" + data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" + data.id + "/" + data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>
                        Title document
                      </Label>
                      <br />
                      <Label className="demo demo-2">{data.title}</Label>
                    </td>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + data.id + "/" + data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" + data.id + "/" + data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>Status</Label>
                      <br />
                      <Label className="step">F
                        {data.contractUrl ? (
                          <ContractStepper value={data.status} />
                        ) : (
                          <div>
                            <InvoiceStepper value={data.status} />
                          </div>
                        )}
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + data.id + "/" + data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" + data.id + "/" + data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label></Label>
                      <br />
                      <Label>
                        <img
                          hidden={data.status >= 3 ? false : true}
                          src={done}
                          alt=""
                        />
                        <img
                          hidden={data.status < 3 ? false : true}
                          src={notsigned}
                          alt=""
                        />
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" + data.id + "/" + data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" + data.id + "/" + data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}></Label>
                      <br />
                      <Label>
                        {Moment(data.dateCreate).format("DD/MM/YYYY")}
                      </Label>
                    </td>
                    <td>
                      <Label></Label>
                      <br />
                      <Label hidden={data.status < 3 ? false : true}>
                        <DeleteIcon
                          onClick={() => setDel(true)}
                          fontSize="default"
                          style={{ cursor: "pointer" }}
                        />
                      </Label>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal isOpen={dele}>
            <ModalHeader>Are you sure delete document?</ModalHeader>
            <ModalFooter>
              <Button
                color="secondary"
                variant="contained"
                style={{ marginRight: "5px" }}
                onClick={() => setDel(!dele)}
              >
                No
              </Button>
              <Button color="primary" variant="contained">
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        </Container>
      </main>
    </div>
  );
}
export default Document;
