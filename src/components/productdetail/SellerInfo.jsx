import React from 'react';

const SellerInfo = ({ seller }) => {
  return (
    <div className="flex items-center gap-[20px] px-[20px] lg:px-[30px] py-[20px] border-b-[1px] border-light-gray">
      <img
        src={seller?.profile_img}
        alt={seller?.name}
        className="w-10 h-10 bg-gray-300 rounded-full"
      />
      <span className="font-semibold text-black text-title-sm">
        {seller?.name}
      </span>
    </div>
  );
};

export default SellerInfo;
