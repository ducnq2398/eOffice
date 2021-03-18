import { Container, Input, Row, Table } from "reactstrap";
import Header from "../Nav/Header";
import Sidebar from "../Sidebar/Sidebar";
import Button from "@material-ui/core/Button";
import "../../css/Notification.css";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import notiAPI from "../../api/notiAPI";
import moment from "moment";
import Navbar from "../Navbar/Navbar";

function Notification() {
  const [all, setAll] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(15);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  var listNoti = all
    .sort((a, b) => {
      return (
        new Date(a.dateCreate).getTime() - new Date(b.dateCreate).getTime()
      );
    })
    .reverse();
  const currentPost = all.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    async function fetListNoti() {
      try {
        const res = await notiAPI.getAll();
        setAll(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetListNoti();
  }, []);
  function changePage(event, newPage) {
    setPage(newPage);
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
            <Input
              style={{ width: 160, marginLeft: 10 }}
              type="select"
              name="filter-type"
            >
              <option>-Filter by type-</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
            <Input
              style={{ width: 160, marginLeft: 10 }}
              type="select"
              name="filter-status"
            >
              <option>-Filter by status-</option>
              <option>All</option>
              <option>Seen</option>
              <option>Not seen</option>
            </Input>
            <TablePagination
              component="div"
              style={{ position: "absolute", right: 0 }}
              count={all.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={changePage}
              labelRowsPerPage=""
              rowsPerPageOptions={[]}
            />
          </Row>
          <Table style={{ marginTop: 20 }} hover>
            <tbody>
              {all.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    background: row.status === 0 ? "#b3aeae75" : "white", padding:10
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
        </Container>
      </main>
    </div>
  );
}
export default Notification;
