import React, { useState } from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import SearchBar from '../components/productlist/SearchBar';
import SearchList from '../components/productlist/SearchList';
import { useGetProducts } from '../hooks/useProduct';
import AllowedRoute from '../routes/AllowedRoute';
import HighlightText from '../components/common/HighlightText';

const ProductList = () => {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetProducts(search);

  const products = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="flex flex-col w-full h-[100vh] pt-[60px] overflow-hidden md:flex-row">
      {/* 왼쪽: 모바일에서는 지도+리스트 / 데스크탑에서는 리스트만 */}
      <div className="flex flex-col w-full h-full md:w-[360px] md:border-r border-light-gray bg-white">
        <SearchBar setSearch={setSearch} />

        {/* 모바일 환경에서만 지도 표시 */}
        <div className="relative flex flex-col flex-grow md:hidden">
          <AllowedRoute>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                지도를 불러오는 중...
              </div>
            ) : (
              <div className="w-full h-full">
                <KakaoMap
                  level={selectedProduct ? 1 : 3}
                  mode="productList"
                  productList={products}
                  selectedProduct={selectedProduct}
                />
              </div>
            )}
          </AllowedRoute>
        </div>

        {/* 검색 리스트는 항상 표시 */}
        <div className="flex-grow overflow-hidden">
          <SearchList
            filteredProducts={products}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>

      {/* 데스크탑 환경에서만 지도 표시 */}
      <div
        className="hidden md:flex flex-col  flex-grow w-full m-[90px] gap-[84px] 
  lg:m-[30px] lg:gap-[30px]"
      >
        <span className="font-semibold text-title-md">
          {search ? (
            <>
              <HighlightText>"{search}"</HighlightText>에 대한 검색 결과
            </>
          ) : (
            <>
              <HighlightText>국내 인기 있는 매물</HighlightText>
              TOP 20
            </>
          )}
        </span>

        <AllowedRoute>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              지도를 불러오는 중...
            </div>
          ) : (
            <KakaoMap
              level={selectedProduct ? 5 : 10}
              mode="productList"
              productList={products}
              selectedProduct={selectedProduct}
            />
          )}
        </AllowedRoute>
      </div>
    </div>
  );
};

export default ProductList;
