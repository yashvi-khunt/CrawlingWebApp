import { useSearchParams, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import {
  useGetUserListQuery,
  useToggleUserMutation,
  useUsersWithNamesQuery,
} from "../redux/api/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AutoCompleteField from "./dynamicTable/AutoCompleteField";
import DatePickerField from "./dynamicTable/DatePickerField";
import Table from "./dynamicTable/DynamicTable";
import SearchField from "./dynamicTable/SearchField";
import StatusComponent from "./dynamicTable/StatusComponent";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Edit, InfoOutlined, Person, PersonOff } from "@mui/icons-material";
import { useEffect } from "react";
import { openSnackbar } from "../redux/slice/snackbarSlice";
import dayjs from "dayjs";

function Users() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data } = useGetUserListQuery({
    ...Object.fromEntries(searchParams.entries()),
  });
  const { data: userDD } = useUsersWithNamesQuery();

  const userRole = useAppSelector((state) => state.auth.userData?.role);

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
      renderCell: ({ value }: GridRenderCellParams) => {
        return value || "-";
      },
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      renderCell: ({ value }: GridRenderCellParams) => {
        return value || "-";
      },
      width: 150,
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 150,
      sortable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <StatusComponent type="leave" {...params} />
      ),
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      renderCell: ({ value }: GridRenderCellParams) =>
        dayjs(value).format("DD/MM/YYYY"),
      width: 150,
    },
    {
      field: "isActivated",
      headerName: "Status",
      renderCell: ({ value }: GridRenderCellParams) => {
        if (value) {
          return "Active";
        } else {
          return "Deactive";
        }
      },
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ({ row }) => {
        // console.log(row);
        return (
          <>
            <GridActionsCellItem
              icon={<Edit color="info" />}
              label="Edit"
              className="textPrimary"
              title={"Edit"}
              onClick={() => navigate(`/users/edit/${row.email}`)}
            />
            <GridActionsCellItem
              icon={
                !row.isActivated ? (
                  <Person color={"primary"} />
                ) : (
                  <PersonOff color={"primary"} />
                )
              }
              label="Edit"
              className="textPrimary"
              title={row.isActivated ? "Dectivate" : "Activate"}
              onClick={() => handleUserStatusChange(row.userId)}
            />
            <GridActionsCellItem
              icon={<InfoOutlined color="info" />}
              label="Info"
              className="textPrimary"
              title={"Info"}
              onClick={() => navigate(`/users/details?email=${row.email}`)}
            />
          </>
        );
      },
    },
  ];

  const [toggleApi, { data: toggleData, error: toggleError }] =
    useToggleUserMutation();

  const handleUserStatusChange = (id: GridRowId) => {
    console.log(id);
    toggleApi(id as string);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    toggleData?.success &&
      dispatch(
        openSnackbar({ severity: "success", message: toggleData.message })
      );
  }, [toggleData?.data]);

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: data?.data.users as GridValidRowModel[] | undefined,
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
              <div className="col-sm-6">
                <button className="btn btn-primary float-sm-right">
                  Add User
                </button>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="card">
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

export default Users;
