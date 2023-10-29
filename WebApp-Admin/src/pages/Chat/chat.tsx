import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import chatApi from "../../apis/chat/chatApi";
import authApi from "../../apis/auth/authApi";

type Props = {};

function Chat({}: Props) {
  const { handleSubmit, reset, register } = useForm();
  const [chat, setChat] = useState<any>();
  const [user, setUser] = useState<any>();
  const [message, setMessage] = useState<any>();
  const [_id, setID] = useState("63a5ef1e006040191061f1e6");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const timeoutID = window.setInterval(() => {
      (async () => {
        const list = await chatApi.getListChat();
        setChat(list?.data);
      })();
    }, 1000);
    return () => window.clearTimeout(timeoutID);
  }, []);

  useEffect(() => {
    (async () => {
      const result = await authApi.getInfo();
      setUser(result.data);
      console.log(result.data);
    })();
  }, []);

  useEffect(() => {
    if (_id) {
      const timeoutID = window.setInterval(() => {
        (async () => {
          const res = await chatApi.getChat({ _id, limit });
          setMessage(res.data);
        })();
      }, 1000);
      return () => window.clearTimeout(timeoutID);
    }
  }, [_id]);

  const handleGetMessage = (id: any) => {
    setID(id);
  };

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    if (data.message !== "") {
      const send = await chatApi.addChat({ _id, message: data.message });
      console.log(send);
    }
    reset();
  };

  const handleNew = async (data: any) => {
    const res: any = await chatApi.newChat({
      message: "Bắt đầu cuộc trò chuyện mới !",
    });
    console.log("resNew", res);
    if (res == 200) setID(res.data.data);
  };

  useEffect(() => {
    const list = document.getElementById("scrollableDiv");
    list && list.addEventListener("scroll", loadMore);
    return () => {
      list && list.removeEventListener("scroll", loadMore);
    };
  }, []);

  const loadMore = (e: any) => {
    const list = document.getElementById("scrollableDiv");
    if (list && list !== undefined && list.scrollTop === 0) {
      setLimit(limit + limit);
    }
  };

  function padTo2Digits(num: any) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date: any) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }

  return (
    <div className="container mx-auto bg-white">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1 ">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <ul className="h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              {user?.role === "Customer"
                ? chat?.map((item: any, index: number) => (
                    <a
                      key={index}
                      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                      onClick={() => handleGetMessage(item._id)}
                    >
                      <img
                        className="object-contain w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                        alt="username"
                      />
                      <div className="max-w-[90%] pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {item.saler.name}
                          </span>
                          <span className="block ml-2 text-sm text-gray-600">
                            {formatDate(new Date(item.last_message.createdAt))}
                          </span>
                        </div>
                        <span
                          className="block ml-2 text-sm text-gray-600 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis"
                          style={{
                            fontWeight:
                              item.last_message.isCustomer || item.seen
                                ? "normal"
                                : "bold",
                          }}
                        >
                          {item.last_message.message}
                        </span>
                      </div>
                    </a>
                  ))
                : chat?.map((item: any, index: number) => (
                    <a
                      key={index}
                      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                      onClick={() => handleGetMessage(item._id)}
                    >
                      <img
                        className="object-contain w-10 h-10 rounded-full"
                        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                        alt="username"
                      />
                      <div className="max-w-[90%] pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">
                            {item.customer.name}
                          </span>
                          <span className="block ml-2 text-sm text-gray-600">
                            {formatDate(new Date(item.last_message.createdAt))}
                          </span>
                        </div>
                        <span
                          className="block ml-2 text-sm text-gray-600 w-[90%] overflow-hidden whitespace-nowrap text-ellipsis"
                          style={{
                            fontWeight:
                              !item.last_message.isCustomer || item.seen
                                ? "normal"
                                : "bold",
                          }}
                        >
                          {item.last_message.message}
                        </span>
                      </div>
                    </a>
                  ))}
            </li>
          </ul>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img
                className="object-contain w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                alt="username"
              />
              {user?.role === "Customer" ? (
                <div>
                  <span className="block ml-2 font-bold text-gray-600">
                    {message?.saler?.name}
                  </span>
                  <span className="block ml-2 font-bold text-gray-600">
                    {message?.saler?.email}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="block ml-2 font-bold text-gray-600">
                    {message?.customer?.name}
                  </span>
                  <span className="block ml-2 font-bold text-gray-600">
                    {message?.customer?.email}
                  </span>
                </div>
              )}
              {user?.role === "Customer" ? (
                <button
                  type="button"
                  style={{
                    marginLeft: "auto",
                    borderRadius: "12%",
                  }}
                  onClick={handleNew}
                >
                  Tạo mới
                </button>
              ) : (
                <></>
              )}
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
              <div
                id="scrollableDiv"
                className="chat-panel"
                style={{
                  flex: "1",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                  maxHeight: "calc(100vh - 240px)",
                }}
              >
                {message?.messages?.map((item: any, index: any) => (
                  <div key={index}>
                    <div className="row no-gutters">
                      {user?.role === "Customer" ? (
                        !item.isCustomer ? (
                          <div className="col-md-6">
                            <div
                              style={{
                                backgroundColor: "#eee",
                                width: "fit-content",
                                marginRight: "auto",
                              }}
                              className="p-2 rounded mb-2"
                            >
                              {item.message}
                            </div>
                          </div>
                        ) : (
                          <div className="col-md-6 offset-md-6">
                            <div
                              style={{
                                backgroundColor: "#1da1f2",
                                width: "fit-content",
                                marginLeft: "auto",
                                color: "white",
                              }}
                              className="p-2 rounded mb-2"
                            >
                              {item.message}
                            </div>
                          </div>
                        )
                      ) : item.isCustomer ? (
                        <div className="col-md-6">
                          <div
                            style={{
                              backgroundColor: "#eee",
                              width: "fit-content",
                              marginRight: "auto",
                            }}
                            className="p-2 rounded mb-2"
                          >
                            {item.message}
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-6 offset-md-6">
                          <div
                            style={{
                              backgroundColor: "#1da1f2",
                              width: "fit-content",
                              marginLeft: "auto",
                              color: "white",
                            }}
                            className="p-2 rounded mb-2"
                          >
                            {item.message}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(submit)}>
              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  style={{ width: "100%" }}
                  {...register("message")}
                />

                <div className="chat-box-tray">
                  <button type="submit">
                    <svg
                      className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
