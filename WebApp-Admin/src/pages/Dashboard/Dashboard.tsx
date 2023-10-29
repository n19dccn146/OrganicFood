import Widget from "../../components/Widget/Widget";

import { Productchart, Revanuechart } from "../../components/Chart/Chart";
import { useEffect, useState } from "react";
import revanueApi from "../../apis/revanue/revenueApi";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Result, Tooltip } from "antd";
import { formatDate } from "../../utils/dateFormater";
import { moneyFormater } from "../../utils/moneyFormater";
import ModalChart from "../../components/Modal/ModalChart/ModalChart";
import Item from "antd/lib/list/Item";
import ModalRevenue from "../../components/Modal/ModalChart/modalHistoryPrice";
type Props = {};

const Dashboard = (props: Props) => {
  const [dateEnd, setDateEnd] = useState("");
  const [dateStart, setDateStart] = useState("");
  //Lưu trữ bước thống kê (theo sp, ngày, tháng, năm)
  const [step, setStep] = useState("month");
  //Lưu trữ loại thống kê (doanh thu hoặc nhập kho)
  const [type, setType] = useState("bill");
  //Dữ liệu doanh thu và số lượng sản phẩm
  const [dataChart, setDataChart] = useState({ tempGraph: [], products: [] });
  //Lưu trữ danh sách sản phẩm từ API
  const [productList, setProductList] = useState<Array<any>>([]);
  //ẩn hay hiện modalchart
  const [showModalChart, setShowModalChart] = useState(false);
  const [showModalRevenue, setShowModalRevenue] = useState(false);
  const [reload, setReload] = useState(0);

  const [product, setProduct] = useState({});
  const [money, setMoney] = useState("");
  const [listImport, setListImport] = useState<Array<any>>([]);

  const data = dataChart?.tempGraph.map((item: any, index: number) => {
    return {
      time: formatDate(item?.time),
      revenue: item?.total,
      product: item?.count,
    };
  });

  const handleSetType = (e: any) => {
    const value = e.target.value;
    setType(value);
  };

  const handleSetStep = (e: any) => {
    const value = e.target.value;
    setStep(value);
  };

  const onDateStart = (e: any) => {
    const value = e.target.value;
    console.log("start", dateStart);
    setDateStart(value);
  };
  const onDateEnd = (e: any) => {
    const value = e.target.value;
    console.log("end", dateStart);
    setDateEnd(value);
  };

  console.log("dataChart", data);

  useEffect(() => {
    (async () => {
      const result = await revanueApi.getRevenue({
        dateStart,
        dateEnd,
        type,
        step,
      });
      console.log("api", result.data);
      setDataChart(result.data);
      setProductList(result.data?.listProduct);

      if (type === "bill") {
        setListImport(result.data?.tempListProduct);
      }
      console.log(result.data?.tempListProduct);
      // const resultCaculor = await revanueApi.getcalculateProfitLoss({
      //   dateStart,
      //   dateEnd,
      //   type,
      //   step,
      // });
      // console.log("api", resultCaculor.data);
    })();
  }, [dateEnd, dateStart, type, step]);

  const handleGetIDProduct = (name: any, _id: any, money: any) => {
    // console.log(_id);
    listImport.forEach(function (item) {
      const itemFound = listImport.find(
        (item) => item._id.toString() === _id.toString()
      );
      if (itemFound) {
        setProduct(itemFound);
      }
      // console.log(item._id);
      // console.log(_id + name);
    });
    setShowModalRevenue(true);
    setMoney(money);
  };

  return (
    <div className="layout">
      <div className="flex justify-between items-center pt-4 pb-4">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="dateStart">Ngày bắt đầu</label>
          <input
            className="border rounded p-2 bg-blue-300"
            onChange={onDateStart}
            id="dateEnd"
            type="date"
          ></input>
        </div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="dateEnd">Ngày kết thúc</label>
          <input
            className="border rounded p-2 bg-blue-300"
            onChange={onDateEnd}
            id="dateEnd"
            type="date"
          ></input>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="">Thống kê theo</label>
          <select
            className="border rounded p-2 bg-blue-300"
            id="step"
            onChange={handleSetStep}
          >
            <option>Chọn</option>

            <option key="1" value="second">
              Từng sản phẩm
            </option>
            <option key="2" value="day">
              Ngày
            </option>
            <option key="3" value="month">
              Tháng
            </option>
            <option key="4" value="year">
              Năm
            </option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="">Thống kê theo</label>
          <select
            className="border rounded p-2 bg-blue-300"
            id="step"
            onChange={handleSetType}
          >
            <option>Chọn</option>

            <option key="1" value="bill">
              Doanh Thu
            </option>
            <option key="2" value="import">
              Nhập kho
            </option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => {
              setShowModalChart(true);
            }}
            className="p-2 bg-green-400 rounded text-white"
          >
            Xuất dữ liệu
          </button>
        </div>
      </div>

      <div className="w-100% h-[400px] mt-[20px] flex mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={400}
            height={500}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              yAxisId="left"
              tickFormatter={(number) =>
                `${Intl.NumberFormat().format(number)}`
              }
            />
            <YAxis yAxisId="right" orientation="right" />
            <Legend />
            <Tooltip />
            <Line
              activeDot={{ r: 8 }}
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="product"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">ID</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Code</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Name</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">
                  Inventory items
                </div>
              </th>

              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">
                  Sold/Total product quantity.
                </div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Total</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">
                  View Revenue
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {productList?.length > 0 ? (
              productList.map((item: any, index: number) => (
                <tr
                  className="bg-gray-100 text-center border-b text-sm text-gray-600"
                  key={index}
                >
                  <td className="p-2 border-r">{index + 1}</td>
                  <td className="p-2 border-r">{item.code}</td>
                  <td className="p-2 border-r">{item.name}</td>
                  <td className="p-2 border-r">{item.quantity}</td>
                  <td className="p-2 border-r">{item.sold}</td>
                  <td className="p-2 border-r">{moneyFormater(item.total)}</td>
                  <td className="p-2 border-r">
                    {type !== "bill" ? null : (
                      <a
                        onClick={() => {
                          handleGetIDProduct(
                            item?.name,
                            item?._id,
                            item?.total
                          );
                        }}
                        className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                      >
                        Revenue
                      </a>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModalChart && (
        <ModalChart
          setOpenModalChart={setShowModalChart}
          dateStart={new Date(dateStart).getTime()}
          dateEnd={new Date(dateEnd).getTime()}
        />
      )}
      {showModalRevenue && (
        <ModalRevenue
          setOpenModalRevenue={setShowModalRevenue}
          product={product}
          setReload={setReload}
          money={money}
        />
      )}
    </div>
  );
};

export default Dashboard;
