import { GetServerSideProps } from 'next';
import HomePage from '~/components/pages/homePage';
import { API_URL } from '~/constants/api.constant';
import API from '~/services/axiosClient';
import { getCategories } from '~/services/request';
import { ReturnListResponse } from '~/services/response.interface';

export default function Home(props) {
  return <HomePage {...props} />;
}

const getTopProducts = async (category = '') => {
  const cate = category ? { category } : {};
  return await API.get<ReturnListResponse<any>>({
    url: API_URL.TOP_PRODUCT,
    params: {
      quantity: 5,
      ...cate,
    },
  });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const categories: any = await getCategories();
    // console.log(`file: index.tsx:15 => categories`, categories);
    const bestseller = await getTopProducts();

    let cateCount = [];
    if (categories.data?.length > 5) {
      cateCount = [
        categories.data[0],
        categories.data[1],
        categories.data[2],
        categories.data[3],
        categories.data[4],
      ];
    } else cateCount = [...categories.data];

    const listName = cateCount.map((e) => e.name);
    const listFetch = cateCount.map((e) => getTopProducts(e.name));

    const cateBestseller = await Promise.all(listFetch);

    const data = await Promise.all([categories, bestseller]);
    const cateData = listName.map((e, i) => ({
      name: e,
      data: cateBestseller[i].data,
    }));

    return {
      props: {
        categories: data?.[0]?.data,
        bestseller: data?.[1]?.data,
        categoryBestseller: cateData,
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};
