import { IconSearch } from '@tabler/icons';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import Flex from '~/components/common/flex';
import { API_URL } from '~/constants/api.constant';
import {
  calculateSalePrice,
  formatCurrency2,
  responseHasError,
} from '~/helpers/base.helper';
import { productURL } from '~/helpers/url.helper';
import useDebounce from '~/hooks/useDebounce';
import API from '~/services/axiosClient';
import { ReturnResponse } from '~/services/response.interface';
import styles from '../../layout.module.css';

// type Props = {}

const HeaderSearch = () => {
  const [dataSearch, setDataSearch] = React.useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const { register, handleSubmit } = useForm();

  const cancelSearch = () => {
    setDataSearch([]);
    setSearchKeyword('');
  };

  const onSearchDebounce = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!value) {
        if (dataSearch.length) cancelSearch();
        return;
      }
      setSearchKeyword(value);
      API.get<ReturnResponse<any>>({
        url: API_URL.PRODUCT_LIST,
        params: { search: value },
      }).then((response) => {
        if (!responseHasError(response.error)) {
          const data = (response?.data?.data || []).slice(0, 5);
          setDataSearch(data);
        }
      });
    },
    300
  );

  const onSearch = () => {
    debugger
    window.location.href = `/tim-kiem?search=${searchKeyword}`;
  };

  return (
    <form className="pl-4 h-full" onSubmit={handleSubmit(onSearch)}>
      <Flex className="h-full" alignItem="center">
        <div
          className={`px-[10px] w-full h-full relative ${styles.search__input_nav}`}
        >
          <input
            type="text"
            {...register('search')}
            className="w-full h-full border-none outline-none"
            placeholder="Bạn đang tìm kiếm gì thế?"
            onChange={onSearchDebounce}
          />
          {/* <div className={`${styles.focus__bar}`}></div> */}
          {searchKeyword && (
            <div className={styles.search__result_table}>
              <ul>
                {dataSearch.map((e) => (
                  <li key={e.id} className="my-[10px]">
                    <SearchItem {...e} />
                  </li>
                ))}
                <li className="my-[10px]">
                  <div className="flex items-center justify-between">
                    <a href={`/tim-kiem?search=${searchKeyword}`}>
                      Tất cả kết quả tìm kiếm cho:{' '}
                      <span className="font-medium">
                        &quot;{searchKeyword}&quot;
                      </span>
                    </a>
                    <button
                      onClick={cancelSearch}
                      type="button"
                      className="px-3 py-1 bg-transparent text-gray_B9"
                    >
                      Hủy
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button type="submit" className="h-full px-[20px] bg-green">
          <span>
            <IconSearch size={16} strokeWidth={2} color={'white'} />
          </span>
        </button>
      </Flex>
    </form>
  );
};

const SearchItem = (props: any) => {
  const {
    _id,
    name = '',
    sale: salePercent = 0,
    price = 0,
    // total_rate = 0,
    image_url,
    colors = [],
  } = props;

  const newPrice = calculateSalePrice(price, salePercent);
  const thumbnail =
    image_url || colors?.[0]?.image_url || '/assets/images/img_no_image.jpg';

  return (
    <a href={productURL(_id)} className={styles.search__result_item}>
      <div className="w-full h-[100px] col-span-1 rounded-md bg-gray_D9">
        <img
          src={thumbnail}
          alt="result"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full col-span-1 flex flex-col">
        <p className=" font-semibold max_line-1">{name}</p>
        {salePercent > 0 && (
          <p className="font-normal text-sm h-[40px] max_line-2 text-error">
            Giảm giá {salePercent}%
          </p>
        )}
        <p className="mt-auto text-dark_3 text-md font-light">
          {formatCurrency2(newPrice)}
        </p>
      </div>
    </a>
  );
};

export default HeaderSearch;
