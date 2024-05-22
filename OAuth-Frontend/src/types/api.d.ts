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

  type AddCrawlingJobParams = {
    jobName: string;
    url: string;
    parameters: [
      {
        param: string;
        xpath: string;
        isLevelParam: string;
      }
    ];
  };

  type GetFormData = Omit<Global.apiResponse, "data"> & {
    data: AddCrawlingJobParams;
  };

  type CrawlingJobProps = {
    id: number;
    jobId: number;
    name: string;
    url: string;
    resultCount: number;
    createdBy: string;
    createdDate: string;
    lastExecuted: string;
    recJob: number | null;
    nextExecution: string;
  };

  type GetCrawlingJobProps = Omit<Global.apiResponse, "data"> & {
    data: {
      count: number;
      crawlingJobs: CrawlingJobProps[];
    };
  };

  type GetCrawlingJobResponse = Omit<Global.apiResponse, "data"> & {
    data: [
      {
        paramOrder: number;
        data: [
          {
            parameterName: string;
            value: string;
            attribute: string;
          }
        ];
      }
    ];
  };
}
