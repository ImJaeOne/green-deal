import { useCallback, useEffect, useState } from 'react';

export const useProductMapModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [address, setAddress] = useState('');
  const [sendAddress, setSendAddress] = useState(''); // 검색할 주소
  const [addressArr, setAddressArr] = useState(['', '']);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [roadAddress = '', lotAddress = ''] = Array.isArray(addressArr)
    ? addressArr
    : ['', ''];

  // 카카오맵 스크립트 로드 및 초기화
  useEffect(() => {
    if (!isOpen) return;

    return () => {
      // 모달이 닫힐 때 상태 초기화
      setAddressArr(['', '']);
      setSelectedLocation(null);
      setAddress('');
      setSendAddress('');
    };
  }, [isOpen]);

  // 지도 클릭 이벤트 핸들러
  const handleLocationSelect = useCallback((location, address) => {
    setAddressArr(Array.isArray(address) ? address : ['', '']);
    setSelectedLocation(location);
  }, []);

  // 주소 검색 함수
  const searchAddress = () => {
    if (!address.trim()) return;

    setSendAddress(address);
  };

  // 위치 선택 취소
  const cancelLocation = () => {
    setSelectedLocation(null);
    setAddress('');
    onSelectLocation({ lat: null, lng: null }, '');
    onClose();
  };

  // 위치 선택 완료
  const confirmLocation = () => {
    if (!selectedLocation) return;

    onSelectLocation(selectedLocation, roadAddress || lotAddress);
    setSendAddress('');
    onClose();
  };

  return {
    address,
    setAddress,
    sendAddress,
    handleLocationSelect,
    searchAddress,
    cancelLocation,
    confirmLocation,
    selectedLocation,
    roadAddress,
    lotAddress,
  };
};
