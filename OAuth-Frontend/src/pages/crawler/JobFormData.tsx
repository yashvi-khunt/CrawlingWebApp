import React from "react";
import { useGetFormDataQuery } from "../../redux/api/crawlingJobApi";
import { useNavigate, useParams } from "react-router-dom";

function JobFormData() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data, error } = useGetFormDataQuery(parseInt(jobId || ""));

  const response = data?.data;

  return (
    <>
      {" "}
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 justify-between">
              <div>
                <h1>Crawling Job Parameters</h1>
              </div>
              <div>
                <button
                  onClick={() => navigate("/crawling-jobs")}
                  className="btn btn-primary float-sm-right"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          {response && (
            <div className="card">
              <div className="card-header row" style={{ gap: "20px" }}>
                <span>
                  <b>Job Name </b> : {response.jobName}
                </span>
                <span>
                  <b>URL</b> :
                  <a href={response.url} target="_blank">
                    {response.url}
                  </a>
                </span>
              </div>
              {response?.parameters.length > 0 ? (
                <div className="card-body">
                  <table>
                    <tbody>
                      {response?.parameters.map((job) => (
                        <tr key={job.param + job.xpath}>
                          <td>{job.param}</td>
                          <td>:</td>
                          <td>{job.xpath}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="card">
                  <div className="card-body text-center">No Data Found</div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default JobFormData;
