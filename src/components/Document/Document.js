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
import Header from "../Nav/Header";
import "../../css/Document.css";
import TablePagination from "@material-ui/core/TablePagination";
import Sidebar from "../Sidebar/Sidebar";
import { forwardRef, useEffect, useState } from "react";
import notsigned from "../../images/status.png";
import done from "../../images/true.png";
import invoicecompleted from "../../images/invoicecompleted.png";
import choo from "../../images/choo.png";
import StepDoc from "../Sidebar/StepDoc";
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
import StepDoc2 from "../Sidebar/StepDoc2";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Document() {
  const history = useHistory();
  let [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [dele, setDel] = useState(false);
  const toogle = () => setIsOpen(!isOpen);
  const [postList, setPostList] = useState([]);
  const [listAllDocument, setListAllDocument] = useState([]);
  const [listDocumentById, setListDocumentById] = useState([]);
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
    async function getAllDocument() {
      const id = getUser().CompanyId;
      try {
        await contractAPI.getContractByCompanyId(id).then(function (res) {
          invoiceAPI.getInvoiceByCompanyId(id).then(function (res2) {
            const list = [...res.data, ...res2.data];
            setListAllDocument(list);
            if (getUser().Role === "1") {
              setPostList(list);
              setData(list);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getAllDocument();
  }, []);

  useEffect(() => {
    async function getDocumentById() {
      const id = getUser().Id;
      try {
        await invoiceAPI.getInvoiceByViewerId(id).then(function (res) {
          invoiceAPI.getInvoiceBySignerId(id).then(function (res2) {
            contractAPI.getContractByViewerId(id).then(function (res3) {
              contractAPI.getContractBySignerId(id).then(function (res4) {
                const list = [
                  ...res.data,
                  ...res2.data,
                  ...res3.data,
                  ...res4.data,
                ];
                setListDocumentById(list);
                if (getUser().Role === "2") {
                  setPostList(list);
                  setData(list);
                }
              });
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getDocumentById();
  }, [getUser().Id]);

  function AddContract() {
    history.push("/contract");
  }
  function AddInvoice() {
    history.push("/invoice");
  }
  const [data, setData] = useState([]);
  function All() {
    setPage(0)
    if (getUser().Role === "1") {
      setPostList(listAllDocument);
      setData(listAllDocument);
    } else if (getUser().Role === "2") {
      setPostList(listDocumentById);
      setData(listDocumentById);
    }
    setValue(0);
  }
  function Invoice() {
    setPage(0)
    if (getUser().Role === "1") {
      setPostList(
        listAllDocument.filter((data) => {
          if (data.invoiceURL) {
            return data;
          }
        })
      );
      setData(
        listAllDocument.filter((data) => {
          if (data.invoiceURL) {
            return data;
          }
        })
      );
    } else if (getUser().Role === "2") {
      setPostList(
        listDocumentById.filter((data) => {
          if (data.invoiceURL) {
            return data;
          }
        })
      );
      setData(
        listDocumentById.filter((data) => {
          if (data.invoiceURL) {
            return data;
          }
        })
      );
    }
    setValue(0);
  }
  function Contract() {
    setPage(0)
    if (getUser().Role === "1") {
      setPostList(
        listAllDocument.filter((data) => {
          if (data.contractUrl) {
            return data;
          }
        })
      );
      setData(
        listAllDocument.filter((data) => {
          if (data.contractUrl) {
            return data;
          }
        })
      );
    } else if (getUser().Role === "2") {
      setPostList(
        listDocumentById.filter((data) => {
          if (data.contractUrl) {
            return data;
          }
        })
      );
      setData(
        listDocumentById.filter((data) => {
          if (data.contractUrl) {
            return data;
          }
        })
      );
    }
    setValue(0);
  }
  function Signed() {
    setPage(0);
    setPostList(
      data.filter((data) => {
        if (data.status === 3) {
          return data;
        }
      })
    );
  }
  function NotSigned() {
    setPage(0);
    setPostList(
      data.filter((data) => {
        if (data.status < 3) {
          return data;
        }
      })
    );
  }

  return (
    <div>
      <Sidebar />
      <Dialog
                open={isOpen}
                onClose={toogle}
                TransitionComponent={Transition}
              >
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
                <DialogActions style={{paddingBottom: '30px'}}>
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
      <div className="main-content">
        <Header />
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
                    style={{marginLeft:20}}
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
                  style={{marginLeft: 20}}
                >
                  <Select defaultValue={1}>
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
                  <Paper square elevation={0} style={{ position: "absolute", right: 0, height:40}}>
                    <Tabs
                      value={value}
                      indicatorColor="none"
                      textColor="primary"
                      onChange={handleChange}
                    >
                      <Tab value={3} onClick={Signed} label="Signed" />
                      <Tab value={2} onClick={NotSigned} label="Not signed" />
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
                              "/detail/contract/" +
                              doc.id +
                              "/" +
                              doc.title,
                            state: doc,
                          });
                        } else if (doc.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" +
                              doc.id +
                              "/" +
                              doc.title,
                            state: doc,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>Creator name</Label>
                      <br />
                      <Label>
                        <GetCreater id={doc.creatorId} />
                      </Label>
                    </td>
                    <td
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
                              "/detail/invoice/" +
                              doc.id +
                              "/" +
                              doc.title,
                            state: doc,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>
                        Title document
                      </Label>
                      <br />
                      <Label className="demo">{doc.title}</Label>
                    </td>
                    <td
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
                              "/detail/invoice/" +
                              doc.id +
                              "/" +
                              doc.title,
                            state: doc,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>Status</Label>
                      <br />
                      <Label className="step">
                        {doc.contractUrl ? (
                          <StepDoc activeStep={doc.status + 1} />
                        ) : (
                          <StepDoc2 activeStep={doc.status + 1} />
                        )}
                      </Label>
                    </td>
                    <td
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
                              "/detail/invoice/" +
                              doc.id +
                              "/" +
                              doc.title,
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
                              "/detail/contract/" +
                              doc.id +
                              "/" +
                              doc.title,
                            state: doc,
                          });
                        } else if (doc.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" +
                              doc.id +
                              "/" +
                              doc.title,
                            state: doc,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}></Label>
                      <br />
                      <Label>
                        {Moment(doc.dateCreate).format("DD/MM/YYYY")}
                      </Label>
                    </td>
                    <td>
                      <Label></Label>
                      <br />
                      <Label hidden={doc.status < 3 ? false : true}>
                        <DeleteIcon
                          onClick={() => setDel(true)}
                          fontSize="default"
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
                  if (
                    data.title.toLowerCase().includes(find.toLowerCase())
                  ) {
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
                              "/detail/contract/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>Creator name</Label>
                      <br />
                      <Label>
                        <GetCreater id={data.creatorId} />
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>
                        Title document
                      </Label>
                      <br />
                      <Label className="demo">{data.title}</Label>
                    </td>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        }
                      }}
                    >
                      <Label style={{ fontWeight: "bold" }}>Status</Label>
                      <br />
                      <Label className="step">
                        <StepDoc activeStep={data.status + 1} />
                      </Label>
                    </td>
                    <td
                      onClick={() => {
                        if (data.contractUrl) {
                          history.push({
                            pathname:
                              "/detail/contract/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" +
                              data.id +
                              "/" +
                              data.title,
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
                              "/detail/contract/" +
                              data.id +
                              "/" +
                              data.title,
                            state: data,
                          });
                        } else if (data.invoiceURL) {
                          history.push({
                            pathname:
                              "/detail/invoice/" +
                              data.id +
                              "/" +
                              data.title,
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
              <Button color="secondary" variant="contained" style={{marginRight:'5px'}} onClick={() => setDel(!dele)}>
                No
              </Button>
              <Button color="primary" variant="contained">Yes</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </div>
  );
}
export default Document;
