import { Link } from 'react-router-dom';
import UserDropDown from './UserDropDown';

const NavAuthStatus = ({ isLoading, userData }) => {
  if (isLoading) {
    return <UserDropDown />;
  }

  return userData ? (
    <div className="flex items-center justify-center gap-2">
      <UserDropDown userData={userData} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default NavAuthStatus;
