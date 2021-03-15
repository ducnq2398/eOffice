import { Container, Form, FormGroup, Label, Row, Col, Table } from "reactstrap";
import Header from "../Nav/Header";
import "../../css/Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import notsigned from "../../images/status.png";
import doneinvoice from "../../images/invoicecompleted.png";
import done from "../../images/true.png";
import invoiceAPI from "../../api/invoiceAPI";
import { getUser } from "../../utils/Common";
import contractAPI from "../../api/contractAPI";
import ScaleLoader from "react-spinners/ScaleLoader";
import moment from "moment";
import notiAPI from "../../api/notiAPI";

function Dashboard() {
  const history = useHistory();
  const [listAllInvoice, setListAllInvoice] = useState([]);
  const [listAllContract, setListAllContract] = useState([]);
  const [listContractById, setListContractById] = useState([]);
  const [listInvoiceById, setListInvoiceById] = useState([]);
  const [noti, setNoti] = useState([]);
  const [currentPage] = useState(1);
  const [postPerPage] = useState(5);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPostsContract = [];
  const currentPostsInvoice = [];
  let [loadingInvoice, setLoadingInvoice] = useState(true);
  let [loadingContract, setLoadingContract] = useState(true);
  var listNoti = noti
    .sort((a, b) => {
      return (
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
      );
    })
    .reverse();
  const currentPostsNoti = listNoti.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    async function fetListNoti() {
      try {
        const res = await notiAPI.getAll();
        setNoti(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetListNoti();
  }, []);

  useEffect(() => {
    async function getAllContrac() {
      try {
        await contractAPI
          .getContractByCompanyId(getUser().CompanyId)
          .then(function (res) {
            setListAllContract(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setLoadingContract(false);
    }, 1000);
    getAllContrac();
  }, []);

  useEffect(() => {
    async function getAllInvoice() {
      try {
        await invoiceAPI
          .getInvoiceByCompanyId(getUser().CompanyId)
          .then(function (res) {
            setListAllInvoice(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setLoadingInvoice(false);
    }, 1000);
    getAllInvoice();
  }, []);
  
  useEffect(() => {
    async function getInvoiceById() {
      try {
        await invoiceAPI
          .getInvoiceByViewerId(getUser().Id)
          .then(function (res) {
            invoiceAPI.getInvoiceBySignerId(getUser().Id).then(function (res2) {
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

  useEffect(() => {
    async function getContractById() {
      try {
        await contractAPI
          .getContractBySignerId(getUser().Id)
          .then(function (res) {
            contractAPI
              .getContractByViewerId(getUser().Id)
              .then(function (res2) {
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

  if (getUser().Role === "1") {
    var postContract = listAllContract
      .sort((a, b) => {
        return (
          new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
        );
      })
      .reverse();
    var postInvoice = listAllInvoice
      .sort((a, b) => {
        return (
          new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
        );
      })
      .reverse();
    currentPostsContract.push(
      postContract.slice(indexOfFirstPost, indexOfLastPost)
    );
    currentPostsInvoice.push(
      postInvoice.slice(indexOfFirstPost, indexOfLastPost)
    );
  }
  if (getUser().Role === "2") {
    var postContract = listContractById
      .sort((a, b) => {
        return (
          new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
        );
      })
      .reverse();
    var postInvoice = listInvoiceById
      .sort((a, b) => {
        return (
          new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
        );
      })
      .reverse();
    currentPostsContract.push(
      postContract.slice(indexOfFirstPost, indexOfLastPost)
    );
    currentPostsInvoice.push(
      postInvoice.slice(indexOfFirstPost, indexOfLastPost)
    );
  }

  return (
    <div>
      <Sidebar />
      <div className="main-panel">
        <Header />
        <Container fluid={true}>
          <div>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Label className="title">Contract</Label>
                  </FormGroup>
                  <FormGroup>
                    {loadingContract ? (
                      <ScaleLoader
                        color={"#2512DF"}
                        loading={loadingContract}
                        size={35}
                      />
                    ) : (
                      <Table hover>
                        <tbody style={{ textAlign: "left" }}>
                          {currentPostsContract[0].map((data) => (
                            <tr
                              key={data.id}
                              onClick={() =>
                                history.push({
                                  pathname:
                                    "/detail/contract/" +
                                    data.id +
                                    "/" +
                                    data.title,
                                  state: data,
                                })
                              }
                            >
                              <td>
                                <p className="demo-2">{data.title}</p>
                              </td>
                              <td>
                                {data.status < 3 ? (
                                  <img src={notsigned} alt="" />
                                ) : (
                                  <img src={done} alt="" />
                                )}
                              </td>
                              <td>
                                {moment(data.dateCreate).format("DD/MM/YYYY")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </FormGroup>
                </Form>
                <div>
                  <Link to="/document">See more</Link>
                </div>
              </Col>
              <Col>
                <Form>
                  <FormGroup>
                    <Label className="title">Invoice</Label>
                  </FormGroup>
                  <FormGroup>
                    {loadingInvoice ? (
                      <ScaleLoader
                        color={"#2512DF"}
                        loading={loadingInvoice}
                        size={35}
                      />
                    ) : (
                      <Table hover>
                        <tbody style={{ textAlign: "left" }}>
                          {currentPostsInvoice[0].map((data) => (
                            <tr
                              key={data.id}
                              onClick={() =>
                                history.push({
                                  pathname:
                                    "/detail/invoice/" +
                                    data.id +
                                    "/" +
                                    data.title,
                                  state: data,
                                })
                              }
                            >
                              <td>
                                <p className="demo-2">{data.title}</p>
                              </td>
                              <td>
                                {data.status < 3 ? (
                                  <img src={notsigned} alt="" />
                                ) : (
                                  <img src={doneinvoice} alt="" />
                                )}
                              </td>
                              <td>
                                {moment(data.dateCreate).format("DD/MM/YYYY")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </FormGroup>
                </Form>
                <div>
                  <Link to="/document">See more</Link>
                </div>
              </Col>
            </Row>
            <Col>
              <Form>
                <FormGroup>
                  <Label className="title">Activity Log</Label>
                </FormGroup>
                <FormGroup>
                  <Table hover style={{ marginTop: 20 }}>
                    <tbody>
                      {currentPostsNoti.map((row) => (
                        <tr
                          key={row.id}
                          style={{
                            background:
                              row.status === 0 ? "#b3aeae75" : "white",
                          }}
                        >
                          <td>
                            <Row style={{ fontWeight: "bold", marginLeft: 1 }}>
                              {row.content}
                            </Row>
                            <Row style={{ marginLeft: 10 }}>{row.title}</Row>
                            <Row style={{ marginLeft: 10 }}>
                              <Link to="/">View detail</Link>
                            </Row>
                          </td>
                          <td style={{ position: "absolute", right: 10 }}>
                            {moment(row.createdDate).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </FormGroup>
              </Form>
              <div>
                <Link to="/notification">See more</Link>
              </div>
            </Col>
          </div>
        </Container>
      </div>
    </div>
  );
}
export default Dashboard;
