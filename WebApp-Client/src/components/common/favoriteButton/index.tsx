import { IconHeart } from '@tabler/icons';
import React from 'react';
import useFavorite from '~/hooks/useFavorite';
import useAuth from '~/stores/auth';

const iconProps = {
  stroke: 2,
  size: 24,
  color: '#FF3737',
  className: 'cursor-pointer hover:scale-110',
};

const FavoriteButton = (props) => {
  const { handleCreateFavorite, isFavoriteProduct } = useFavorite();
  const [{ signedIn }] = useAuth();
  const productId = props?.productId || '';
  const containerClass = props?.containerClass || 'favorite';

  if (!signedIn) return <></>;

  return (
    <div
      className={containerClass}
      onClick={(e) => handleCreateFavorite(e, productId)}
    >
      {isFavoriteProduct(productId) ? (
        <IconHeart {...iconProps} fill={'#FF3737'} />
      ) : (
        <IconHeart {...iconProps} fill={'#fff'} />
      )}
    </div>
  );
};

export default React.memo(FavoriteButton);
