import MuiPagination from "@mui/material/Pagination";
import { GridPagination, useGridApiContext } from "@mui/x-data-grid";
import { TablePaginationProps } from "@mui/material/TablePagination";

const Pagination = ({
	page,
	onPageChange,
	className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) => {
	const apiRef = useGridApiContext();
	const rowsCount = apiRef?.current?.state.rows.totalRowCount || 0;
	const pageSize = apiRef?.current.state.pagination.paginationModel.pageSize;
	const pageCount = Math.ceil(rowsCount / pageSize);

	return (
		<MuiPagination
			color='primary'
			className={className}
			count={pageCount}
			page={page + 1}
			onChange={(event, newPage) => {
				onPageChange(event as any, newPage - 1);
			}}
		/>
	);
};

const CustomPagination = (props: any) => {
	return <GridPagination ActionsComponent={Pagination} {...props} />;
};

export default CustomPagination;
