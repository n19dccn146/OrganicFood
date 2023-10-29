const BrandFilter = (props: {
  brands: Array<{ icon: string; value: string }>;
}) => {
  const { brands } = props;
  return (
    <div className="mt-4">
      <p className="my-2 text-[16px] font-semibold uppercase text-gray_B9">
        Thương hiệu
      </p>
      <div className="flex flex-wrap gap-2 items-center bg-white">
        {brands.map((e, i) => (
          <div
            key={i}
            className="h-[36px] p-1 w-auto border border-gray_D9 hover:border-black cursor-pointer rounded-xl"
          >
            <img
              src={e.icon}
              alt={e.value}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
