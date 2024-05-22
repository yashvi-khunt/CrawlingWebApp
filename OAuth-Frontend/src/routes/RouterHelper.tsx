import {
  ProfilePage,
  ProfileEdit,
  ChangePassword,
  Users,
  AddUser,
  EditUser,
  LoginHistories,
  Register,
  ForgotPassword,
  ResetPassword,
  SetPassword,
  EmailConfirmSuccess,
  SendEmail,
  Login,
  CrawlingJobs,
  AddNewJob,
  JobResponse,
} from "../pages";
import EditJob from "../pages/crawler/EditJob";

export const routerHelper: Global.RouteConfig = [
  {
    name: "Profile",
    path: "/profile",
    element: null,
    iconClass: "fa-user",

    roles: ["Admin", "User"],
    children: [
      {
        path: "",
        element: <ProfilePage />,
        roles: ["Admin", "User"],
      },
      {
        path: "edit",
        element: <ProfileEdit />,
        roles: ["Admin", "User"],
      },
      {
        path: "change-password",
        element: <ChangePassword />,
        roles: ["Admin", "User"],
      },
    ],
  },
  {
    name: "Users",
    path: "/users",
    element: null,
    roles: ["Admin"],
    iconClass: "fa-users",
    children: [
      { path: "", element: <Users />, roles: ["Admin"] },
      { path: "add", element: <AddUser />, roles: ["Admin"] },
      {
        path: "edit/:email",
        element: <EditUser />,
        roles: ["Admin"],
      },
      {
        path: "details",
        element: <ProfilePage />,
        roles: ["Admin"],
      },
    ],
  },
  {
    name: "Login Histories",
    path: "/loginHistories",
    element: null,
    roles: ["Admin", "User"],
    iconClass: " fa-desktop",
    children: [
      {
        path: "",
        element: <LoginHistories />,
        roles: ["Admin", "User"],
      },
    ],
  },
  {
    name: "Crawling Jobs",
    path: "/crawling-jobs",
    element: null,
    roles: ["Admin", "User"],
    iconClass: "fa-database",
    children: [
      {
        path: "",
        element: <CrawlingJobs />,
        roles: ["Admin", "User"],
      },
      {
        path: "add",
        element: <AddNewJob />,
        roles: ["Admin", "User"],
      },
      {
        path: "details/:jobId",
        element: <JobResponse />,
        roles: ["Admin", "User"],
      },
      {
        path: "edit/:jobId",
        element: <EditJob />,
        roles: ["Admin", "User"],
      },
    ],
  },
];

export const authRoutes: Global.AuthRoutes = [
  {
    path: "/auth",
    element: null,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "set-password",
        element: <SetPassword />,
      },
      {
        path: "confirm-email",
        element: <EmailConfirmSuccess />,
      },
      {
        path: "sent-confirm-email",
        element: <SendEmail />,
      },

      // Password reset mail sent succesffuly page????  path:sent-password-email/:email
    ],
  },
];
