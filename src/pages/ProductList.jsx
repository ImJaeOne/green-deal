import React from 'react';
import KakaoMap from '../components/KakaoMap/KakaoMap';
import { useState } from 'react';
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

  // 이중 배열로 되어 있어 flatMap을 통해 한 단계를 풀어줍니다.
  const products = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="flex flex-col w-full h-[100vh] pt-[60px] overflow-hidden md:flex-row">
      {/* 검색바는 항상 유지 */}
      <div className="w-full border-r border-light-gray h-full bg-white md:w-[360px]">
        <SearchBar setSearch={setSearch} />
        {isLoading ? (
          <div>물품을 불러오는 중...</div>
        ) : (
          <SearchList
            filteredProducts={products || []}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        )}
      </div>

      {/* 지도 부분도 데이터 로딩 여부에 따라 변경 */}
      <div className="flex gap-[84px] flex-col flex-grow w-full my-[130px] mx-[90px] md:w-3/4">
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
            <div>지도를 불러오는 중...</div>
          ) : (
            <KakaoMap
              level={selectedProduct ? 5 : 10}
              mode={'productList'}
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
