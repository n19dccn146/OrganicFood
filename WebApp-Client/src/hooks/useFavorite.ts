import React from 'react';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { getCookie } from '~/helpers/cookie.helper';
import useAuth from '~/stores/auth';

const useFavorite = () => {
  const [{ userInfo }, { setFavoriteProducts }] = useAuth();

  const isFavoriteProduct = React.useCallback(
    (id: string) => {
      return false; // !!profileInfo?.favoriteWines?.[id];
    },
    [userInfo]
  );

  const handleCreateFavorite = React.useCallback((e, id) => {
    e.preventDefault();
    try {
      const access_token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
      if (!access_token) throw new Error();
      setFavoriteProducts(id);
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isFavoriteProduct,
    handleCreateFavorite,
  };
};

export default useFavorite;
