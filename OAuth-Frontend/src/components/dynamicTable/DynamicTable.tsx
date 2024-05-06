import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import DataTable from "react-data-table-component";

const Table = ({ ...props }: DynamicTable.TableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState();

  const [dataTableParams, setDataTableParams] = useState(null);

  useEffect(() => {
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        ...dataTableParams,
      } as unknown as URLSearchParams);
    });
  }, [dataTableParams]);

  const handleRowsPerPageChange = (pageSize, currentPage) => {
    setDataTableParams((prevParams) => ({
      ...prevParams,
      page: currentPage,
      pageSize: pageSize,
    }));
  };

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    setDataTableParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  };

  const handleSortChange = (sortField, sortOrder) => {
    setDataTableParams((prevParams) => ({
      ...prevParams,
      field: sortField.sortField,
      sort: sortOrder,
    }));
  };

  return (
    <>
      <DataTable
        columns={props?.columns || []}
        data={props?.rows || []}
        fixedHeader
        onSort={handleSortChange}
        highlightOnHover
        persistTableHead
        responsive
        sortServer
        pagination
        paginationServer
        onChangeRowsPerPage={handleRowsPerPageChange}
        onChangePage={handlePageChange}
        paginationTotalRows={props.rowCount || 10}
        progressPending={props.loading}
        customStyles={{
          headCells: { style: { fontWeight: 900, fontSize: "medium" } },
          cells: { style: { fontSize: "medium", width: 200 } },
        }}
      />
    </>
  );
};

export default Table;
