import { Container, Row, Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import "../../css/Notification.css";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
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
  var listNoti = filter
    .sort((a, b) => {
      return (
        new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
      );
    })
    .reverse();
  const currentPost = listNoti.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    async function fetListNoti() {
      try {
        const res = await notiAPI.getById(getUser().Id);
        setFilter(
          res.data
            .sort((a, b) => {
              return (
                new Date(a.dateCreate).getTime() -
                new Date(b.dateCreate).getTime()
              );
            })
            .reverse()
        );
        setAll(
          res.data
            .sort((a, b) => {
              return (
                new Date(a.dateCreate).getTime() -
                new Date(b.dateCreate).getTime()
              );
            })
            .reverse()
        );
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetListNoti();
  }, []);
  function changePage(event, newPage) {
    setPage(newPage);
  }
  function filterSeen() {
    setFilter(
      all
        .filter((data) => {
          if (data.status === 1) {
            return data;
          }
        })
        .sort((a, b) => {
          return (
            new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
          );
        })
        .reverse()
    );
  }
  function filterNotSeen() {
    setFilter(
      all
        .filter((data) => {
          if (data.status === 0) {
            return data;
          }
        })
        .sort((a, b) => {
          return (
            new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
          );
        })
        .reverse()
    );
  }
  function filterAll() {
    setFilter(
      all
        .sort((a, b) => {
          return (
            new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
          );
        })
        .reverse()
    );
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
                <MenuItem value="1">All</MenuItem>
                <MenuItem value="2">Contract</MenuItem>
                <MenuItem value="3">Invoice</MenuItem>
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
                        <Link to="/">View detail</Link>
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
