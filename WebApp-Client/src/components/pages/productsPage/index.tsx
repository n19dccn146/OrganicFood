import { useRouter } from 'next/router';
import Breadcrumb from '~/components/common/breadcrumbs';
import ProductCard from '~/components/common/productCard';
import { appendToURL } from '~/helpers/base.helper';
import Layout from '~/layouts/Layout';
import { SORT } from '~/pages/san-pham';
import Filter from './components/filter';

// phan trang

const ProductsPage = (props: any) => {
  const { products, cateInfo, colors } = props;
  const total = products?.count || 0;

  const router = useRouter();

  const { query } = router;

  const sortName = query?.['sortName'];
  const sortType = query?.['sortType'];

  const handleSort = ({ sortName, sortType }) => {
    appendToURL({ router, newQuery: { sortName, sortType } });
  };

  return (
    <Layout categories={props.categories || []}>
      <Breadcrumb
        path={[
          {
            slug: '/san-pham',
            name: 'Sản phẩm',
          },
          {
            slug: '/san-pham',
            name: (
              <span className="flex items-center gap-x-2">
                <img
                  src={cateInfo?.icon_url}
                  className="h-[24px] w-[24px]"
                  alt="breadcrumb_icon"
                />{' '}
                {cateInfo?.name}
              </span>
            ),
          },
        ]}
      />

      <div className="h-[300px] w-full my-4 rounded border border-gray_F1 p-1">
        <img
          src={cateInfo?.image_url}
          alt=""
          className="w-full h-full object-cover rounded"
        />
      </div>
      {/* Filter */}
      <Filter colors={colors} specs={cateInfo?.specsModel} />

      <div className="my-5">
        <p className="text-gray_B9 font-semibold my-2">Sắp xếp theo</p>
        <div className="flex items-center flex-wrap gap-3">
          {SORT.map((e, i) => {
            const active =
              sortName && sortType
                ? sortName == e.sortName && sortType == e.sortType.toString()
                : i == 0;

            return (
              <div
                key={i}
                className={`p-2 cursor-pointer rounded-xl border border-gray_B9 ${
                  active
                    ? 'bg-baseColor'
                    : 'border-gray_B9 hover:border-gray_68'
                }`}
                onClick={() =>
                  handleSort({ sortName: e.sortName, sortType: e.sortType })
                }
              >
                <span className={`text-gray_68`}>{e.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {products?.data?.length <= 0 && <p>Không có sản phẩm của danh mục này</p>}
      <div className="grid grid-cols-5 gap-x-3 gap-y-3">
        {total > 0 ? (
          (products?.data || []).map((product, index) => {
            return <ProductCard key={index} {...product} />;
          })
        ) : (
          <div className="col-span-5">
            <p className="text-center">Không có sản phẩm của danh mục này</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
