import { PlusSquareOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryApi from "../../apis/category/categoryApi";
import { ProductModel } from "../../apis/product/model/productModel";
import productApi from "../../apis/product/product";
import { IReqProduct } from "../../apis/product/product.interface";
import ModalCreate from "../../components/Modal/ModalProduct/modalCreate";
import ModalColor from "../../components/Modal/ModalProduct/modalCreateColor";
import ModalDiscount from "../../components/Modal/ModalProduct/modalCreateDiscount";
import ModalImport from "../../components/Modal/ModalProduct/modalImport";
import ModalUpdateProduct from "../../components/Modal/ModalProduct/modalUpdateProduct";

import Pagination from "../../components/Pangination/Pagination";
import { moneyFormater } from "../../utils/moneyFormater";
import { notifyError, notifySuccess } from "../../utils/notify";
import Category from "../Category/Createcategory";
import ModalHistoryImport from "../../components/Modal/ModalProduct/modalHistoryImport";
import ModalHistoryPrice from "../../components/Modal/ModalProduct/modalHistoryPrice";
type Props = {};

function Productlist(props: Props) {
  let newProductList = [];
  const navigate = useNavigate();
  const LIMIT = 5;
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalImport, setShowModalImport] = useState(false);
  const [showModalColor, setShowModalColor] = useState(false);
  const [showModalDiscount, setShowModalDiscount] = useState(false);
  const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
  const [showModalHistoryImport, setShowModalHistoryImport] = useState(false);
  const [showModalHistoryPrice, setShowModalHistoryPrice] = useState(false);
  const [productList, setProductlist] = useState<Array<any>>([]);
  const [reLoad, setReload] = useState(0);

  const [searchItem, setSearchItem] = useState("");
  const [order, setOrder] = useState("ACS");
  const [idColor, setIdcolor] = useState("ACS");
  const [_idProduct, set_idProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [codeProduct, setCodeProduct] = useState("");
  const [enable, setEnable] = useState(0);
  const [category, setCategory] = useState<Array<any>>([]);
  const [filterCategory, setFilterCategory] = useState("");

  // const [codeProduct, setCodeProduct] = useState(0);
  const handleRemove = (removeId: number) => {
    newProductList = productList.filter((item: any) => item._id !== removeId);
    notifySuccess("Remove Success");
    setProductlist(newProductList);
  };

  const handleEditProuct = async (status: boolean, code: any) => {
    const payload = {
      code: code,
      enable: !status,
    };

    // console.log(payload);

    const resultEnable = await productApi.updateProduct(payload);
    // console.log(resultEnable);
    if ((resultEnable.msg = "Thành công ")) {
      setEnable(enable + 1);
      notifySuccess("Success");
    } else notifyError("Fail");
  };

  // const hadnleAddColor = (_id: any) => {
  //   set_idProduct(_id);
  //   setShowModalHistoryImport(true);
  // };

  const hadnleShowHistoryImport = (_id: any, name: any) => {
    set_idProduct(_id);
    setNameProduct(name);
    setShowModalHistoryImport(true);
  };

  const hadnleShowHistoryPrice = (code: any, name: any) => {
    setCodeProduct(code);
    setNameProduct(name);
    setShowModalHistoryPrice(true);
  };

  const handleImportProduct = (_id: any) => {
    set_idProduct(_id);
    setShowModalImport(true);
  };

  const handleImportDiscount = (_id: any) => {
    set_idProduct(_id);
    setShowModalDiscount(true);
  };

  const handleUpdateProduct = (_id: any) => {
    set_idProduct(_id);
    setShowModalUpdateProduct(true);
  };

  const handleSelect = (e: any) => {
    // console.log(e.target.value);
    setFilterCategory(e.target.value);
  };

  const sorting = (col: string) => {
    // console.log(col);
    if (order === "ACS") {
      const sorted = [...productList].sort((a: any, b: any) =>
        a[col] > b[col] ? 1 : -1
      );
      setProductlist(sorted);
      setOrder("DCS");
    }
    if (order === "DCS") {
      const sorted = [...productList].sort((a: any, b: any) =>
        a[col] < b[col] ? 1 : -1
      );
      setProductlist(sorted);
      setOrder("ACS");
    }
  };

  useEffect(() => {
    (async () => {
      const skip = currentPage * LIMIT;
      const result = await productApi.getProduct(skip, LIMIT, filterCategory);
      const getCategory = await categoryApi.getCategory();
      // console.log("rerender");
      // console.log("result", result);
      console.log(getCategory);
      setCategory(getCategory.data);
      setProductlist(result.data.data);
      setTotal(result.data.count);
      result.data.data.map((item: any, index: number) => {
        item.totalQuantity = item.colors.reduce(
          (prev: any, next: any) => prev + next.quantity,
          0
        );
      });
    })();
  }, [reLoad, currentPage, enable, filterCategory]);

  // console.log(reLoad);
  // console.log("productList", productList);

  return (
    <>
      <div className="relative table w-full p-2 h-screen">
        <form className="flex items-center mb-[20px] w-[20%] mx-auto">
          <select
            title="selectCategory"
            onChange={handleSelect}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm h-[40px] mr-2 p-2 "
          >
            <option key={-1} value="">
              All
            </option>
            {category.map((item: any, index: number) => (
              <option key={index} value={item?.name}>
                {item?.name}
              </option>
            ))}
          </select>

          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[200px]"
              placeholder="Name, price"
              required
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          <div
            className="flex p-2 items-center gap-2 bg-green-600 ml-2 rounded-lg text-white w-[70px] cursor-pointer"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span className="block select-none">ADD</span>
            <PlusSquareOutlined />
          </div>
        </form>

        <table className="border w-full whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">ID</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Image</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Name</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500 hidden">
                <div className="flex items-center justify-center">Color</div>
              </th>
              <th
                className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500"
                onClick={() => sorting("price")}
              >
                <div className="flex items-center justify-center">
                  Price{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th
                className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500"
                onClick={() => sorting("discount")}
              >
                <div className="flex items-center justify-center">Discount</div>
              </th>
              <th
                className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500"
                onClick={() => sorting("discount")}
              >
                <div className="flex items-center justify-center">
                  Quantity
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg> */}
                </div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Sold</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Rating</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Status</div>
              </th>
              <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                <div className="flex items-center justify-center">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {productList?.length > 0 ? (
              productList
                .filter((value: any, index: number) => {
                  if (searchItem == "") {
                    return value;
                  } else if (
                    value?.name
                      .toLowerCase()
                      .includes(searchItem.toLowerCase()) ||
                    value?.price.toString().includes(searchItem)
                  ) {
                    return value;
                  }
                })
                .map((item: any, index: number) => (
                  <ProductRow
                    item={item}
                    handleImportProduct={handleImportProduct}
                    hadnleShowHistoryImport={hadnleShowHistoryImport}
                    handleUpdateProduct={handleUpdateProduct}
                    hadnleShowHistoryPrice={hadnleShowHistoryPrice}
                    id={index}
                    key={item?._id}
                    handleImportDiscount={handleImportDiscount}
                    handleEnableProduct={handleEditProuct}
                  />
                ))
            ) : (
              <tr>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="">
          <Pagination
            limit={LIMIT}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={total}
          />
        </div>
      </div>
      {showModal && (
        <ModalCreate setOpenModal={setShowModal} setReload={setReload} />
      )}
      {showModalImport && (
        <ModalImport
          setOpenModalImport={setShowModalImport}
          _id={_idProduct}
          setReload={setReload}
        />
      )}
      {showModalColor && (
        <ModalColor
          setOpenModalColor={setShowModalColor}
          _id={idColor}
          setReload={setReload}
        />
      )}
      {showModalDiscount && (
        <ModalDiscount
          setOpenModalDiscount={setShowModalDiscount}
          setReload={setReload}
          _idProduct={_idProduct}
        />
      )}
      {showModalUpdateProduct && (
        <ModalUpdateProduct
          setOpenModalUpdateProduct={setShowModalUpdateProduct}
          _id={_idProduct}
          setReload={setReload}
        />
      )}
      {showModalHistoryImport && (
        <ModalHistoryImport
          setOpenModalHistoryImport={setShowModalHistoryImport}
          _id={_idProduct}
          nameProduct={nameProduct}
          setReload={setReload}
        />
      )}
      {showModalHistoryPrice && (
        <ModalHistoryPrice
          setOpenModalHistoryPrice={setShowModalHistoryPrice}
          code={codeProduct}
          nameProduct={nameProduct}
          setReload={setReload}
        />
      )}
    </>
  );
}

export default Productlist;

const ProductRow = (props: any) => {
  const {
    item,
    handleImportProduct,
    hadnleShowHistoryImport,
    hadnleShowHistoryPrice,
    handleUpdateProduct,
    id,
    handleImportDiscount,
    handleEnableProduct,
  } = props;
  const [colorQuantity, setColorQuantity] = useState(item.totalQuantity);

  return (
    <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
      <td className="p-2 border-r">{id + 1}</td>
      <td className="p-2 border-r w-[100px] h-[100px]">
        <img src={item?.image_url} className="w-full h-full object-contain" />
      </td>
      <td className="p-2 border-r w-[200px]">{item?.name}</td>
      <td className="p-2 border-r hidden ">
        <select
          className="w-full hidden"
          onChange={(e: any) => {
            setColorQuantity(e.target.value);
          }}
        >
          <option value={item?.totalQuantity}>All</option>

          {item?.colors.map((color: any, index: number) => (
            <option key={index} value={color?.quantity}>
              {color?.color}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 border-r ">{moneyFormater(item?.price)}</td>
      <td className="p-2 border-r ">{item?.sale}%</td>
      <td className="p-2 border-r ">{colorQuantity}</td>
      <td className="p-2 border-r">{item?.sold}</td>
      <td className="p-2 border-r">{item?.rating || 0}</td>
      <td className="p-2 border-r ">
        <span
          className={`inline-block p-2 rounded-lg capitalize ${
            item?.enable === true
              ? "text-green-700  bg-successStock"
              : "text-red-700 bg-red-100"
          } `}
        >
          {item?.enable ? "InStock" : "Stocked"}
        </span>
      </td>
      <td className="flex justify-center items-center mb-[40px] mt-[40px] gap-[8px]">
        <a
          onClick={() => {
            handleImportProduct(item?.code);
          }}
          className="bg-green-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
        >
          <span>Import</span>
        </a>
        <a
          onClick={() => {
            hadnleShowHistoryImport(item._id, item.name);
          }}
          className="bg-yellow-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
        >
          <span>History Import</span>
        </a>
        <a
          onClick={() => {
            hadnleShowHistoryPrice(item.code, item.name);
          }}
          className="bg-purple-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
        >
          <span>History Price</span>
        </a>
        {/* <a
          onClick={() => {
            handleImportDiscount(item._id);
          }}
          className="bg-orange-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
        >
          <span>Discount</span>
        </a> */}
        <a
          onClick={() => {
            handleUpdateProduct(item?._id);
          }}
          className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
        >
          <span>Edit</span>
        </a>
        <a
          className={
            item?.enable === false
              ? "bg-green-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
              : "bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
          }
          onClick={() => {
            handleEnableProduct(item?.enable, item?.code);
          }}
        >
          {item?.enable === false ? "Enable" : "Disable"}
        </a>
      </td>
    </tr>
  );
};
