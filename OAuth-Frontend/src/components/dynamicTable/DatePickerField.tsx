import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { openSnackbar } from "../../redux/slice/snackbarSlice";

declare namespace DatePickerFields {
  type DatePickerFieldProps = {
    to?: boolean;
    label?: string;
  };
}

const DatePickerField = ({
  to = false,
  label = "Select a date",
}: DatePickerFields.DatePickerFieldProps) => {
  const [defaultValue, setValue] = useState<Dayjs | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramKey = `${to ? "to" : "from"}Date`;
  const dispatch = useAppDispatch();

  const handleChange = (value: Dayjs | null) => {
    const param = new URLSearchParams(searchParams);
    const fromDate = dayjs(param.get("fromDate"));
    const toDate = dayjs(param.get("toDate"));
    if (to && fromDate && value && value.isBefore(fromDate, "day")) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: " To date must be greater than or equal to the From date",
        })
      );
      setValue(dayjs(null));
    } else if (!to && toDate && value && value.isAfter(toDate, "day")) {
      dispatch(
        openSnackbar({
          severity: "error",
          message: " From date must be smaller than or equal to the To date",
        })
      );
      setValue(dayjs(null));
    } else {
      param.delete(paramKey);

      if (value) {
        param.append(paramKey, dayjs(value).format("YYYY/MM/DD"));
      }
      setSearchParams(param);
    }
  };

  useEffect(() => {
    if (!searchParams.get(paramKey)) return;

    const dateValue = searchParams.get(paramKey);
    setValue(dayjs(dateValue));
  }, [searchParams]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ width: "100%" }}
        label={label}
        format="DD/MM/YYYY"
        onChange={handleChange}
        value={defaultValue}
        slotProps={{ field: { clearable: true } }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
