import { useNavigate } from "react-router-dom";

function CrawlingJobs() {
  const navigate = useNavigate();
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
          {/*           
          <div className="card">
            <div className="card-body">
              <Table {...pageInfo} />
            </div>
          </div>
        */}
        </section>
      </div>
    </>
  );
}

export default CrawlingJobs;
