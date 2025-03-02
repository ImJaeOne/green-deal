import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const MapProductModal = ({ product, productInfo }) => {
  return (
    <div>
      {productInfo && productInfo.id === product.id && (
        <CustomOverlayMap
          position={product.location}
          yAnchor={1.4}
          clickable={true}
        >
          <Link
            to={`/product/detail/${product.id}`}
            className="pointer-events-auto flex flex-col items-center justify-center p-5 bg-white border-4 border-[#55CCC9] rounded-xl text-black text-center min-w-[120px] transition-transform duration-200 ease-in-out hover:scale-110"
          >
            <div className="mb-1 font-bold">{product.name}</div>
            <div className="mb-1 text-gray-600">
              {Number(product.price).toLocaleString()}원
            </div>
            <div className="text-xs text-gray-500">
              {[
                product.users.name,
                dayjs(product.createdAt).format('YY.MM.DD'),
              ].join(' ')}
            </div>
          </Link>
        </CustomOverlayMap>
      )}
    </div>
  );
};

export default MapProductModal;
