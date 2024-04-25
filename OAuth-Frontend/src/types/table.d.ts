declare namespace DynamicTable {
  type SearchField = {
    label: string;
    placeholder: string;
  };
  type AutoCompleteFieldProps = {
    options: Global.Option[];
    label: string;
    multiple?: boolean;
    renderIcon?: boolean;
  };

  type TableProps = {
    columns?: import("@mui/x-data-grid").GridColDef[];
    rows?: import("@mui/x-data-grid").GridRowsProp;
    rowCount?: number;
  };
}
