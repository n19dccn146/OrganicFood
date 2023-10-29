import { useRouter } from 'next/router';
import ProductCard from '~/components/common/productCard';
import Layout from '~/layouts/Layout';

const SearchPage = (props) => {
  const { products } = props;
  const total = products?.count || 0;

  const { query } = useRouter();

  return (
    <Layout categories={props?.categories || []}>
      {/* Banner */}
      <div className="my-8">
        <h3 className="text-xl font-medium">
          Kết quả tìm kiếm cho:{' '}
          <span className="italic">&quot;{query?.search || ''}&quot;</span>
        </h3>
      </div>
      <div className="grid grid-cols-5 gap-x-3 gap-y-3">
        {total > 0 ? (
          (products?.data || []).map((product, index) => {
            return <ProductCard key={index} {...product} />;
          })
        ) : (
          <div className="col-span-5">
            <p className="text-center">Không có kết quả</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
