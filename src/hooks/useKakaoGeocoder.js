import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export const useKakaoGeocoder = () => {
  const geocoder = useRef(null);

  // 지오코더 초기화
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      geocoder.current = new window.kakao.maps.services.Geocoder();
    }
  }, []);

  // 주소로 좌표 검색
  const addressToCoords = useCallback(async (address) => {
    return new Promise((resolve, reject) => {
      // 주소로 좌표를 검색하여 좌표를 받아옴
      geocoder.current.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({
            lat: result[0].y,
            lng: result[0].x,
          });
        } else {
          reject(new Error('주소를 찾을 수 없습니다.'));
        }
      });
    });
  }, []);

  // 좌표로 주소 검색
  const coordsToAddress = useCallback(async (coords) => {
    if (!geocoder.current || !coords) return;
    return new Promise((resolve, reject) => {
      // 좌표로 상세 주소 정보를 요청
      geocoder.current.coord2Address(
        coords?.getLng?.() ?? coords.lng,
        coords?.getLat?.() ?? coords.lat,
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve([
              result[0].road_address?.address_name,
              result[0].address?.address_name,
            ]);
          } else {
            reject(new Error('주소를 찾을 수 없습니다.'));
          }
        },
      );
    });
  }, []);

  return { addressToCoords, coordsToAddress };
};
