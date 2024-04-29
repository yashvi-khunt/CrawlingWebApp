import { MouseEvent, useEffect, useState } from "react";
import { Chip, Menu, MenuItem, Snackbar } from "@mui/material";
import { Adjust } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useRolesWithNamesQuery,
  useUpdateUserRolesMutation,
} from "../../redux/api/userApi";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

const StatusComponent = ({ ...params }) => {
  const userRole = useAppSelector((state) => state.auth.userData?.role);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const roleName = params.row.role;
  const { data } = useRolesWithNamesQuery();
  const [updateUserRoles, { data: updateResponse, error: updateError }] =
    useUpdateUserRolesMutation();

  const [statusName, setStatusName] = useState("");

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (updateResponse) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: updateResponse.message,
        })
      );
    }
    if (updateError) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: updateError?.data?.message,
        })
      );
    }
  }, [updateResponse, updateError?.data]);

  useEffect(() => {
    if (!data) return;
    setStatusName(
      data?.filter((obj) => obj.label === roleName)[0]?.label || ""
    );
  }, [data, roleName]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleChange = (value: string) => {
    const userId = params.row.userId;
    console.log(value, userId);
    updateUserRoles({ userId, roleId: value });
    setAnchorEl(null);
  };

  return userRole === "User" ? (
    <Chip variant="filled" label={statusName} />
  ) : (
    <>
      <Chip variant="outlined" onClick={handleClick} label={statusName} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {data &&
          data.map((obj) => (
            <MenuItem key={obj.value} onClick={() => handleChange(obj.value)}>
              {obj.label}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default StatusComponent;
