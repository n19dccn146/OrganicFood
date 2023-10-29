import React from 'react';
import ProductCard from '~/components/common/productCard';
import Layout from '~/layouts/Layout';

const SectionTitle = (props) => {
  const { title = 'Title' } = props;
  return (
    <div className="flex items-center">
      <div className="h-[1px] bg-gray_B9 flex-grow"></div>
      <p className="text-center text-2xl uppercase font-semibold max-w-[60%] mx-5">
        {title}
      </p>
      <div className="h-[1px] bg-gray_B9 flex-grow"></div>
    </div>
  );
};

const HomePage = (props) => {
  const { bestseller, categoryBestseller = [] } = props;

  return (
    <Layout categories={props?.categories || []}>
      {/* Banner */}
      <div className="grid grid-cols-12 grid-rows-6 grid-flow-row-dense gap-y-3 gap-x-3">
        <div className="col-span-8 row-span-full">
          <img
            className="w-full h-full object-cover"
            src="/assets/images/home/banner1.jpg"
            alt="banner-1"
          />
        </div>
        <div className="col-span-4 row-start-1 row-end-4">
          <img
            className="w-full h-full object-cover"
            src="/assets/images/home/banner2.jpg"
            alt="banner-1"
          />
        </div>
        <div className="col-span-2 row-start-4 row-end-7">
          <img
            className="w-full h-full object-cover"
            src="/assets/images/home/banner3.jpg"
            alt="banner-1"
          />
        </div>
        <div className="col-span-2 row-start-4 row-end-7">
          <img
            className="w-full h-full object-cover"
            src="/assets/images/home/banner4.jpg"
            alt="banner-1"
          />
        </div>
      </div>
      {/* Bestseller */}
      <div className="mt-8">
        <SectionTitle title={'Bán chạy nhất'} />
        <div className="mt-4 bg-white p-2">
          <div className="grid grid-cols-5 gap-x-3">
            {bestseller?.map((e, i) => {
              return <ProductCard key={i} {...e} />;
            })}
          </div>
        </div>
      </div>

      {categoryBestseller.map((e, i) => {
        if (e?.data?.length <= 0)
          return <React.Fragment key={i}></React.Fragment>;
        return (
          <div className="mt-8" key={i}>
            <SectionTitle title={`${e.name}`} />
            <div className="mt-4 bg-white p-2">
              <div className="grid grid-cols-5 gap-x-3">
                {e.data?.map((e, i) => {
                  return <ProductCard key={i} {...e} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default HomePage;
