import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../Redux/store";

type Props = {};

const Sidebar = (props: Props) => {
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <>
      {role === "Admin" ? (
        <div className="h-full flex-col flex-auto flex-shrink-0 antialiased bg-white-50 text-gray-800 overflow-hidden">
          <div className="flex flex-col w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center h-14 border-b ">
              <div>Sidebar</div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Menu
                    </div>
                  </div>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent hover:border-indigo-500 pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Dashboard
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    end
                    to="/categorylist"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent  pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Category List
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="supplier"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Supplier List
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to="/productlist"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent  pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Product List
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/discountlist"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        width="601.96px"
                        height="601.96px"
                        viewBox="0 0 601.96 601.96"
                      >
                        <g>
                          <path
                            d="M163.156,107.708l-7.528,11.2c-5.018-13.342-11.322-26.5-20.257-37.577c-12.056-14.994-28.519-26.561-47.98-29.131
  c-19.156-2.509-39.719,2.02-54.958,14.321C0.854,92.04-2.268,136.716,1.037,174.232c1.653,19.094,5.753,38.127,11.812,56.304
  l38.127-13.341c-2.57-7.772-4.773-15.606-6.548-23.623c-3.305-17.32-4.59-34.945-3.733-52.571
  c0.673-8.262,2.02-16.462,4.468-24.357c1.469-3.794,3.244-7.466,5.324-10.955c1.591-2.142,3.366-4.223,5.263-6.12
  c1.958-1.53,4.04-2.938,6.181-4.162c2.693-1.163,5.447-2.142,8.323-2.876c2.938-0.428,5.937-0.612,8.874-0.612
  c2.632,0.306,5.263,0.856,7.833,1.591c2.387,0.979,4.712,2.142,6.916,3.489c2.815,2.081,5.385,4.406,7.772,6.916
  c3.978,4.896,7.344,10.159,10.343,15.729c4.835,10.159,8.507,20.869,11.873,31.579c1.102,3.488,2.142,6.916,3.121,10.404
  L14.44,329.067l148.716,221.36H601.96v-442.72H163.156z M163.095,322.947c3.366,0,6.12,2.754,6.12,6.12s-2.754,6.12-6.12,6.12
  c-3.366,0-6.12-2.754-6.12-6.12S159.729,322.947,163.095,322.947z M560.344,508.812H185.311L64.563,329.067l74.174-110.404
  c2.876,22.399,4.039,44.982,3.427,67.565c-15.851,7.772-26.745,24.051-26.745,42.839c0,26.316,21.42,47.736,47.736,47.736
  s47.736-21.42,47.736-47.736c0-19.522-11.812-36.353-28.581-43.696c0.918-33.354-1.53-66.586-8.14-99.511
  c-0.979-5.019-2.081-10.037-3.243-14.994l14.443-21.481h375.034v359.428H560.344z M279.864,413.952L479.07,214.746l29.438,29.438
  L309.302,443.39L279.864,413.952z M326.988,315.175c29.376,0,53.244-23.867,53.244-53.243s-23.868-53.244-53.244-53.244
  s-53.244,23.868-53.244,53.244S297.674,315.175,326.988,315.175z M326.988,250.242c6.426,0,11.628,5.202,11.628,11.628
  c0,6.426-5.202,11.628-11.628,11.628s-11.628-5.202-11.628-11.628C315.36,255.444,320.562,250.242,326.988,250.242z
   M461.322,342.96c-29.376,0-53.244,23.868-53.244,53.244s23.868,53.244,53.244,53.244s53.244-23.868,53.244-53.244
  S490.698,342.96,461.322,342.96z M461.322,407.894c-6.426,0-11.628-5.202-11.628-11.628s5.202-11.628,11.628-11.628
  s11.628,5.202,11.628,11.628S467.748,407.894,461.322,407.894z"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Discount
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    end
                    to="/billlist"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent  pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13,16H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h2a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,2H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Zm-7-7H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Bill List
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="userlist"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      User List
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="employee-account"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Account Employee
                    </span>
                  </NavLink>
                </li>
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Settings
                    </div>
                  </div>
                </li>
                <li>
                  <NavLink
                    to="profile"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Profile
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : role === "Sale" ? (
        <div className="h-full flex-col flex-auto flex-shrink-0 antialiased bg-white-50 text-gray-800 overflow-hidden">
          <div className="flex flex-col w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center h-14 border-b ">
              <div>Sidebar</div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Menu
                    </div>
                  </div>
                </li>

                <li>
                  <NavLink
                    end
                    to="/billlist"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent  pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13,16H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h2a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,2H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Zm-7-7H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Bill List
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="chat"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        id="Icon"
                        enableBackground="new 0 0 96 96"
                        viewBox="0 0 96 96"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="Chat"
                          d="m82 33h-18v-12c0-5.514-4.486-10-10-10h-40c-5.514 0-10 4.486-10 10v24c0 5.514 4.486 10 10 10h4v12c0 .809.487 1.538 1.234 1.848.248.102.508.152.766.152.521 0 1.031-.203 1.414-.586l13.414-13.414h3.172v8c0 5.514 4.486 10 10 10h15.172l11.414 11.414c.383.383.893.586 1.414.586.258 0 .518-.05.766-.152.747-.31 1.234-1.039 1.234-1.848v-10h4c5.514 0 10-4.486 10-10v-20c0-5.514-4.486-10-10-10zm-48 18c-.53 0-1.039.211-1.414.586l-10.586 10.586v-9.172c0-1.104-.896-2-2-2h-6c-3.309 0-6-2.691-6-6v-24c0-3.309 2.691-6 6-6h40c3.309 0 6 2.691 6 6v24c0 3.309-2.691 6-6 6zm54 12c0 3.309-2.691 6-6 6h-6c-1.104 0-2 .896-2 2v7.172l-8.586-8.586c-.375-.375-.884-.586-1.414-.586h-16c-3.309 0-6-2.691-6-6v-8h12c5.514 0 10-4.486 10-10v-8h18c3.309 0 6 2.691 6 6zm-8-18c0 1.104-.896 2-2 2h-8c-1.104 0-2-.896-2-2s.896-2 2-2h8c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-10c-1.104 0-2-.896-2-2s.896-2 2-2h10c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-26c-1.104 0-2-.896-2-2s.896-2 2-2h26c1.104 0 2 .896 2 2zm-28-36c0 1.104-.896 2-2 2h-32c-1.104 0-2-.896-2-2s.896-2 2-2h32c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-32c-1.104 0-2-.896-2-2s.896-2 2-2h32c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-32c-1.104 0-2-.896-2-2s.896-2 2-2h32c1.104 0 2 .896 2 2z"
                        />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Chat
                    </span>
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink
                    to="userlist"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      User List
                    </span>
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="userlist"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      User List
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/discountlist"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        width="601.96px"
                        height="601.96px"
                        viewBox="0 0 601.96 601.96"
                      >
                        <g>
                          <path
                            d="M163.156,107.708l-7.528,11.2c-5.018-13.342-11.322-26.5-20.257-37.577c-12.056-14.994-28.519-26.561-47.98-29.131
  c-19.156-2.509-39.719,2.02-54.958,14.321C0.854,92.04-2.268,136.716,1.037,174.232c1.653,19.094,5.753,38.127,11.812,56.304
  l38.127-13.341c-2.57-7.772-4.773-15.606-6.548-23.623c-3.305-17.32-4.59-34.945-3.733-52.571
  c0.673-8.262,2.02-16.462,4.468-24.357c1.469-3.794,3.244-7.466,5.324-10.955c1.591-2.142,3.366-4.223,5.263-6.12
  c1.958-1.53,4.04-2.938,6.181-4.162c2.693-1.163,5.447-2.142,8.323-2.876c2.938-0.428,5.937-0.612,8.874-0.612
  c2.632,0.306,5.263,0.856,7.833,1.591c2.387,0.979,4.712,2.142,6.916,3.489c2.815,2.081,5.385,4.406,7.772,6.916
  c3.978,4.896,7.344,10.159,10.343,15.729c4.835,10.159,8.507,20.869,11.873,31.579c1.102,3.488,2.142,6.916,3.121,10.404
  L14.44,329.067l148.716,221.36H601.96v-442.72H163.156z M163.095,322.947c3.366,0,6.12,2.754,6.12,6.12s-2.754,6.12-6.12,6.12
  c-3.366,0-6.12-2.754-6.12-6.12S159.729,322.947,163.095,322.947z M560.344,508.812H185.311L64.563,329.067l74.174-110.404
  c2.876,22.399,4.039,44.982,3.427,67.565c-15.851,7.772-26.745,24.051-26.745,42.839c0,26.316,21.42,47.736,47.736,47.736
  s47.736-21.42,47.736-47.736c0-19.522-11.812-36.353-28.581-43.696c0.918-33.354-1.53-66.586-8.14-99.511
  c-0.979-5.019-2.081-10.037-3.243-14.994l14.443-21.481h375.034v359.428H560.344z M279.864,413.952L479.07,214.746l29.438,29.438
  L309.302,443.39L279.864,413.952z M326.988,315.175c29.376,0,53.244-23.867,53.244-53.243s-23.868-53.244-53.244-53.244
  s-53.244,23.868-53.244,53.244S297.674,315.175,326.988,315.175z M326.988,250.242c6.426,0,11.628,5.202,11.628,11.628
  c0,6.426-5.202,11.628-11.628,11.628s-11.628-5.202-11.628-11.628C315.36,255.444,320.562,250.242,326.988,250.242z
   M461.322,342.96c-29.376,0-53.244,23.868-53.244,53.244s23.868,53.244,53.244,53.244s53.244-23.868,53.244-53.244
  S490.698,342.96,461.322,342.96z M461.322,407.894c-6.426,0-11.628-5.202-11.628-11.628s5.202-11.628,11.628-11.628
  s11.628,5.202,11.628,11.628S467.748,407.894,461.322,407.894z"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Discount
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="profile"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Profile
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : role === "Warehouse" ? (
        <div className="h-full flex-col flex-auto flex-shrink-0 antialiased bg-white-50 text-gray-800 overflow-hidden">
          <div className="flex flex-col w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center h-14 border-b ">
              <div>Sidebar</div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Menu
                    </div>
                  </div>
                </li>

                <li>
                  <NavLink
                    end
                    to="/categorylist"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent  pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Category List
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="supplier"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Supplier List
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    to="/productlist"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent  pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13,16H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h2a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,2H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Zm-7-7H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z" />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Product
                    </span>
                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                      New
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="discountlist"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        id="Icon"
                        enableBackground="new 0 0 96 96"
                        viewBox="0 0 96 96"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          id="Chat"
                          d="m82 33h-18v-12c0-5.514-4.486-10-10-10h-40c-5.514 0-10 4.486-10 10v24c0 5.514 4.486 10 10 10h4v12c0 .809.487 1.538 1.234 1.848.248.102.508.152.766.152.521 0 1.031-.203 1.414-.586l13.414-13.414h3.172v8c0 5.514 4.486 10 10 10h15.172l11.414 11.414c.383.383.893.586 1.414.586.258 0 .518-.05.766-.152.747-.31 1.234-1.039 1.234-1.848v-10h4c5.514 0 10-4.486 10-10v-20c0-5.514-4.486-10-10-10zm-48 18c-.53 0-1.039.211-1.414.586l-10.586 10.586v-9.172c0-1.104-.896-2-2-2h-6c-3.309 0-6-2.691-6-6v-24c0-3.309 2.691-6 6-6h40c3.309 0 6 2.691 6 6v24c0 3.309-2.691 6-6 6zm54 12c0 3.309-2.691 6-6 6h-6c-1.104 0-2 .896-2 2v7.172l-8.586-8.586c-.375-.375-.884-.586-1.414-.586h-16c-3.309 0-6-2.691-6-6v-8h12c5.514 0 10-4.486 10-10v-8h18c3.309 0 6 2.691 6 6zm-8-18c0 1.104-.896 2-2 2h-8c-1.104 0-2-.896-2-2s.896-2 2-2h8c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-10c-1.104 0-2-.896-2-2s.896-2 2-2h10c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-26c-1.104 0-2-.896-2-2s.896-2 2-2h26c1.104 0 2 .896 2 2zm-28-36c0 1.104-.896 2-2 2h-32c-1.104 0-2-.896-2-2s.896-2 2-2h32c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-32c-1.104 0-2-.896-2-2s.896-2 2-2h32c1.104 0 2 .896 2 2zm0 8c0 1.104-.896 2-2 2h-32c-1.104 0-2-.896-2-2s.896-2 2-2h32c1.104 0 2 .896 2 2z"
                        />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Discount
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="profile"
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 text-gray-600 hover:text-gray-800 border-l-[5px] border-transparent  pr-6"
                    style={({ isActive }) => {
                      return {
                        borderColor: isActive
                          ? "rgb(99 102 241"
                          : "transparent",
                      };
                    }}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Profile
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
