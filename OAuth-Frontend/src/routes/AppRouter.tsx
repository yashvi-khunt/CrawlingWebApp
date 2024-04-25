import { authRoutes, routerHelper } from "./RouterHelper";

import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Layout } from "../components";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.userData?.role);

  //   const [isInitialized, setIsInitialized] = useState(false);
  //   useEffect(() => {
  //     const localData = localStorage.getItem("userData");
  //     if (localData) {
  //       const userData = JSON.parse(localData);
  //       dispatch(login({ token: userData }));
  //     }

  //     setIsInitialized(true);
  //   }, []);

  //   if (!isInitialized) {
  //     return (
  //       <Container
  //         maxWidth="lg"
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "100vh",
  //         }}
  //       >
  //         <CircularProgress />
  //       </Container>
  //     );
  //   }

  const filterRoute = (routeArray: Global.RouteConfig) => {
    return (
      routeArray
        //.filter((route) => route.roles?.includes(userRole))
        .map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.element || <Outlet />}
            >
              {route.children && route.children.length > 0
                ? filterRoute(route.children)
                : null}
            </Route>
          );
        })
    );
  };

  const routes = createRoutesFromElements(
    <Route path="/">
      {authRoutes.map((route) => {
        if (route.children && route.children.length > 0) {
          const childRoutes = route.children.map((childRoute) => (
            <Route
              key={childRoute.path}
              path={childRoute.path}
              element={childRoute.element}
            />
          ));
          return (
            <Route key={route.path} path={route.path} element={<Outlet />}>
              <Route path="" element={route.element} />
              {childRoutes}
            </Route>
          );
        } else {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        }
      })}
      <Route path="/" element={<Layout />}>
        {filterRoute(routerHelper)}
      </Route>
    </Route>
  );
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRouter;
