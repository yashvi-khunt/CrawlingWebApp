import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../components/dynamicTable/DynamicTable";
import {
  useDeleteJobMutation,
  useGetCrawlingJobsQuery,
  useTriggerJobMutation,
} from "../../redux/api/crawlingJobApi";
import { TableColumn } from "react-data-table-component";
import dayjs from "dayjs";
import { useEffect } from "react";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../redux/hooks";
function CrawlingJobs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useGetCrawlingJobsQuery({
    ...Object.fromEntries(searchParams.entries()),
  });
  const dispatch = useAppDispatch();
  const [trigger, { data: triggerRes }] = useTriggerJobMutation();
  const [deleteJob, { data: deleteRes }] = useDeleteJobMutation();

  const handleTrigger = (jobId: number, isTrigger: boolean) => {
    if (isTrigger) {
      console.log("trigger", jobId);
      trigger(jobId);
    } else {
      deleteJob(jobId);
    }
  };

  useEffect(() => {
    if (triggerRes?.success) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: triggerRes?.message,
        })
      );
    }
  }, [triggerRes]);
  useEffect(() => {
    if (deleteRes?.success) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: deleteRes?.message,
        })
      );
    }
  }, [deleteRes]);

  const columns: TableColumn<ApiTypes.CrawlingJobProps>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      width: "150px",
    },
    {
      name: "URL",
      selector: (row) => row.url,
      sortable: false,
      sortField: "url",
      cell: (row) => (
        <div>
          <a href={row.url} target="_blank">
            {row.url}
          </a>
        </div>
      ),
    },
    {
      name: "Total Results",
      selector: (row) => row.resultCount,
      sortable: true,
      sortField: "resultCount",
      width: "150px",
    },
    {
      name: "Created By",
      selector: (row) => row.createdBy,
      sortable: true,
      sortField: "createdBy",
    },
    {
      name: "Created Date",
      selector: (row) => dayjs(row.createdDate).format("DD/MM/YYYY hh:mm A"),
      sortable: true,
      sortField: "createdDate",
    },
    {
      name: "Last Executed",
      selector: (row) =>
        row.lastExecuted
          ? dayjs(row.lastExecuted).format("DD/MM/YYYY hh:mm A")
          : "-",
      sortable: true,
      sortField: "lastExecuted",
    },
    {
      name: "Next Execution",
      selector: (row) =>
        row.nextExecution
          ? dayjs(row.nextExecution).format("DD/MM/YYYY hh:mm A")
          : "-",
      sortable: true,
      sortField: "lastExecuted",
    },

    {
      name: "Action",
      selector: (row) => (
        <>
          <div className="row">
            <a className="btn" href={`/crawling-jobs/details/${row.jobId}`}>
              <i
                className="fa fa-info-circle text-primary"
                style={{ fontSize: "large" }}
              ></i>
            </a>
            <button
              className="btn"
              onClick={() => handleTrigger(row.jobId, true)}
            >
              {row.recJob === 0 ? (
                <i className="fa-solid fa-circle-play text-success "></i>
              ) : (
                <i className="fa-solid fa-circle-pause text-danger"></i>
              )}
            </button>
            <a className="btn" href={`/crawling-jobs/edit/${row.jobId}`}>
              <i
                className="fa fa-pen text-info"
                style={{ fontSize: "large" }}
              ></i>
            </a>
          </div>
        </>
      ),
    },
  ];

  const pageInfo: DynamicTable.TableProps = {
    columns: columns,
    rows: data?.data.crawlingJobs,
    rowCount: data?.data.count,
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 justify-between">
              <div>
                <h1>Crawling Jobs</h1>
              </div>
              <div>
                <button
                  onClick={() => navigate("/crawling-jobs/add")}
                  className="btn btn-primary float-sm-right"
                >
                  Add New Job
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="card">
            <div className="card-body">
              <Table {...pageInfo} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CrawlingJobs;
