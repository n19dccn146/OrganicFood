import { GetServerSideProps } from 'next';
import SearchPage from '~/components/pages/searchPage';
import { API_URL } from '~/constants/api.constant';
import API from '~/services/axiosClient';
import { getCategories } from '~/services/request';
import { ReturnResponse } from '~/services/response.interface';

const Search = (props) => {
  return <SearchPage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    const { search = '' } = query;
    const categories = await getCategories();
    const productList = await API.get<ReturnResponse<any>>({
      url: API_URL.PRODUCT_LIST,
      params: { search },
    });

    const data = await Promise.all([categories, productList]);

    return {
      props: {
        categories: data?.[0]?.data,
        products: { ...data?.[1]?.data },
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};

export default Search;
