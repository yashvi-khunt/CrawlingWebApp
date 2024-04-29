import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slice/authSlice";

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.auth.userData);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
    location.reload();
  };
  return (
    <div>
      <nav className="main-header navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar navbar-nav ">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href=""
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>

          <li className="nav-item d-none d-sm-inline-block dropdown">
            {/* Sidebar user panel (optional) */}
            <a
              className="user-panel d-flex cursor-pointer"
              data-toggle="dropdown"
            >
              <div className="image">
                <img
                  src="/dist/img/user2-160x160.jpg"
                  className="img-circle elevation-1"
                  alt="User Image"
                />
              </div>
              <div className="info">{userData?.email}</div>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href="/profile" className="dropdown-item">
                <i className="fa fa-light fa-user mr-2" /> Profile
              </a>
              <div className="dropdown-divider" />
              <a href="/profile/change-password" className="dropdown-item">
                <i className="fas fa-key mr-2" /> Change Password
              </a>
              <div className="dropdown-divider" />
              <button onClick={handleLogout} className="dropdown-item">
                <i className="fa fa-power-off mr-2" /> Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
