import { Container, Form, FormGroup, Label, Row, Col, Table } from "reactstrap";
import "../../css/Dashboard.css";
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
import Navbar from "../Navbar/Navbar";
import notDoc from "../../images/1.png";

function Dashboard() {
  const history = useHistory();
  const [noti, setNoti] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [listContract, setListContract] = useState([]);
  const [listInvoice, setListInvoice] = useState([]);
  const [currentPage] = useState(1);
  const [postPerPage] = useState(5);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  console.log(noti);
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
  const currentPostsInvoice = invoice.slice(indexOfFirstPost, indexOfLastPost);
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
        const res = await notiAPI.getById(getUser().Id);
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
                  setTimeout(() => {
                    setLoadingContract(false);
                  }, 2000);
                  setTimeout(() => {
                    setLoadingInvoice(false);
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
                          const listInvoice1 = [...res1.data, ...res2.data];
                          const listContract1 = [...res3.data, ...res4.data];
                          setListInvoice(listInvoice1);
                          setListContract(listContract1);
                          if (listInvoice1 === "") {
                            setHidden(false);
                          } else {
                            setHidden(true);
                          }
                          setTimeout(() => {
                            setLoadingContract(false);
                          }, 2000);
                          setTimeout(() => {
                            setLoadingInvoice(false);
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

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main-panel">
        <Container fluid>
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
                        <tbody>
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
                                <p
                                  style={{ textAlign: "left" }}
                                  className="demo-2"
                                >
                                  {data.title}
                                </p>
                              </td>
                              <td>
                                {data.status < 2 ? (
                                  <img src={notsigned} alt="" />
                                ) : (
                                  <img src={done} alt="" />
                                )}
                              </td>
                              <td style={{ textAlign: "right" }}>
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
                  <Link
                    to="/document"
                    hidden={listContract.length > 5 ? false : true}
                  >
                    See more
                  </Link>
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
                        <tbody>
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
                                <p
                                  style={{ textAlign: "left" }}
                                  className="demo-2"
                                >
                                  {data.title}
                                </p>
                              </td>
                              <td>
                                {data.status < 2 ? (
                                  <img src={notsigned} alt="" />
                                ) : (
                                  <img src={doneinvoice} alt="" />
                                )}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                {moment(data.dateCreate).format("DD/MM/YYYY")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {/* <img src={notDoc} alt="" width="300px" height="300px" /> */}
                      </Table>
                    )}
                  </FormGroup>
                </Form>
                <div>
                  <Link
                    to="/document"
                    hidden={listInvoice.length > 5 ? false : true}
                  >
                    See more
                  </Link>
                </div>
              </Col>
            </Row>

            <Form>
              <FormGroup>
                <Label className="title">Activity Log</Label>
              </FormGroup>
              <FormGroup>
                <Table hover style={{ marginTop: 20 }}>
                  <tbody>
                    {currentPostsNoti.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <Row style={{ fontWeight: "bold", marginLeft: 1 }}>
                            {row.content}
                          </Row>
                          <Row style={{ marginLeft: 10 }}>{row.title}</Row>
                          <Row style={{ marginLeft: 10 }}>
                            <Link
                              onClick={() => {
                                if (row.title.includes("Contract")) {
                                  const params = {
                                    id: row.id,
                                    status: 1,
                                  };
                                  notiAPI
                                    .changeStatus(params)
                                    .catch(function (error) {
                                      console.log(error);
                                    });
                                  history.push({
                                    pathname:
                                      "/detail/contract/" +
                                      row.objectId +
                                      "/" +
                                      row.content,
                                  });
                                } else {
                                  const params = {
                                    id: row.id,
                                    status: 1,
                                  };
                                  notiAPI
                                    .changeStatus(params)
                                    .catch(function (error) {
                                      console.log(error);
                                    });
                                  history.push({
                                    pathname:
                                      "/detail/invoice/" +
                                      row.objectId +
                                      "/" +
                                      row.content,
                                  });
                                }
                              }}
                            >
                              View detail
                            </Link>
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
              <Link
                to="/notification"
                hidden={listNoti.length > 5 ? false : true}
              >
                See more
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
export default Dashboard;
