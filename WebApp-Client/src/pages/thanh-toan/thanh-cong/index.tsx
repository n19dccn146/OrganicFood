import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from './style.module.css';
type Props = {};

const TransactionSuccess = (props: Props) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/');
  };

  return (
    <div className={style.transactionWrapper}>
      <div className={style.transactionContainer}>
        <div className={style.transactionHeader}>
          <div className={style.transactionHeaderLeft}></div>
          <div className={style.transactionHeaderRight}></div>
        </div>
        <div className={style.transactionBody}>
          <p>Thanh toán của bạn đã thành công</p>
          <p>XIN CHÂN THÀNH CẢM ƠN QUÝ KHÁCH ĐÃ MUA HÀNG TẠI OganicShop</p>
          <button className={style.btnTransaction} onClick={handleSubmit}>
            Trở về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
