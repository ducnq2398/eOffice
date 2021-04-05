import { Container, Row, Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import "../../css/Notification.css";
import TablePagination from "@material-ui/core/TablePagination";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import notiAPI from "../../api/notiAPI";
import moment from "moment";
import Navbar from "../Navbar/Navbar";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { getUser } from "../../utils/Common";

function Notification() {
  const history = useHistory();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const [filter, setFilter] = useState([]);
  const [filterByStatus, setFilterByStatus] = useState("1");
  const [filterByType, setFilterByType] = useState("1");
  const handleChange = (event) => {
    setFilterByStatus(event.target.value);
  };
  const handleChange2 = (event) => {
    setFilterByType(event.target.value);
  };
  const currentPost = filter.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    async function fetListNoti() {
      await notiAPI
        .getById(getUser().Id)
        .then(function (res) {
          setFilter(
            res.data.sort((a, b) => {
              return (
                new Date(b.dateCreate).getTime() -
                new Date(a.dateCreate).getTime()
              );
            })
          );
          setAll(
            res.data.sort((a, b) => {
              return (
                new Date(b.dateCreate).getTime() -
                new Date(a.dateCreate).getTime()
              );
            })
          );
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetListNoti();
  }, []);
  function changePage(event, newPage) {
    setPage(newPage);
  }
  function filterSeen() {
    if (filterByType === "1") {
      setFilter(
        all
          .filter((data) => {
            if (data.status === 1) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
            );
          })
      );
    } else if (filterByType === "2") {
      setFilter(
        all
          .filter((data) => {
            if (data.title.includes("Contract") && data.status === 1) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
            );
          })
      );
    } else {
      setFilter(
        all
          .filter((data) => {
            if (data.title.includes("Invoice") && data.status === 1) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
            );
          })
      );
    }
  }
  function filterNotSeen() {
    if (filterByType === "1") {
      setFilter(
        all
          .filter((data) => {
            if (data.status === 0) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
            );
          })
      );
    } else if (filterByType === "2") {
      setFilter(
        all
          .filter((data) => {
            if (data.title.includes("Contract") && data.status === 0) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
            );
          })
      );
    } else {
      setFilter(
        all
          .filter((data) => {
            if (data.title.includes("Invoice") && data.status === 0) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
            );
          })
      );
    }
  }
  function filterAll() {
    if (filterByType === "1") {
      setFilter(
        all.sort((a, b) => {
          return (
            new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime()
          );
        })
      );
    } else if (filterByType === "2") {
      setFilter(
        all
          .filter((data) => {
            if (data.title.includes("Contract")) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(b.dateCreate).getTime() -
              new Date(a.dateCreate).getTime()
            );
          })
      );
    } else {
      setFilter(
        all
          .filter((data) => {
            if (data.title.includes("Invoice")) {
              return data;
            }
          })
          .sort((a, b) => {
            return (
              new Date(a.dateCreate).getTime() -
              new Date(b.dateCreate).getTime()
            );
          })
          .reverse()
      );
    }
  }
  function allNoti() {
    setFilter(
      all.sort((a, b) => {
        return (
          new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime()
        );
      })
    );
    setFilterByStatus("1");
  }
  function allNotiContract() {
    setFilter(
      all
        .filter((data) => {
          if (data.title.includes("Contract")) {
            return data;
          }
        })
        .sort((a, b) => {
          return (
            new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime()
          );
        })
    );
    setFilterByStatus("1");
  }
  function allNotiInvoice() {
    setFilter(
      all
        .filter((data) => {
          if (data.title.includes("Invoice")) {
            return data;
          }
        })
        .sort((a, b) => {
          return (
            new Date(b.dateCreate).getTime() - new Date(a.dateCreate).getTime()
          );
        })
    );
    setFilterByStatus("1");
  }
  function seenAllNotifications(e) {
    e.preventDefault();
    notiAPI
      .seenAllNotifications(getUser().Id)
      .then(function () {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="main-panel">
        <Container fluid>
          <Row>
            <p
              style={{
                float: "left",
                fontSize: "18px",
                marginTop: "20px",
                marginLeft: 10,
              }}
            >
              Notification management
            </p>
            <Button
              style={{ position: "absolute", right: 0, marginTop: "20px" }}
              color="primary"
              onClick={seenAllNotifications}
            >
              Mark all announcements as read
            </Button>
          </Row>
          <Row>
            <FormControl variant="outlined" size="small">
              <Select
                style={{ marginLeft: 10, width: 160 }}
                value={filterByType}
                onChange={handleChange2}
              >
                <MenuItem onClick={allNoti} value="1">
                  All
                </MenuItem>
                <MenuItem onClick={allNotiContract} value="2">
                  Contract
                </MenuItem>
                <MenuItem onClick={allNotiInvoice} value="3">
                  Invoice
                </MenuItem>
              </Select>
              <FormHelperText>-Filter by type-</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" size="small">
              <Select
                style={{ marginLeft: 10, width: 160 }}
                value={filterByStatus}
                onChange={handleChange}
              >
                <MenuItem onClick={filterAll} value="1">
                  All
                </MenuItem>
                <MenuItem onClick={filterSeen} value="2">
                  Seen
                </MenuItem>
                <MenuItem onClick={filterNotSeen} value="3">
                  Not Seen
                </MenuItem>
              </Select>
              <FormHelperText>-Filter by status-</FormHelperText>
            </FormControl>
            <TablePagination
              component="div"
              style={{ position: "absolute", right: 0 }}
              count={filter.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={changePage}
              labelRowsPerPage=""
              rowsPerPageOptions={[]}
            />
          </Row>
          {loading ? (
            <ScaleLoader color={"#2512DF"} loading={loading} size={35} />
          ) : (
            <Table style={{ marginTop: 20 }} hover>
              <tbody>
                {currentPost.map((row) => (
                  <tr
                    key={row.id}
                    style={{
                      background: row.status === 0 ? "#b3aeae75" : "white",
                      padding: 10,
                      cursor: "pointer",
                    }}
                  >
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
                      {moment(row.createdDate).format("DD/MM/YYYY HH:mm:ss")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </main>
    </div>
  );
}
export default Notification;
