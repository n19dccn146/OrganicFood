import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { updateAuthStatus } from "../../Redux/authSlice";
import logo from "../../Images/favicon.svg";
import { RootState } from "../../Redux/store";
import productApi from "../../apis/product/product";
type Props = {};

const Navbar = (props: Props) => {
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const role = useSelector((state: RootState) => state.auth.role);
  const [unSeen, setUnSeen] = useState(Number);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(updateAuthStatus(false));
    localStorage.removeItem("token");
    window.location.pathname = "";
  };

  const [visible, setVisible] = useState(false);
  const notificationRef = useRef<HTMLInputElement>(null);
  const hanldeOpenNoti = () => {
    if (visible === false) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const handleSeenNotify = async (id: any) => {
    debugger
    await productApi.seenNotify(id);
    setNotify()
  };

  const handleSeenAllNotify = async () =>{
    await productApi.seenAllnotify();
    setNotify()
  }
  const handleDeleteNotify = async ()=>{
    await productApi.deleteAllNotify();
    setNotify()
  }
  const setNotify = async ()=>{
    const result = await productApi.getNotifications(); 
    let temp = 0;
    result.notifications.forEach((item: any) =>
      !item.status ? (temp += 1) : temp
    );
    setUnSeen(temp);
    setNotifications(result.notifications);
  }

  const hanldeCloseNoti = () => {
    setVisible(false);
  };

  useEffect(() => {
    (async () => {
      const result = await productApi.getNotifications();
      let temp = 0;
      setNotify()
      const handleClickOutside = (event: any) => {
        if (
          notificationRef.current &&
          !notificationRef.current.contains(event.target)
        ) {
          setVisible(false);
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    })();
  }, []);

  return (
    <div className="bg-blue-500 border-b">
      {role === "Admin" ? (
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
          <Link to="/" className="text-3xl font-bold leading-none">
            <img src={logo} className="w-14 h-15 ml-20" alt="" />
          </Link>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center text-blue-600 p-3">
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex  lg:items-center lg:space-x-6 ml-[100px] w-[700px]">
            <li>
              <NavLink
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(37 99 235)" : "rgb(156 163 175)",
                    fontWeight: isActive ? "bold" : "400",
                  };
                }}
              >
                Home
              </NavLink>
            </li>
            <li className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <NavLink
                className="text-sm text-gray-400 hover:text-gray-500"
                end
                to="/productlist"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(37 99 235)" : "rgb(156 163 175",
                    fontWeight: isActive ? "bold" : "400",
                  };
                }}
              >
                Product list
              </NavLink>
            </li>
            <li className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <NavLink
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/supplier"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(37 99 235)" : "rgb(156 163 175",
                    fontWeight: isActive ? "bold" : "400",
                  };
                }}
              >
                Supplier List
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/categorylist"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(37 99 235)" : "rgb(156 163 175",
                    fontWeight: isActive ? "bold" : "400",
                  };
                }}
              >
                Category List
              </NavLink>
            </li>
            <li className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <NavLink
                className="text-sm text-gray-400 hover:text-gray-500"
                to="billlist"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(37 99 235)" : "rgb(156 163 175",
                    fontWeight: isActive ? "bold" : "400",
                  };
                }}
              >
                Bill
              </NavLink>
            </li>
            <li className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <NavLink
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/userlist"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(37 99 235)" : "rgb(156 163 175",
                    fontWeight: isActive ? "bold" : "400",
                  };
                }}
              >
                User List
              </NavLink>
            </li>
            <li className="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4 current-fill"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </li>
            <li>
              <NavLink
                to="/contact"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "rgb(37 99 235)" : "rgb(156 163 175",
                    fontWeight: isActive ? "bold" : "400",
                  };
                }}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="relative flex">
            <div onClick={hanldeOpenNoti} ref={notificationRef}>
              <ul className="notification-drop mr-3">
                <li className="item">
                  <svg
                    height="30px"
                    id="Layer_1"
                    // style="enable-background:new 0 0 512 512;"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="30px"
                  >
                    <g>
                      <path d="M381.7,225.9c0-97.6-52.5-130.8-101.6-138.2c0-0.5,0.1-1,0.1-1.6c0-12.3-10.9-22.1-24.2-22.1c-13.3,0-23.8,9.8-23.8,22.1   c0,0.6,0,1.1,0.1,1.6c-49.2,7.5-102,40.8-102,138.4c0,113.8-28.3,126-66.3,158h384C410.2,352,381.7,339.7,381.7,225.9z" />
                      <path d="M256.2,448c26.8,0,48.8-19.9,51.7-43H204.5C207.3,428.1,229.4,448,256.2,448z" />
                    </g>
                  </svg>
                  <span className="btn__badge pulse-button ">{unSeen}</span>

                  {visible && notifications.length > 0 && (
                    <ul>
                      <li className="action">
                        <span className="buttonContainer" onClick={()=>{
                          handleDeleteNotify()
                        }}>Xóa tất cả</span>
                        <span className="buttonContainer" onClick={()=>{
                          handleSeenAllNotify()
                        }}>Đánh dấu là đã đọc</span>
                      </li>
                      {notifications.map((item: any, index: number) => (
                        <NavLink
                          to="/productlist"
                          onClick={() => {
                            handleSeenNotify(item._id);
                          }}
                        >
                           <li className={`flex notify ${item.status ? '' : 'unSeen'}`}>
                            <img
                              src={item.image_url}
                              alt=""
                              className="img-item h-full rounded-[50%]"
                            />
                            {item.description}
                          </li>
                        </NavLink>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
            <button className="w-10 h-10 avatar">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqekwL2LW2-NBO_FE2f2IjZQnp_1xl-shGcg&usqp=CAU"
                alt=""
                className="w-full h-full rounded-[50%]"
              />
              <div className="w-48 absolute z-10 right-4 bg-slate-400 text-center rounded-lg shadow-xl menu-dropdown">
                <div className="px-4 py-4  hover:bg-indigo-500 hover:text-white rounded-tl-lg rounded-tr-lg no-underline">
                  <Link className="text-gray-800" to="/profile">
                    Profile
                  </Link>
                </div>
                <div
                  className="px-4 py-4 text-gray-800 hover:bg-indigo-500 hover:text-white rounded-bl-lg rounded-br-lg border-t-[1px] border-white border-solid"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </button>
          </div>
        </nav>
      ) : role === "Sale" || role === "Warehouse" ? (
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
          <Link to="/billlist" className="text-3xl font-bold leading-none">
            <img src={logo} className="w-14 h-15 ml-20" alt="" />
          </Link>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center text-blue-600 p-3">
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex  lg:items-center lg:space-x-6 ml-[100px] w-[700px]"></ul>
          <div className="relative flex">
            <div onClick={hanldeOpenNoti} ref={notificationRef}>
              <ul className="notification-drop mr-3">
                <li className="item">
                  <svg
                    height="30px"
                    id="Layer_1"
                    // style="enable-background:new 0 0 512 512;"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="30px"
                  >
                    <g>
                      <path d="M381.7,225.9c0-97.6-52.5-130.8-101.6-138.2c0-0.5,0.1-1,0.1-1.6c0-12.3-10.9-22.1-24.2-22.1c-13.3,0-23.8,9.8-23.8,22.1   c0,0.6,0,1.1,0.1,1.6c-49.2,7.5-102,40.8-102,138.4c0,113.8-28.3,126-66.3,158h384C410.2,352,381.7,339.7,381.7,225.9z" />
                      <path d="M256.2,448c26.8,0,48.8-19.9,51.7-43H204.5C207.3,428.1,229.4,448,256.2,448z" />
                    </g>
                  </svg>
                  <span className="btn__badge pulse-button ">4</span>
                </li>
              </ul>
            </div>
            <button className="w-10 h-10 avatar">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqekwL2LW2-NBO_FE2f2IjZQnp_1xl-shGcg&usqp=CAU"
                alt=""
                className="w-full h-full rounded-[50%]"
              />
              <div className="w-48 absolute z-10 right-4 bg-slate-400 text-center rounded-lg shadow-xl menu-dropdown">
                <div className="px-4 py-4  hover:bg-indigo-500 hover:text-white rounded-tl-lg rounded-tr-lg no-underline">
                  <Link className="text-gray-800" to="/profile">
                    Profile
                  </Link>
                </div>
                <div
                  className="px-4 py-4 text-gray-800 hover:bg-indigo-500 hover:text-white rounded-bl-lg rounded-br-lg border-t-[1px] border-white border-solid"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </button>
          </div>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
