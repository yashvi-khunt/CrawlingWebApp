import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import React from "react";

const FormInputText = React.forwardRef(
  ({ name, control, label, defaultValue }: FormTypes.FormInputProps, ref) => {
    return (
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            required
            inputRef={ref}
          />
        )}
      />
    );
  }
);

export default FormInputText;
