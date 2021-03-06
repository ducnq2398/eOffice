import {
  Container,
  Row,
  FormGroup,
  Col,
  Input,
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
import del from "../../images/delete.png";
import notsigned from "../../images/status.png";
import done from "../../images/true.png";
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
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

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
  const [listAllInvoice, setListAllInvoice] = useState([]);
  const [listAllContract, setListAllContract] = useState([]);
  const [listContractById, setListContractById] = useState([]);
  const [listInvoiceById, setListInvoiceById] = useState([]);
  const [data, setData] = useState([]);
  const [find, setFind] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(6);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = [];
  function changePage(event, newPage) {
    setPage(newPage);
  }
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    async function getAllContrac() {
      const id = getUser().CompanyId;
      try {
        await contractAPI.getContractByCompanyId(id).then(function (res) {
          setListAllContract(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getAllContrac();
  }, []);

  useEffect(() => {
    async function getAllInvoice() {
      const id = getUser().CompanyId;
      try {
        await invoiceAPI.getInvoiceByCompanyId(id).then(function (res) {
          setListAllInvoice(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllInvoice();
  }, []);

  useEffect(() => {
    async function getContractById() {
      const id = getUser().Id;
      try {
        await contractAPI.getContractBySignerId(id).then(function (res) {
          contractAPI.getContractByViewerId(id).then(function (res2) {
            const list = [...res.data, ...res2.data];
            setListContractById(list);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getContractById();
  }, [getUser().Id]);

  useEffect(() => {
    async function getInvoiceById() {
      const id = getUser().Id;
      try {
        await invoiceAPI.getInvoiceByViewerId(id).then(function (res) {
          invoiceAPI.getInvoiceBySignerId(id).then(function (res2) {
            const list = [...res.data, ...res2.data];
            setListInvoiceById(list);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getInvoiceById();
  }, [getUser().Id]);

  function Contract() {
    history.push("/contract");
  }
  function Invoice() {
    history.push("/invoice");
  }
  function All() {
    setPostList(data);
  }
  function ListContract() {
    setPostList(
      postList.filter((data) => {
        if (data.status === 1) {
          return data;
        }
      })
    );
  }
  function ListInvoice() {
    setPostList(
      postList.filter((data) => {
        if (data.status === 1) {
          return data;
        }
      })
    );
  }
  function ListSigned(e) {
    e.preventDefault();
    setPostList(
      postList.filter((data) => {
        if (data.status === 3) {
          return data;
        }
      })
    );
  }

  const list = [...listAllInvoice, ...listAllContract];
  const list2 = [...listContractById, ...listInvoiceById];
  function ListNotSigned(e) {
    e.preventDefault();
    setPostList(
      postList.filter((data) => {
        if (data.status !== 3) {
          return data;
        }
      })
    );
  }
  if (getUser().Role === "1") {
    currentPosts.push(list.slice(indexOfFirstPost, indexOfLastPost));
  }
  if (getUser().Role === "2") {
    currentPosts.push(list2.slice(indexOfFirstPost, indexOfLastPost));
  }
  return (
    <div>
      <Sidebar />
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
                <DialogActions>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{marginRight:'15%'}}
                    onClick={Contract}
                  >
                    Contract
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "20%", width:'104px' }}
                    onClick={Invoice}
                  >
                    Invoice
                  </Button>
                </DialogActions>
              </Dialog>
              <Col sm={5}>
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
                    style={{ marginLeft: "10px" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary"/>
                            </InputAdornment>
                        )
                    }}
                  />
                </Row>
              </Col>
              <Col className="col-doc">
                <Input
                  className="selectbox"
                  type="select"
                  defaultValue="1"
                  name="selectDocument"
                >
                  <option value={1} onClick={All}>
                    All
                  </option>
                  <option value={2} onClick={ListContract}>
                    Contract
                  </option>
                  <option value={3} onClick={ListInvoice}>
                    Invoice
                  </option>
                </Input>
              </Col>
              <Col>
                <Row>
                  <Paper
                    square
                    style={{ position: "absolute", right: 0, height: "40px"}}
                  >
                    <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={handleChange}
                    >
                      <Tab value={0} label="All" />
                      <Tab value={1} label="Contract" />
                      <Tab value={2} label="Invoice" />
                    </Tabs>
                  </Paper>
                </Row>
              </Col>
            </FormGroup>
            <TablePagination
              component="div"
              count={getUser().Role === "1" ? list.length : list2.length}
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
                {currentPosts[0].map((doc, key) => (
                  <tr key={key}>
                    <td
                      onClick={() =>
                        history.push({
                          pathname:
                            "/detail/contract/" +
                            doc.id +
                            "/" +
                            doc.description,
                          state: doc,
                        })
                      }
                    >
                      <Label style={{ fontWeight: "bold" }}>Creator name</Label>
                      <br />
                      <Label>
                        <GetCreater id={doc.creatorId} />
                      </Label>
                    </td>
                    <td
                      onClick={() =>
                        history.push({
                          pathname:
                            "/detail/contract/" +
                            doc.id +
                            "/" +
                            doc.description,
                          state: doc,
                        })
                      }
                    >
                      <Label style={{ fontWeight: "bold" }}>
                        Title document
                      </Label>
                      <br />
                      <Label className="demo">{doc.description}</Label>
                    </td>
                    <td
                      onClick={() =>
                        history.push({
                          pathname:
                            "/detail/invoice/" + doc.id + "/" + doc.description,
                          state: doc,
                        })
                      }
                    >
                      <Label style={{ fontWeight: "bold" }}>Status</Label>
                      <br />
                      <Label className="step">
                        <StepDoc activeStep={doc.status + 1} />
                      </Label>
                    </td>
                    <td
                      onClick={() =>
                        history.push({
                          pathname:
                            "/detail/invoice/" + doc.id + "/" + doc.description,
                          state: doc,
                        })
                      }
                    >
                      <Label></Label>
                      <br />
                      <Label>
                        <img
                          hidden={doc.status >= 3 ? false : true}
                          src={done}
                          alt=""
                        />
                        <img
                          hidden={doc.status < 3 ? false : true}
                          src={notsigned}
                          alt=""
                        />
                      </Label>
                    </td>
                    <td
                      onClick={() =>
                        history.push({
                          pathname:
                            "/detail/invoice/" + doc.id + "/" + doc.description,
                          state: doc,
                        })
                      }
                    >
                      <Label style={{ fontWeight: "bold" }}></Label>
                      <br />
                      <Label>{doc.dateCreate.substring(10, 0)}</Label>
                    </td>
                    <td>
                      <Label></Label>
                      <br />
                      <Label hidden={doc.status < 3 ? false : true}>
                        <img
                          src={del}
                          onClick={() => setDel(true)}
                          alt=""
                          width="25px"
                          height="25px"
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
              {getUser().Role === "1"
                ? list
                    .filter((data) => {
                      if (
                        data.description
                          .toLowerCase()
                          .includes(find.toLowerCase())
                      ) {
                        return data;
                      }
                    })
                    .map((data, key) => (
                      <tr key={key}>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/contract/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}>
                            Creator name
                          </Label>
                          <br />
                          <Label>
                            <GetCreater id={data.creatorId} />
                          </Label>
                        </td>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/contract/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}>
                            Title document
                          </Label>
                          <br />
                          <Label className="demo">{data.description}</Label>
                        </td>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/invoice/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}>Status</Label>
                          <br />
                          <Label className="step">
                            <StepDoc activeStep={data.status + 1} />
                          </Label>
                        </td>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/invoice/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
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
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/invoice/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}></Label>
                          <br />
                          <Label>{data.dateCreate.substring(10, 0)}</Label>
                        </td>
                        <td>
                          <Label></Label>
                          <br />
                          <Label hidden={data.status < 3 ? false : true}>
                            <img
                              src={del}
                              onClick={() => setDel(true)}
                              alt=""
                              width="25px"
                              height="25px"
                            />
                          </Label>
                        </td>
                      </tr>
                    ))
                : list2
                    .filter((data) => {
                      if (
                        data.description
                          .toLowerCase()
                          .includes(find.toLowerCase())
                      ) {
                        return data;
                      }
                    })
                    .map((data, key) => (
                      <tr key={key}>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/contract/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}>
                            Creator name
                          </Label>
                          <br />
                          <Label>
                            <GetCreater id={data.creatorId} />
                          </Label>
                        </td>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/contract/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}>
                            Title document
                          </Label>
                          <br />
                          <Label className="demo">{data.description}</Label>
                        </td>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/invoice/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}>Status</Label>
                          <br />
                          <Label className="step">
                            <StepDoc activeStep={data.status + 1} />
                          </Label>
                        </td>
                        <td
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/invoice/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
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
                          onClick={() =>
                            history.push({
                              pathname:
                                "/detail/invoice/" +
                                data.id +
                                "/" +
                                data.description,
                              state: data,
                            })
                          }
                        >
                          <Label style={{ fontWeight: "bold" }}></Label>
                          <br />
                          <Label>{data.dateCreate.substring(10, 0)}</Label>
                        </td>
                        <td>
                          <Label></Label>
                          <br />
                          <Label hidden={data.status < 3 ? false : true}>
                            <img
                              src={del}
                              onClick={() => setDel(true)}
                              alt=""
                              width="25px"
                              height="25px"
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
              <Button color="secondary" onClick={() => setDel(!dele)}>
                No
              </Button>{" "}
              <Button color="primary">Yes</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    </div>
  );
}
export default Document;
