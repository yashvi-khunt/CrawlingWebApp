import { SyntheticEvent, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/helperFunctions/capitalizeFirstLetter";
const SearchField = ({ label, placeholder }: DynamicTable.SearchField) => {
  const [value, setValue] = useState<string | null>("" || null);
  const [searchParams, setSearchParams] = useSearchParams();

  const paramKey = `Text`;
  const newLabel = capitalizeFirstLetter(label);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    // const selectedValue = multiple
    //   ? (newValue as Global.Option[] | null)
    //   : newValue
    //   ? [newValue as Global.Option]
    //   : null;
    // console.log(selectedValue);
    setValue(searchValue);

    const param = new URLSearchParams(searchParams);
    param.delete(paramKey);

    if (searchValue && searchValue.length !== 0) {
      param.append(paramKey, searchValue);
    }

    setSearchParams(param);
  };

  useEffect(() => {
    if (!searchParams.get(paramKey)) return;

    // console.log(searchParams?.get(paramKey));
    const searchText = searchParams?.get(paramKey);
    setValue(searchText);
  }, [searchParams, paramKey]);

  return (
    <TextField
      fullWidth
      value={value}
      label={newLabel}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default SearchField;
