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
    columns?:
      | import("react-data-table-component").TableColumn<ApiTypes.userListProps>[]
      | import("react-data-table-component").TableColumn<ApiTypes.loginHistoriesProps>[];
    rows?: ApiTypes.userListProps[] | ApiTypes.loginHistoriesProps[];
    rowCount?: number;
  };
}
