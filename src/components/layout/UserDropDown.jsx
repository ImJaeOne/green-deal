import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { authSignOut } from '../../api/userAuthService';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { PRODUCT_DEFAULT_IMG } from '../../constants/mypageConstants';

const UserDropDown = ({ userData = {} }) => {
  const handleLogout = async () => {
    try {
      await authSignOut();
      alert('로그아웃 되었습니다.');
    } catch (error) {
      alert('로그아웃에 실패하였습니다.');
    }
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 focus:outline-none">
        <img
          src={userData.profile_img || PRODUCT_DEFAULT_IMG}
          alt="프로필 이미지"
          className="object-cover w-8 h-8 rounded-full bg-light-gray"
        />
        <span>{userData.name || '그린딜'}</span>
        <FiChevronDown />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        modal={false}
        className="absolute right-0 z-50 w-32 mt-2 text-black bg-white rounded-md shadow-lg focus:outline-none"
      >
        <MenuItem>
          <Link to="/mypage" className="block px-4 py-2">
            마이페이지
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/product/registration"
            className="block px-4 py-2"
          >
            상품 등록
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left"
          >
            로그아웃
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default UserDropDown;
