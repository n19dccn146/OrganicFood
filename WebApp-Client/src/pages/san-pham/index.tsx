import { GetServerSideProps } from 'next';
import ProductsPage from '~/components/pages/productsPage';
import { API_URL } from '~/constants/api.constant';
import API from '~/services/axiosClient';
import { getCategories } from '~/services/request';
import {
  ReturnListResponse,
  ReturnResponse,
} from '~/services/response.interface';

type Props = {};

export const LIMIT = 10;
export const SORT = [
  { sortName: 'price', sortType: 1, label: 'Giá thấp - cao' },
  { sortName: 'price', sortType: -1, label: 'Giá cao - thấp' },
  { sortName: 'sale', sortType: 1, label: 'Khuyến mãi thấp - cao' },
  { sortName: 'sale', sortType: -1, label: 'Khuyến mãi cao - thấp' },
  { sortName: 'sold', sortType: 1, label: 'Bán chạy thấp - cao' },
  { sortName: 'sold', sortType: -1, label: 'Bán chạy cao - thấp' },
  { sortName: 'total_rate', sortType: 1, label: 'Đánh giá cao - thấp' },
  { sortName: 'total_rate', sortType: -1, label: 'Đánh giá thấp - cao' },
];

const ProductList = (props: Props) => {
  return <ProductsPage {...props} />;
};

// Bộ lọc

// field: category, specs, colors, min_price, max_price, skip, limit, sortName, sortType
// type:
//      search: string - name, code - undefine = all
//      category: string
//      specs: object - {name: string, values: any[]} - undefine = all | or | [{name: string, values: string}]
//      colors: string - undefine = all - colors: "white;blue"
//      min_price: number - undefine = 0
//      max_price: number - undefine = 1000000000
//      skip: number - undefine = 0
//      limit: number - undefine = 20
//      sortName: string - in ["price", "sale", "sold", "total_rate"]
//      sortType: number - 1 tăng dần, -1 giảm dần
// rule:
//      specs hiệu quả khi đi với category,
//      sortType và sortName hiệu quả khi đi với nhau
// example
//      "name": "Laptop",
//      "specs": {name: "Ram", values:"8gb;16gb"},
//      "colors": ["Red"],
//      "max_price": 65000000
// if skip == undefine => trả về count để phân trang

const getQueryURL = (query: any) => {
  const {
    category,
    colors,
    min_price,
    max_price,
    skip = 0,
    limit = LIMIT,
    sortName = SORT[0].sortName,
    sortType = SORT[0].sortType,
    ...specs
  } = query;
  const _specs = [];
  if (specs) {
    for (const spec in specs) {
      _specs.push(`{"name":"${spec}", "values": "${specs[spec]}"}`);
    }
  }

  const resultSpecs = _specs.join(',') == '' ? {} : { specs: _specs.join(',') };
  const rawParams = {
    category,
    ...resultSpecs,
    colors,
    min_price,
    max_price,
    skip,
    limit,
    sortName,
    sortType,
  };

  const params = {};
  for (const query in rawParams) {
    if (rawParams[query] !== undefined) params[query] = rawParams[query];
  }

  return params;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    const category = query?.['category'];
    const categories = await getCategories();
    const cateInfo = await API.get<ReturnResponse<any>>({
      url: API_URL.CATEGORY_READ,
      params: {
        name: category,
      },
    });

    const productColors = await API.get<ReturnListResponse<any>>({
      url: API_URL.PRODUCT_COLORS,
    });
    const productList = await API.get<ReturnResponse<any>>({
      url: API_URL.PRODUCT_LIST,
      params: { ...getQueryURL(query) },
    });

    console.log(productList.data.data);

    const data = await Promise.all([
      categories,
      cateInfo,
      productList,
      productColors,
    ]);

    return {
      props: {
        categories: data?.[0]?.data,
        cateInfo: data?.[1]?.data,
        products: { ...data?.[2]?.data },
        colors: data?.[3]?.data,
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};

export default ProductList;
