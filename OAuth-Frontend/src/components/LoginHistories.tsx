import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetLoginHistoriesQuery } from "../redux/api/loginHistory";
import { useUsersWithNamesQuery } from "../redux/api/userApi";
import { useAppSelector } from "../redux/hooks";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import AutoCompleteField from "./dynamicTable/AutoCompleteField";
import DatePickerField from "./dynamicTable/DatePickerField";
import Table from "./dynamicTable/DynamicTable";
import SearchField from "./dynamicTable/SearchField";

function LoginHistories() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data } = useGetLoginHistoriesQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

  const { data: userDD } = useUsersWithNamesQuery();

  const userRole = useAppSelector((state) => state.auth.userData?.role);

  const columns: GridColDef[] = [
    {
      field: "userName",
      headerName: "User",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      renderCell: ({ row }: GridRenderCellParams) =>
        dayjs(row.dateTime).format("DD/MM/YYYY HH:mm A"),
      width: 200,
    },
    {
      field: "ipAddress",
      headerName: "IP Address",
      renderCell: ({ value }: GridRenderCellParams) =>
        value === "::1" ? "Local Host" : value,
      width: 150,
    },
    {
      field: "browser",
      headerName: "Browser",
      width: 150,
    },
    {
      field: "os",
      headerName: "OS",
      width: 150,
    },
    {
      field: "device",
      headerName: "Device",
      renderCell: ({ value }: GridRenderCellParams) => {
        return value || "-";
      },
      width: 150,
    },
  ];

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: data?.data.loginHistories as GridValidRowModel[] | undefined,
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
                <h1>Users</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="card">
            <div className="card-header"></div>
            {/* /.card-header */}
            <div className="card-body">
              <Table {...pageInfo}>
                <Grid container spacing={2} paddingBottom={2}>
                  {userRole !== "User" && (
                    <Grid item xs={6} md={3}>
                      <AutoCompleteField
                        options={userDD?.data || []}
                        label="User"
                        multiple
                      />
                    </Grid>
                  )}
                  <Grid item xs={6} md={3}>
                    <SearchField label="Search Text" placeholder="Enter text" />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <DatePickerField label="From" />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <DatePickerField to label="To" />
                  </Grid>
                </Grid>
              </Table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}

export default LoginHistories;
