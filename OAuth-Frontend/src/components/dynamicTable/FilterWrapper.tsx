import { Grid, GridOwnProps, GridWrap } from "@mui/material";
import { PropsWithChildren } from "react";

const FilterWrapper = ({
  children,
  ...props
}: PropsWithChildren<GridOwnProps>) => {
  return (
    <>
      <Grid {...props}>{children?.forEach((element) => element)}</Grid>
    </>
  );
};

export default FilterWrapper;
