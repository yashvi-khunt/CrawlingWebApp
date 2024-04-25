import { routerHelper } from "../routes/RouterHelper";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/" className="brand-link">
        <img
          src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

            {routerHelper.map((route) => (
              <li key={route.path} className="nav-item">
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive && "active"}`
                  }
                >
                  <i className={`nav-icon fa ${route.iconClass}`} />
                  <p>{route.name}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default SideBar;
