import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';
import MyLocationMarker from './MyLocationMarker';
import MapProductMarker from './MapProductMarker';
import { MODE } from '../../constants/constants';
import { useKakaoGeocoder } from '../../hooks/useKakaoGeocoder';

const KakaoMap = ({
  level,
  mode,
  productList,
  selectedProduct,
  onLocationSelect,
  sendAddress,
}) => {
  const [location, setLocation] = useState({ lat: null, lng: null }); // 유저의 중심 위치를 위한 상태
  const [productInfo, setProductInfo] = useState(null);
  const [center, setCenter] = useState(location); // 지도의 중심 위치를 위한 상태

  const { addressToCoords, coordsToAddress } = useKakaoGeocoder();

  useEffect(() => {
    getUserLocation()
      .then((coords) => {
        setLocation({ lat: 37.5568, lng: 126.9237 });
        setCenter({ lat: 37.5568, lng: 126.9237 });
      }) // 더미 데이터 확인을 위한 위도 경도 설정입니다. 추후에 coords로 변경 예정
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const foundProduct = productList.find(
        (product) => product.id === selectedProduct,
      );
      if (foundProduct) {
        setCenter(foundProduct.location); // 지도 중심을 해당 위치로 이동
      }
      setProductInfo(foundProduct || null);
    }
  }, [selectedProduct, productList]);

  // 주소 검색 처리
  useEffect(() => {
    if (!sendAddress) return;
    const searchAddress = async (address) => {
      try {
        const coords = await addressToCoords(address);
        if (coords === null) {
          return alert('주소 검색에 실패했습니다. 다시 시도해주세요.');
        }
        if (location.lat !== coords.lat || location.lng !== coords.lng) {
          setLocation(coords);
          setCenter(coords);
        }

        const detailAddr = await coordsToAddress(coords);
        if (onLocationSelect) onLocationSelect(coords, detailAddr);
      } catch (error) {
        console.error('주소 검색 실패', error);
        return alert('주소 검색에 실패했습니다. 다시 시도해주세요.');
      }
    };
    searchAddress(sendAddress);
  }, [sendAddress, addressToCoords, coordsToAddress, onLocationSelect]);

  // 지도 클릭 핸들러
  // mode: PRODUCTLIST - 상품 목록 모드, LOCATIONPICKER - 위치 선택 모드
  const handleClickMap = async (_, mouseEvent) => {
    if (mode === MODE.PRODUCTLIST) {
      setProductInfo(null);
    }
    if (mode === MODE.LOCATIONPICKER) {
      const latlng = mouseEvent.latLng;
      const newLocation = {
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      };

      try {
        const detailAddr = await coordsToAddress(latlng);

        if (onLocationSelect) {
          onLocationSelect(newLocation, detailAddr);
        }
        setLocation(newLocation);
        setCenter(newLocation);
      } catch (error) {
        console.error('주소 변환 실패', error);
        return alert('주소 변환에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Map
        center={center}
        level={level}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClickMap}
      >
        {mode === MODE.PRODUCTLIST && (
          <>
            <MyLocationMarker location={location} />
            <MapProductMarker
              productList={productList}
              productInfo={productInfo}
              setProductInfo={setProductInfo}
            />
          </>
        )}
        {mode === MODE.LOCATIONPICKER && <MapMarker position={location} />}
      </Map>
    </div>
  );
};

export default KakaoMap;
