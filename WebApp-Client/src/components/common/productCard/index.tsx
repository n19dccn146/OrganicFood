import { IconShoppingCartPlus } from '@tabler/icons';
import Link from 'next/link';
import { calculateSalePrice, formatCurrency2 } from '~/helpers/base.helper';
import React from 'react';
import styles from './style.module.css';
import { productURL } from '~/helpers/url.helper';
import StarRating from '../starRating';
import useCartHook from '~/hooks/useCartHook';
import { toast } from 'react-hot-toast';

const ProductCard = (props: any) => {
  const {
    _id,
    name = '',
    sale: salePercent = 0,
    price = 0,
    total_rate = 0,
    image_url,
    colors = [],
  } = props;
  const { addToCart } = useCartHook();

  const newPrice = calculateSalePrice(price, salePercent);

  const thumbnail =
    image_url || colors?.[0]?.image_url || '/assets/images/img_no_image.jpg';

  const isComingSoon = React.useMemo(() => {
    const inStock = colors?.reduce((e, v) => e + v?.quantity, 0);
    return inStock <= 0;
  }, [colors]);

  const handleAddToCart = () => {
    if (colors && !!colors[0]) {
      addToCart({
        product: _id,
        quantity: 1,
        color: colors[0]?.color,
      });
      toast.success('Đã thêm vào giỏ hàng');
    } else {
      toast.error('Không thể mua hàng');
    }
  };

  return (
    <div className={styles.product_card}>
      <Link href={productURL(_id)}>
        <a className="">
          <span className="w-full h-[250px] mb-3 block">
            <img
              src={thumbnail}
              className="w-full h-full object-cover"
              alt=""
            />
            {salePercent > 0 && (
              <span className="absolute right-[-3px] top-[15px] w-[80px]">
                <img
                  src={'/assets/icons/ic_discount.png'}
                  className="w-full h-full"
                  alt=""
                />
                <span className="absolute text-xs top-1/2 left-0 -translate-y-1/2 text-white w-full text-center">
                  Giảm {salePercent}%
                </span>
              </span>
            )}
          </span>
          <h3 className={styles.product_name}>{name || '<Chưa cập nhật>'}</h3>
          <span className={styles.box_price}>
            <span className={styles.product__price}>
              {!isComingSoon && formatCurrency2(newPrice)}
            </span>
            {salePercent > 0 && (
              <span className={styles.product__price__old}>
                {formatCurrency2(price)}
              </span>
            )}
          </span>
        </a>
      </Link>
      <StarRating total_rate={total_rate} />
      <div className={styles.btn_wish_list}>
        {isComingSoon && <span className="italic text-dark_3">Sắp ra mắt</span>}
        {!isComingSoon && (
          <button
            className="h-[24px] flex gap-x-1 items-center text-[14px] text-[#2f80ed] font-medium"
            onClick={handleAddToCart}
          >
            <IconShoppingCartPlus stroke={2} size={24} color={'#2f80ed'} />
            <span>Thêm vào giỏ hàng</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
