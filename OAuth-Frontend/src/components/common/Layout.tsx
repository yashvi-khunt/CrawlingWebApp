import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, SideBar } from "../index";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";

const Layout = () => {
  // const { isVisible, handleClick } = useScrollToTop();
  const location = useLocation();
  const isAuth = location.pathname.includes("/auth");
  const isLoggedIn = useAppSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location);
    if (isLoggedIn) {
      if (location.pathname === "/") {
        navigate("/profile");
      } else {
        navigate(location.pathname + location.search);
      }
    } else {
      navigate("/auth/login");
    }
  }, []);
  return (
    <>
      <div className="wrapper">
        {isAuth ? (
          <Outlet />
        ) : (
          <>
            <Header />
            <SideBar />
            <Outlet />
          </>
        )}

        {/* <Fade in={isVisible}>
          <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Fade> */}
      </div>
    </>
  );
};

export default Layout;
