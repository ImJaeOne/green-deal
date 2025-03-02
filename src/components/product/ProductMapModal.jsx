import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import React, { Fragment } from 'react';
import Button from '../common/Button';
import KakaoMap from '../KakaoMap/KakaoMap';
import Input from '../common/Input';
import { useProductMapModal } from '../../hooks/useProductMapModal';
import { MODE } from '../../constants/constants';

const LOAD_ADDRESS_STYLES = 'text-text-sm text-deep-gray';

const ProductMapModal = ({ isOpen, onClose, onSelectLocation }) => {
  const {
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
  } = useProductMapModal({ isOpen, onClose, onSelectLocation });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* 배경 오버레이 */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </TransitionChild>

        {/* 모달 */}
        <div
          className="fixed inset-0 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                {/* X 표시 (닫기 버튼) 추가 */}
                <button
                  onClick={onClose}
                  className="absolute p-1 transition-colors rounded-full top-4 right-4 hover:bg-gray-100"
                  aria-label="닫기"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <DialogTitle
                  as="h3"
                  className="mb-4 font-medium text-center text-title-sm text-deep-gray"
                >
                  위치 검색
                </DialogTitle>

                {/* 검색창 */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="도로명 주소를 입력하세요"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchAddress()}
                    />
                    <Button onClick={searchAddress}>검색</Button>
                  </div>
                </div>

                {/* 카카오맵 */}
                <div className="w-full mb-4 border border-gray h-80 rounded-xl">
                  <KakaoMap
                    level={3}
                    mode={MODE.LOCATIONPICKER}
                    onLocationSelect={handleLocationSelect}
                    sendAddress={sendAddress}
                  />
                </div>

                {/* 선택된 위치 */}
                {selectedLocation && (
                  <div className="p-4 mb-4 bg-light-mint bg-opacity-20 rounded-xl">
                    <h3 className="mb-1 font-medium text-text-md text-deep-gray">
                      선택한 위치
                    </h3>
                    <p className={LOAD_ADDRESS_STYLES}>
                      <span className="font-semibold">도로명 주소</span>:{' '}
                      {roadAddress || '주소 정보 없음'}
                    </p>
                    <p className={LOAD_ADDRESS_STYLES}>
                      <span className="font-semibold">지번 주소</span>:{' '}
                      {lotAddress || '주소 정보 없음'}
                    </p>
                  </div>
                )}

                {/* 하단 버튼 */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={cancelLocation}>
                    초기화
                  </Button>
                  <Button
                    onClick={confirmLocation}
                    disabled={!selectedLocation}
                    variant={!selectedLocation ? 'disabled' : 'primary'}
                  >
                    선택 완료
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductMapModal;
