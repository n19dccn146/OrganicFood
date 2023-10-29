import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import authApi from "../apis/auth/authApi";
import NotFoundPage from "../components/404";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Auth/Profile";
import BillList from "../pages/Bill/BillList";
import Category from "../pages/Category/Createcategory";
import Chat from "../pages/Chat/chat";

import Contact from "../pages/Contact/Contact";
import Dashboard from "../pages/Dashboard/Dashboard";
import DiscountList from "../pages/Discount/Discount";
import Productlist from "../pages/Product/Productlist";
import Updateproduct from "../pages/Product/Updateproduct";
import Userlist from "../pages/User/Userlist";
import { updateAuthRole, updateAuthStatus } from "../Redux/authSlice";
import { RootState } from "../Redux/store";
import AccountEmployee from "../pages/Employee Account/AccountEmployee";
import Supplier from "../pages/Supplier/Supplier";
import { IReqRefreshToken } from "../apis/auth/auth.interface";

type Props = {};

const Router = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth.isAuth); // được khai báo sử dụng hook 'useSelector' để lấy giá trị từ redux store. Auth đại diện cho trạng thái xác thực: true - đã đăng nhập, false: nếu chưa
  const role = useSelector((state: RootState) => state.auth.role); // role đại diện cho vai trò người dùng (admin hay sale...)

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");

    const refreshToken = async () => {
      if (token) {
        dispatch(updateAuthStatus(true));
      }
    };

    refreshToken();
  }, []);
  // useEffect đầu tiên được sử dụng để kiểm tra xem người dùng đã đăng nhập hay chưa, thông qua kiểm tra sự tồn tại của token trong localStrorage. Nếu có token nó gửi một action đến redux store để cập nhập trạng thái xác thực auth thành true

  useEffect(() => {
    if (auth) {
      (async () => {
        const result = await authApi.getInfo();
        dispatch(updateAuthRole(result.data.role));
        // console.log(result.data);
      })();
    } else {
      // window.location.pathname = "";
    }

    //sử dụng để lấy thông tin người dùng từ server khi trạng thái xác thực (auth) thay đổi. Nếu người dùng đã đăng nhập thì một hàm async được gọi để lấy thông tin người dùng thông qua authApi.getInfo().
    //Kết quả sau đó được sử dụng để cập nhật vai trò của người dùng ('role') thông qua hàm 'dispatch(updateAuthRole(result.data.role))'
  }, [auth]);

  console.log(role);

  return auth ? (
    <>
      <Navbar />
      <div className="layout min-h-screen flex">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div
          className="content flex-1  p-[20px]"
          style={{ background: "#e2e8f0" }}
        >
          {role === "Admin" ? (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/userlist" element={<Userlist />} />
              <Route path="/productlist" element={<Productlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/productlist/updateproduct/:productId"
                element={<Updateproduct />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/categorylist" element={<Category />} />
              <Route path="/billlist" element={<BillList />} />
              <Route path="/discountlist" element={<DiscountList />} />
              <Route path="/employee-account" element={<AccountEmployee />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          ) : role === "Sale" ? (
            <Routes>
              <Route path="/" element={<BillList />} />
              <Route path="/userlist" element={<Userlist />} />
              <Route path="/billlist" element={<BillList />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/discountlist" element={<DiscountList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          ) : role === "Warehouse" ? (
            <Routes>
              <Route path="/" element={<BillList />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/categorylist" element={<Category />} />
              <Route path="/productlist" element={<Productlist />} />
              <Route path="/discountlist" element={<DiscountList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Router;
