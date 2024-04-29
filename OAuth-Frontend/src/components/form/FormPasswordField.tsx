import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";

import React from "react";

const FormInputPassword = React.forwardRef(
  ({ name, control, label }: FormTypes.FormInputProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            type={showPassword ? "text" : "password"}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {/* {!showPassword ? <Visibility /> : <VisibilityOff />} */}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputRef={ref}
          />
        )}
      />
    );
  }
);

export default FormInputPassword;
