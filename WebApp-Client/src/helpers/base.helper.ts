// export const formatMoney = (money: number): string =>
//   money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

import { NextRouter } from 'next/router';

export const formatCurrency2 = (value?: number) => {
  if (!value) return '0 ₫';
  return value
    .toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    .replace('VND', '₫');
};

export const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(key: string): T => {
  if (typeof window === 'undefined') return;
  const value = window.localStorage.getItem(key);
  if (!value) return null;
  const parsedValue = JSON.parse(value);
  return parsedValue;
};

export const getLengthArray = (array: any[]): number => array.length;

type ErrorResponseType = boolean | undefined;

export const responseHasError = (err: ErrorResponseType) =>
  [null, undefined, NaN, true].some((type) => type === err);

type ErrorResponseAllType = ErrorResponseType | Array<boolean | undefined>;

export const responseHasErrorAll = (err: ErrorResponseAllType) => {
  let _err: ErrorResponseAllType = err;
  if (!Array.isArray(err)) _err = [err];
  return (_err as ErrorResponseType[]).some((err) =>
    [null, undefined, NaN, true].some((type) => type === err)
  );
};

export const calculateSalePrice = (currentPrice = 0, salePercent = 0) =>
  Math.round(currentPrice * (1 - salePercent / 100) * 100) / 100;

export const appendToURL = ({
  router,
  newQuery = {},
}: {
  router: NextRouter;
  newQuery: Record<string, any>;
}) => {
  const _query = { ...router.query };
  Object.keys(newQuery).forEach(function (key) {
    const value = newQuery?.[key];
    if (!value) {
      if (_query?.[key]) delete _query?.[key];
    } else _query[key] = value;
  });

  if (JSON.stringify(_query) != JSON.stringify(router.query))
    router.push({
      pathname: router.pathname,
      query: {
        ..._query,
      },
    });
};
