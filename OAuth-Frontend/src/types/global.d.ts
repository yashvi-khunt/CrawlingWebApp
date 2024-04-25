declare namespace Global {
  type Option = {
    label: string;
    value: number | string;
  };

  type Role = "Admin" | "User";

  type RouteConfig = Array<{
    name?: string;
    path: string;
    element: React.ReactNode;
    roles: Array<Role>;
    children?: RouteConfig;
    iconClass?: stirng;
  }>;

  type AuthRoutes = Array<{
    path: string;
    element?: React.ReactNode;
    children?: AuthRoutes;
  }>;

  type SearchParams = {
    page?: number;
    pageSize?: number;
    field?: string;
    sort?: GridSortDirection;
  };

  type userData = {
    role: string;
    id: string;
    email: string;
  };

  type InitialUser = {
    status: boolean;
    userData: userData | null;
    token: string | null;
  };

  type apiResponse<T> = {
    count?: number;
    success: boolean;
    message: string;
    error: null | string;
    data: T;
  };

  type helperList = Global.apiResponse<Global.Option[]>;

  type DecodedToken = {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  };
}
