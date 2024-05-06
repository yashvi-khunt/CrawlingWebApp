import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import dayjs from "dayjs";
import {
  useGetUserListQuery,
  useToggleUserMutation,
  useUsersWithNamesQuery,
} from "../../redux/api/userApi";
import Table from "../../components/dynamicTable/DynamicTable";
import AutoCompleteField from "../../components/dynamicTable/AutoCompleteField";
import SearchField from "../../components/dynamicTable/SearchField";
import DatePickerField from "../../components/dynamicTable/DatePickerField";

function Users() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.userData?.role);

  const { data, error, isLoading } = useGetUserListQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

  const { data: userDD } = useUsersWithNamesQuery();

  useEffect(() => {
    if (error) {
      dispatch(openSnackbar({ severity: "error", message: error }));
    }
  }, [error, dispatch]);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName || "-",
      sortable: true,
      sortField: "firstName",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName || "-",
      sortable: true,
      sortField: "lastName",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      sortField: "email",
    },
    { name: "Role", selector: (row) => row.role },
    {
      name: "Created Date",
      selector: (row) => dayjs(row.createdDate).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      sortField: "createdDate",
    },
    {
      name: "Status",
      selector: (row) => (row.isActivated ? "Active" : "Deactive"),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <div className="row">
            <a className="btn" href={`/users/edit/${row.email}`}>
              <i
                className="fa fa-pen text-info"
                style={{ fontSize: "large" }}
              ></i>
            </a>

            <button
              className="btn"
              onClick={() => handleUserStatusChange(row.userId)}
            >
              <i
                className="fa fa-shuffle text-primary"
                style={{ fontSize: "large" }}
              ></i>
            </button>

            <a className="btn" href={`/users/details?email=${row.email}`}>
              <i
                className="fa fa-info-circle text-info"
                style={{ fontSize: "large" }}
              ></i>
            </a>
          </div>
        </>
      ),
    },
  ];

  const [toggleApi, { data: toggleData, error: toggleError }] =
    useToggleUserMutation();

  const handleUserStatusChange = (id) => {
    console.log(id);
    toggleApi(id as string);
  };

  useEffect(() => {
    toggleData?.success &&
      dispatch(
        openSnackbar({ severity: "success", message: toggleData.message })
      );
  }, [toggleData?.data]);

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: data?.data.users,
    rowCount: data?.data.count,
    loading: isLoading,
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2 justify-between">
            <div>
              <h1>Users</h1>
            </div>
            <div>
              <button
                onClick={() => navigate("/users/add")}
                className="btn btn-primary float-sm-right"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="card">
          <div className="card-body">
            <div className="container-fluid">
              <div className="row">
                {userRole !== "User" && (
                  <div className="col-6 col-md-3 my-1">
                    <AutoCompleteField
                      options={userDD?.data || []}
                      label="User"
                      multiple
                    />
                  </div>
                )}
                <div className="col-6 col-md-3 my-1">
                  <SearchField label="Search Text" placeholder="Enter text" />
                </div>
                <div className="col-6 col-md-3 my-1">
                  <DatePickerField label="From" />
                </div>
                <div className="col-6 col-md-3 my-1">
                  <DatePickerField to label="To" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Table {...pageInfo} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Users;
