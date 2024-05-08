import { SyntheticEvent, useEffect, useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/helperFunctions/capitalizeFirstLetter";
import UserProfileAvatar from "./UserProfileAvatar";

const AutoCompleteField = ({
  options,
  label,
  multiple = false,
  renderIcon = false,
}: DynamicTable.AutoCompleteFieldProps) => {
  const [value, setValue] = useState<Global.Option | Global.Option[] | null>(
    multiple ? [] || {} : null
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const paramKey = `${label}Ids`;
  const newLabel = capitalizeFirstLetter(label) + `${multiple ? "s" : ""}`;

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: Global.Option[] | Global.Option | null
  ) => {
    console.log(newValue);
    const selectedValue = multiple
      ? (newValue as Global.Option[] | null)
      : newValue
      ? [newValue as Global.Option]
      : null;
    console.log(selectedValue);
    setValue(selectedValue);

    const param = new URLSearchParams(searchParams);
    param.delete(paramKey);

    if (selectedValue && selectedValue.length !== 0) {
      var ids;
      if (paramKey === "UserIds") {
        ids = selectedValue.map((option) => option.value);
      } else {
        ids = selectedValue.map((option) => option.label);
      }
      param.append(paramKey, ids.join(`,`));
    }

    setSearchParams(param);
  };

  useEffect(() => {
    if (!searchParams.get(paramKey)) return;
    var selectedOptions;

    const ids = searchParams.get(paramKey)?.split(",");
    var selectedOptions;
    if (paramKey === "UserIds") {
      selectedOptions = options.filter((option) => ids?.includes(option.value));
    } else {
      selectedOptions = options.filter((option) => ids?.includes(option.label));
    }
    console.log(selectedOptions, options);

    setValue(multiple ? selectedOptions : selectedOptions[0]);
  }, [searchParams, options, multiple, paramKey]);

  return (
    <Autocomplete
      options={options}
      multiple={multiple}
      limitTags={2}
      value={value}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {renderIcon ? (
            <UserProfileAvatar name={option.label} />
          ) : (
            option.label
          )}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            newLabel === "Oss"
              ? "OS"
              : newLabel === "LeaveTypes"
              ? "Leave Types"
              : newLabel
          }
          placeholder={`Select ${
            newLabel === "Oss"
              ? "OS"
              : newLabel === "LeaveTypes"
              ? "Leave Types"
              : newLabel
          }`}
        />
      )}
      filterSelectedOptions
      onChange={handleChange}
    />
  );
};

export default AutoCompleteField;
/*
import { SyntheticEvent, useEffect, useState } from "react";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/helperFunctions/capitalizeFirstLetter";
import UserProfileAvatar from "./UserProfileAvatar";

const AutoCompleteField = ({
  options,
  label,
  multiple = false,
  renderIcon = false,
}: DynamicTable.AutoCompleteFieldProps) => {
  const [value, setValue] = useState<Global.Option | Global.Option[] | null>(
    multiple ? [] || {} : null
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const paramKey = `${label}Ids`;
  const newLabel = capitalizeFirstLetter(label) + `${multiple ? "s" : ""}`;

  const handleChange = (newValue: any) => {
    setValue(newValue);
    console.log(newValue);
    const param = new URLSearchParams(searchParams);
    param.delete(paramKey);

    if (newValue && multiple && newValue.length !== 0) {
      const ids = newValue.map((option: Global.Option) =>
        paramKey === "UserIds" ? option.value : option.label
      );
      param.append(paramKey, ids.join(","));
    } else if (newValue && !multiple) {
      param.append(paramKey, newValue.label);
    }

    setSearchParams(param);
  };

  useEffect(() => {
    if (!searchParams.get(paramKey)) return;

    const ids = searchParams.get(paramKey)?.split(",");
    const selectedOptions = options.filter((option) =>
      ids?.includes(paramKey === "UserIds" ? option.value : option.label)
    );

    setValue(multiple ? selectedOptions : selectedOptions[0]);
  }, [searchParams, options, multiple, paramKey]);

  return (
    <Select
      maxMenuHeight={300}
      options={options}
      isMulti={multiple}
      value={value}
      // getOptionLabel={(option: Global.Option) => option.label}
      // getOptionValue={(option: Global.Option) => option.value}
      onChange={handleChange}
      placeholder={`Select ${
        newLabel === "Oss"
          ? "OS"
          : newLabel === "LeaveTypes"
          ? "Leave Types"
          : newLabel
      }`}
      isClearable
      closeMenuOnSelect={!multiple}
      hideSelectedOptions={false}
      isSearchable
      className="full-height"
    />
  );
};

export default AutoCompleteField;
*/
