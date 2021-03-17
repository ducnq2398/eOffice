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
  const [noti, setNoti] = useState([]);
  const [listContract, setListContract] = useState([]);
  const [listInvoice, setListInvoice] = useState([]);
  const [currentPage] = useState(1);
  const [postPerPage] = useState(5);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const invoice = listInvoice
    .sort((a, b) => {
      return (
        new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
      );
    })
    .reverse();
  const contract = listContract
    .sort((a, b) => {
      return (
        new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
      );
    })
    .reverse();
  const currentPostsContract = contract.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const currentPostsInvoice = invoice.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
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
    async function getListDocument() {
      try {
        if (getUser().Role === "1") {
          await contractAPI
            .getContractByCompanyId(getUser().CompanyId)
            .then(function (contract) {
              invoiceAPI
                .getInvoiceByCompanyId(getUser().CompanyId)
                .then(function (invoice) {
                  setListInvoice(invoice.data);
                  setListContract(contract.data);
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
                          const listInvoice1 = [...res1.data, ...res2.data];
                          const listContract1 = [...res3.data, ...res4.data];
                          setListInvoice(listInvoice1);
                          setListContract(listContract1);
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
    setTimeout(() => {
      setLoadingContract(false);
    }, 2000);
    setTimeout(() => {
      setLoadingInvoice(false);
    }, 2000);
  }, []);
  
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
                          {currentPostsContract.map((data) => (
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
                          {currentPostsInvoice.map((data) => (
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
