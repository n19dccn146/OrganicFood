import { GetServerSideProps } from 'next';
import React from 'react';
import { MODAL_KEYS } from '~/constants/modal.constants';
import { openModalOrDrawer } from '~/helpers/modal.helper';
import Layout from '~/layouts/Layout';
import { getCategories } from '~/services/request';

const Unauthorized = (props) => {
  return (
    <Layout categories={props?.categories || []}>
      <div className="flex flex-col justify-center items-center">
        <p className="text-md">Vui lòng đăng nhập để tiếp tục</p>
        <button
          onClick={() => openModalOrDrawer(MODAL_KEYS.MODAL_LOGIN)}
          className="block mt-4 px-3 py-2 bg-blue_00 text-white max-w-[110px] rounded-lg"
        >
          Đăng nhập
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const { req } = context;
    const categories = await getCategories();
    const data = await Promise.all([categories]);

    return {
      props: {
        categories: data?.[0]?.data,
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};

export default Unauthorized;
