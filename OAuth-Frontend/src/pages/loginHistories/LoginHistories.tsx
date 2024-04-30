import { useSearchParams, useNavigate } from "react-router-dom";
import {
  useBrowserHelperQuery,
  useGetLoginHistoriesQuery,
  useOsHelperQuery,
} from "../../redux/api/loginHistory";
import { useUsersWithNamesQuery } from "../../redux/api/userApi";
import { useAppSelector } from "../../redux/hooks";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import AutoCompleteField from "../../components/dynamicTable/AutoCompleteField";
import DatePickerField from "../../components/dynamicTable/DatePickerField";
import Table from "../../components/dynamicTable/DynamicTable";
import SearchField from "../../components/dynamicTable/SearchField";
import { TableColumn } from "react-data-table-component/dist/DataTable/types";

function LoginHistories() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data } = useGetLoginHistoriesQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

  const { data: userDD } = useUsersWithNamesQuery();
  const { data: osDD } = useOsHelperQuery();
  const { data: browserDD } = useBrowserHelperQuery();
  console.log(browserDD);

  const userRole = useAppSelector((state) => state.auth.userData?.role);

  const columns: TableColumn<ApiTypes.loginHistoriesProps>[] = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      sortField: "email",
    },
    {
      name: "Date",
      selector: (row) => dayjs(row.dateTime).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      sortField: "date",
    },
    {
      name: "IP Address",
      selector: (row) =>
        row.ipAddress === "::1" ? "Local Host" : row.ipAddress,
      sortable: true,
      sortField: "ipAddress",
    },
    {
      name: "Browser",
      selector: (row) => row.browser,
      sortable: true,
      sortField: "browser",
    },
    {
      name: "OS",
      selector: (row) => row.os,
      sortable: true,
      sortField: "os",
    },
    {
      name: "Device",
      selector: (row) => row.device || "-",
      sortable: true,
      sortField: "device",
    },
  ];

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: data?.data.loginHistories,
    rowCount: data?.data.count,
  };
  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Login Histories</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="card">
            <div className="card-body">
              <Table {...pageInfo} />
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
    </>
  );
}

export default LoginHistories;
