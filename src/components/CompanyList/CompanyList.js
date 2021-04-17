import { Container, Table, Form, FormGroup, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import companyListAPI from "../../api/companyListAPI";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import "../../css/CompanyList.css";
import GetAdminCompany from "../GetAdminCompany/GetAdminCompany";
import Moment from "moment";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function CompanyList() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [postList, setPostList] = useState([]);
  const indexOfLastPost = (page + 1) * rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - rowsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);
  const [value, setValue] = useState(1);
  function changePage(event, newPage) {
    setPage(newPage);
  }
  useEffect(() => {
    async function fetListData() {
      try {
        const response = await companyListAPI.getAll();
        setPostList(response.data);
        setData(response.data);
      } catch (error) {}
    }
    fetListData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  function Active() {
    setPage(0);
    setPostList(
      data.filter((data) => {
        if (data.status === 1) {
          return data;
        }
      })
    );
  }
  function listDeactive() {
    setPage(0);
    setPostList(
      data.filter((data) => {
        if (data.status !== 1) {
          return data;
        }
      })
    );
  }
  function All() {
    setPostList(data);
    setPage(0);
  }

  return (
    <div>
      <SidebarAdmin />
      <div className="main-panel1">
        <Container fluid={true}>
          <div className="search_form">
            <Form>
              <FormGroup>
                <Row>
                  <Col xs={10}>
                    <TextField
                      name="search"
                      type="text"
                      variant="outlined"
                      value={search}
                      placeholder="Search by name company"
                      onChange={(event) => {
                        setSearch(event.target.value);
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
                  </Col>
                  <Col xs={2}>
                    <FormControl
                      size="small"
                      variant="outlined"
                      style={{ marginLeft: 20 }}
                    >
                      <Select
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      >
                        <MenuItem onClick={All} value={1}>
                          All
                        </MenuItem>
                        <MenuItem onClick={Active} value={2}>
                          Active
                        </MenuItem>
                        <MenuItem onClick={listDeactive} value={3}>
                          Deactive
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </div>
          {loading ? (
            <ScaleLoader color={"#2512DF"} loading={loading} size={35} />
          ) : (
            <div hidden={search !== "" ? true : false}>
              <TablePagination
                component="div"
                count={postList.length}
                page={page}
                onChangePage={changePage}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage=""
                rowsPerPageOptions={[]}
              />
              <Table style={{ textAlign: "left" }} hover>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Manager Name</th>
                    <th>Date Created</th>
                    <th>Status</th>
                    <th>Phone Number</th>
                    <th>Edits/Details</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((data, key) => (
                    <tr key={key}>
                      <td>{data.name}</td>
                      <td>
                        <GetAdminCompany id={data.adminId} />
                      </td>
                      <td>
                        {Moment(data.dateCreate).format("DD/MM/YYYY HH:mm:ss")}
                      </td>
                      <td>
                        {data.status === 1 ? (
                          <p style={{ color: "green" }}>Active</p>
                        ) : (
                          <p style={{ color: "red" }}>Deactive</p>
                        )}
                      </td>
                      <td>{data.phone}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/edit-company",
                            state: data,
                          }}
                        >
                          Edit/Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          <Table
            style={{ textAlign: "left" }}
            hidden={search === "" ? true : false}
          >
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Manager Name</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Phone Number</th>
                <th>Edits/Details</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((data) => {
                  if (data.name.toLowerCase().includes(search.toLowerCase())) {
                    return data;
                  }
                })
                .map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>
                      <GetAdminCompany id={data.adminId} />
                    </td>
                    <td>{data.dateCreate}</td>
                    <td>
                      {data.status === 1 ? (
                        <p style={{ color: "green" }}>Active</p>
                      ) : (
                        <p style={{ color: "red" }}>Deactive</p>
                      )}
                    </td>
                    <td>{data.phone}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/edit-company",
                          state: data,
                        }}
                      >
                        Edit/Detail
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}
export default CompanyList;
