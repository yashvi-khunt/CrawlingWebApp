declare namespace ApiTypes {
  type userListProps = {
    id: number;
    userId: string;
    userName: string;
    createdDate: string;
    role: Global.Role;
    isActivated: boolean;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  type GetUsersProps = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      users: userListProps[];
    };
  };

  type GetUserQueryParams = Global.SearchParams & {
    text?: string;
    fromDate?: string;
    toDate?: string;
  };

  type GetLoginHistoryQueryParams = Global.SearchParams & {
    text?: string;
    fromDate?: string;
    toDate?: string;
    userIds?: string;
  };

  type loginHistoriesProps = {
    id: number;
    userId: string;
    email: string;
    dateTime: string;
    ipAddress: string;
    browser: string;
    os: string | null;
    device: string | null;
  };

  type GetLoginHistoriesProps = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      loginHistories: loginHistoriesProps[];
    };
  };
}
