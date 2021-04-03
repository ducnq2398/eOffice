import * as Icon from "react-icons/fa";
import * as AiIcon from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import * as IoIcon from "react-icons/io";
import * as IoOIcon from "react-icons/io5";
import logo from "../../images/eoffice.png";
import "../../css/Navbar.css";
import { getUser, removeUserSession } from "../../utils/Common";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import notiAPI from "../../api/notiAPI";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import userListAPI from "../../api/userListAPI";
import { browserName } from "react-device-detect";
import logoutAPI from "../../api/logoutAPI";
function Navbar() {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [listNoti, setListNoti] = useState([]);
  const [openNoti, setOpenNoti] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const count = listNoti.filter((data) => {
    if (data.status === 0) {
      return data;
    }
  });
  const [currentPage] = useState(1);
  const [postPerPage] = useState(9);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPostsNoti = listNoti.slice(indexOfFirstPost, indexOfLastPost);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetListNoti() {
      try {
        const res = await notiAPI.getById(getUser().Id);
        setListNoti(
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
        if (error.response.status === 401) {
          const params = {
            id: getUser().Id,
            device: browserName,
          };
          logoutAPI
            .logout(params)
            .then(function () {
              removeUserSession();
              history.push("/");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
    fetListNoti();
  });
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await userListAPI.getUserById(getUser().Id);
        setUsers(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          const params = {
            id: getUser().Id,
            device: browserName,
          };
          logoutAPI
            .logout(params)
            .then(function () {
              removeUserSession();
              history.push("/");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
    getUsers();
  }, []);
  function NavItemProfile(props) {
    return (
      <li
        className="navbar-item"
        onClick={(e) => {
          e.preventDefault();
          setOpenProfile(!openProfile);
          setOpenNoti(false);
        }}
      >
        {props.icon}
        {openProfile && props.children}
      </li>
    );
  }
  function NavItemNoti(props) {
    return (
      <li
        className="navbar-item"
        onClick={(e) => {
          e.preventDefault();
          setOpenNoti(!openNoti);
          setOpenProfile(false);
        }}
      >
        {props.icon}
        {openNoti && props.children}
      </li>
    );
  }
  function Logout(e) {
    e.preventDefault();
    const params = {
      id: getUser().Id,
      device: browserName,
    };
    logoutAPI
      .logout(params)
      .then(function () {
        removeUserSession();
        history.push("/");
      })
      .catch(function (error) {
        removeUserSession();
        history.push("/");
        console.log(error);
      });
  }
  function Profile(e) {
    e.preventDefault();
    history.push("/profile");
  }

  function DropdownMenu2() {
    function DropdownItem2(props) {
      return (
        <div className="menu-item" onClick={props.function}>
          {props.children}
        </div>
      );
    }
    return (
      <div className="dropdown-navbar">
        {listNoti.length === 0 ? (
          <div>You have no unread notifications</div>
        ) : (
          currentPostsNoti.map((noti, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  if (noti.title.includes("Contract")) {
                    const params = {
                      id: noti.id,
                      status: 1,
                    };
                    notiAPI.changeStatus(params).catch(function (error) {
                      console.log(error);
                    });
                    window.location.assign(
                      "/detail/contract/" + noti.objectId + "/" + noti.content
                    );
                  } else {
                    const params = {
                      id: noti.id,
                      status: 1,
                    };
                    notiAPI.changeStatus(params).catch(function (error) {
                      console.log(error);
                    });
                    window.location.assign(
                      "/detail/invoice/" + noti.objectId + "/" + noti.content
                    );
                  }
                }}
              >
                <DropdownItem2>{noti.content}</DropdownItem2>
              </div>
            );
          })
        )}
        <Link to="/notification" hidden={count < 10 ? true : false}>
          See more
        </Link>
      </div>
    );
  }
  function DropdownMenu1() {
    function DropdownItem1(props) {
      return (
        <div className="menu-item" onClick={props.function}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
        </div>
      );
    }
    return (
      <div className="dropdown-navbar">
        <DropdownItem1 leftIcon={<AccountCircleIcon />} function={Profile}>
          My Profile
        </DropdownItem1>
        <DropdownItem1 leftIcon={<ExitToAppIcon />} function={Logout}>
          Logout
        </DropdownItem1>
      </div>
    );
  }

  return (
    <IconContext.Provider value={{ color: "#404f9f" }}>
      <div className="navbar1 navbar-fixed-top">
        <Icon.FaBars
          onClick={() => {
            showSidebar();
            setTimeout(() => {
              setSidebar(false);
            }, 10000);
          }}
          className="menu-bars"
        />
        <img
          className="lo"
          src={logo}
          alt=""
          style={{ marginLeft: 20, marginTop: 10 }}
        />
        <nav style={{ display: "flex", right: 20, position: "absolute" }}>
          <ul className="navbar-nav">
            <NavItemNoti
              icon={
                <Badge
                  badgeContent={count.length < 10 ? count.length : "9+"}
                  color="error"
                >
                  <NotificationsIcon
                    style={{ cursor: "pointer" }}
                    color="action"
                    fontSize="large"
                  />
                </Badge>
              }
            >
              <DropdownMenu2 />
            </NavItemNoti>
            <NavItemProfile
              icon={
                <img
                  className="icon-button"
                  style={{ cursor: "pointer" }}
                  src={users.avatar}
                  alt="avatar"
                />
              }
            >
              <DropdownMenu1 />
            </NavItemProfile>
            <li className="nav-text">
              <span style={{ fontWeight: "bolder" }}>{getUser().Name}</span>
            </li>
          </ul>
        </nav>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items sn-bg-4" onClick={showSidebar}>
          <li className="navbar-toogle">
            <img src={logo} alt="" style={{ marginLeft: 70, marginTop: 10 }} />
            <IoOIcon.IoClose
              onClick={showSidebar}
              className="menu-bars-close"
            />
          </li>
          <li className="nav-text">
            <Link to="/dashboard">
              <AiIcon.AiOutlineDashboard />
              <span style={{ marginLeft: 20 }}>Dashboard</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/document">
              <IoOIcon.IoDocumentOutline />
              <span style={{ marginLeft: 20 }}>Document</span>
            </Link>
          </li>
          <li
            className="nav-text"
            hidden={getUser().Role === "2" ? true : false}
          >
            <Link to="/user-management">
              <AiIcon.AiOutlineUser />
              <span style={{ marginLeft: 20 }}>User Management</span>
            </Link>
          </li>
          <li
            className="nav-text"
            hidden={getUser().Role === "2" ? true : false}
          >
            <Link to="/department">
              <AiIcon.AiOutlineDashboard />
              <span style={{ marginLeft: 20 }}>Department Management</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/notification">
              <IoIcon.IoIosNotificationsOutline />
              <span style={{ marginLeft: 20 }}>Notification</span>
            </Link>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}
export default Navbar;
