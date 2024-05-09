import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../components/dynamicTable/DynamicTable";
import { useGetCrawlingJobsQuery } from "../../redux/api/crawlingJobApi";
import { TableColumn } from "react-data-table-component";

function CrawlingJobs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useGetCrawlingJobsQuery({
    ...Object.fromEntries(searchParams.entries()),
  });

  const columns: TableColumn<ApiTypes.CrawlingJobProps>[] = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
      width: "150px",
    },
    // {
    //   name: "Date",
    //   selector: (row) => dayjs(row.dateTime).format("DD/MM/YYYY hh:mm A"),
    //   sortable: true,
    //   sortField: "date",
    // },
    {
      name: "URL",
      selector: (row) => row.url,
      sortable: false,
      sortField: "url",
    },
    {
      name: "Total Results",
      selector: (row) => row.resultCount,
      sortable: true,
      sortField: "resultCount",
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <a href={row.url} target="_blank">
            Visit site
          </a>
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
