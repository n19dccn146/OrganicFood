import React, { Children, useState } from "react";
import productApi from "../../apis/product/product";

type Props = {
  currentPage: number;
  total: number;
  limit: number;
  setCurrentPage: any;
};

const Pagination = (props: Props) => {
  const { total, limit, currentPage, setCurrentPage } = props;

  const pages = Math.ceil(total / limit);

  //   const skip = async () => {
  //     const result = await productApi.getSkipProduct(
  //       limit,
  //       (currentPage - 1) * 10
  //     );
  //     console.log("skip", result);
  //   };
  // skip()

  return (
    <div className="flex justify-center mt-20">
      <button
        className="h-12 border-2 border-r-0 border-indigo-600
                  px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
        disabled={currentPage <= 0}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
      {[...Array(pages)].map((_, i: number) => (
        <button
          key={i}
          className={`h-12 border-2 border-r-0 border-indigo-600 
                  w-12 ${currentPage === i ? "bg-indigo-600 text-white" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="h-12 border-2  border-indigo-600
                  px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
        onClick={() => setCurrentPage(currentPage + 1)}
        // Disable khi trang hien tai la trang cuoi cung
        disabled={currentPage >= pages - 1}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
