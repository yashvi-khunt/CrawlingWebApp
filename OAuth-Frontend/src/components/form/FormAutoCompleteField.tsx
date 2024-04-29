import { Control, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Autocomplete, Box } from "@mui/material";

const FormAutoCompleteField = React.forwardRef(
  ({ name, control, defaultValue, label, options }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value, ...fieldProps },
          fieldState: { error },
        }) => {
          const selectedOption =
            defaultValue ||
            (options ? options.find((option) => option.value === value) : null);

          return (
            <Autocomplete
              {...fieldProps}
              options={options || []}
              value={selectedOption}
              getOptionLabel={(option) => option.label}
              // isOptionEqualToValue={(option, value) => {
              //   console.log(option, value);
              //   return option.value === value.value;
              // }}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              onChange={(_, data) => onChange(data ? data : null)}
            />
          );
        }}
      />
    );
  }
);
export default FormAutoCompleteField;
