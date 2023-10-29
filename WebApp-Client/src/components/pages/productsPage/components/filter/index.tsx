import {
  IconCash,
  IconColorPicker,
  IconDeviceAnalytics,
  IconX,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';
import MultiRangeSlider from '~/components/common/rangeSlider';
import { appendToURL } from '~/helpers/base.helper';
import FilterDropdown from '../filterDropdown';

const Filter = (props) => {
  const { colors, specs = [] } = props;
  const router = useRouter();

  const { query, pathname } = router;
  const clearFilter = () => {
    router.push({
      pathname,
      query: { category: query?.category },
    });
  };

  return (
    <div className="mt-4">
      <p className="my-2 text-gray_B9 font-semibold">Bộ lọc</p>
      <div className="flex flex-wrap gap-2 items-center bg-white">
        <FilterDropdown
          nameFilter="Sản phẩm"
          showDropdown
          dropdownContent={<ColorsFilter colors={colors} />}
          icon={<IconColorPicker stroke={2} color="#000" size={22} />}
        />
        <FilterDropdown
          nameFilter="Giá"
          showDropdown
          dropdownContent={<MoneyRangeFilter />}
          icon={<IconCash stroke={2} color="#000" size={22} />}
        />
        {specs && specs?.length > 0 && (
          <FilterDropdown
            nameFilter="Thuộc tính sản phẩm"
            showDropdown
            dropdownContent={<SpecsFilter specs={specs} />}
            icon={<IconDeviceAnalytics stroke={2} color="#000" size={22} />}
          />
        )}
        <button
          className={
            'h-[36px] flex items-center gap-1 p-2 px-2 border-error bg-error border cursor-pointer rounded-md'
          }
          onClick={clearFilter}
        >
          <IconX stroke={2} color="#fff" size={18} />
          <span className="text-white">Bỏ chọn tất cả</span>
        </button>
      </div>
    </div>
  );
};

const SpecsFilter = (props) => {
  const { specs = [] } = props;
  const router = useRouter();
  const { query } = router;

  const init = (initVal = []) => {
    const _result = {};
    specs.forEach((spec) => {
      _result[spec.name] = initVal;
    });
    return _result;
  };

  const getFromQuery = () => {
    const _exist = {};
    specs.forEach((spec) => {
      if (query[spec.name]) {
        _exist[spec.name] = (query[spec.name] as string).split(';');
      }
    });
    return _exist;
  };

  //   console.log(getFromQuery());

  const [selected, setSelected] = React.useState({
    ...init(),
    ...getFromQuery(),
  });

  const handleFilter = () => {
    const _query = {};
    const _selected = Object.keys(selected);
    _selected.forEach((selectKey) => {
      if (selected[selectKey]?.length > 0)
        _query[selectKey] = selected[selectKey].join(';');
      else _query[selectKey] = undefined;
    });
    appendToURL({
      router,
      newQuery: {
        ..._query,
      },
    });
  };

  const handleClear = () => {
    setSelected(init());
    appendToURL({
      router,
      newQuery: {
        ...init(undefined),
      },
    });
  };

  return (
    <div className="w-[400px]">
      {specs?.map((spec, index) => {
        return (
          <div key={index} className="first:mt-0 mt-3">
            <p className="mb-1">{spec?.name}</p>
            <SpecValues
              spec={spec}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        );
      })}
      <div className="grid grid-cols-2 gap-x-2">
        <button
          onClick={handleClear}
          className="p-2 bg-error w-full text-white border border-error mt-3 rounded-md"
        >
          Xóa thuộc tính
        </button>
        <button
          onClick={handleFilter}
          className="p-2 bg-black text-white border border-black mt-3 rounded-md"
        >
          Lọc
        </button>
      </div>
    </div>
  );
};

const SpecValues = (props) => {
  const { spec, selected = {}, setSelected } = props;

  const _name = spec?.name;

  const selectSpec = (e) => {
    if (selected?.[_name]?.includes(e.value))
      setSelected({
        ...selected,
        [_name]: selected?.[_name]?.filter((specItem) => specItem != e.value),
      });
    else {
      setSelected({
        ...selected,
        [_name]: [...selected[_name], e.value],
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {spec?.values?.map((e, i) => {
        const active = selected?.[_name]?.indexOf(e.value) > -1;
        return (
          <div
            key={i}
            className={`p-2 cursor-pointer rounded-md border border-gray_B9 ${
              active ? 'bg-baseColor' : 'border-gray_B9 hover:border-gray_68'
            }`}
            onClick={() => selectSpec(e)}
          >
            <span className={`text-gray_68`}>{e.value}</span>
          </div>
        );
      })}
    </div>
  );
};

const ColorsFilter = (props) => {
  const { colors } = props;

  const router = useRouter();

  const { query } = router;

  const queryColors = query?.['colors'];

  const [selected, setSelected] = React.useState(
    (queryColors as string)?.split(';') || []
  );

  const selectColor = (e) => {
    if (selected?.includes(e))
      setSelected(selected?.filter((color) => color != e));
    else setSelected([...selected, e]);
  };

  const chooseColors = (e) => {
    appendToURL({
      router,
      newQuery: {
        colors: selected?.length > 0 ? selected?.join(';') : undefined,
      },
    });
  };

  const clearRange = () => {
    appendToURL({
      router,
      newQuery: {
        colors: undefined,
      },
    });
    setSelected([]);
  };

  return (
    <div className="w-[400px]">
      <div className="flex flex-wrap gap-3">
        {colors?.map((e, i) => {
          const active = selected?.indexOf(e) > -1;

          return (
            <div
              key={i}
              className={`p-2 cursor-pointer rounded-md border border-gray_B9 ${
                active ? 'bg-baseColor' : 'border-gray_B9 hover:border-gray_68'
              }`}
              onClick={() => selectColor(e)}
            >
              <span className={`text-gray_68`}>{e}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-x-2">
        <button
          onClick={clearRange}
          className="p-2 bg-error w-full text-white border border-error mt-3 rounded-md"
        >
          Xóa màu
        </button>
        <button
          onClick={chooseColors}
          className="p-2 bg-black text-white border border-black mt-3 rounded-md"
        >
          Lọc
        </button>
      </div>
    </div>
  );
};

const MIN_MONEY = 0;
const MAX_MONEY = 1000000;

const MoneyRangeFilter = () => {
  debugger
  const router = useRouter();

  const { query } = router;
  console.log("tmpne",query)

  const min_price = query?.['min_price'];
  const max_price = query?.['max_price'];
  console.log(min_price)
  console.log(max_price)

  const range = React.useRef({ min_price, max_price });

  const chooseRange = () => {
    console.log(range.current.min_price as string)
    console.log(range.current.max_price as string)
    appendToURL({
      router,
      newQuery: {
        min_price:
          (range.current.min_price as string) != `${MIN_MONEY}`
            ? range.current.min_price
            : undefined,
        max_price:
          (range.current.max_price as string) != `${MAX_MONEY}`
            ? range.current.max_price
            : undefined,
      },
    });
  };

  const clearRange = () => {
    appendToURL({
      router,
      newQuery: {
        min_price: undefined,
        max_price: undefined,
      },
    });
  };

  return (
    <div className="w-full">
      <div className="my-8">
        <MultiRangeSlider
          min={MIN_MONEY}
          max={MAX_MONEY}
          onChange={({ min, max }) =>
            (range.current = { min_price: min, max_price: max })
          }
        />
      </div>

      <button
        onClick={chooseRange}
        className="p-2 bg-black block w-full text-white border border-black mt-3 rounded-md"
      >
        Lọc
      </button>
      <button
        onClick={clearRange}
        className="p-2 bg-error block w-full text-white border border-error mt-3 rounded-md"
      >
        Xóa giá tiền
      </button>
    </div>
  );
};


export default Filter;
