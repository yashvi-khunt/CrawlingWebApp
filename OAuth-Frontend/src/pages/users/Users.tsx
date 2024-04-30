import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import dayjs from "dayjs";
import { useGetUserListQuery } from "../../redux/api/userApi";
import Table from "../../components/dynamicTable/DynamicTable";

function Users() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.userData?.role);

  const { data, error, isLoading } = useGetUserListQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

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
      selector: (row) => (row.isActivated ? "Active" : "DeActive"),
    },
  ];

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
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Users</h1>
            </div>
            <div className="col-sm-6">
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
            <Table {...pageInfo} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Users;
