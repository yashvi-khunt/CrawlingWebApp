import { useNavigate, useParams } from "react-router-dom";
import { useGetCrawlingJobResponseQuery } from "../../redux/api/crawlingJobApi";

function JobResponse() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data, error } = useGetCrawlingJobResponseQuery(parseInt(jobId || ""));

  const response = data?.data;

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 justify-between">
              <div>
                <h1>Crawling Job Response</h1>
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
          {response && response?.length > 0 ? (
            response?.map((job) => (
              <div className="card" key={job.paramOrder}>
                <div className="card-header">Result : {job.paramOrder}</div>
                <div className="card-body">
                  <table>
                    {job.data.map((data) => (
                      <tbody key={data.parameterName}>
                        <tr>
                          <td>{data.parameterName}</td>
                          <td>&nbsp;:&nbsp;</td>
                          <td>
                            {data.attribute === "href" ? (
                              <a href={data.value} target="_blank">
                                {data.value}
                              </a>
                            ) : data.attribute.includes("src") ? (
                              <img
                                src={data.value}
                                // width="50px"
                                // height="50px"
                                style={{
                                  maxWidth: "150px",
                                  maxHeight: "150px",
                                }}
                              />
                            ) : (
                              data.value || "-"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <div className="card-body text-center">No Data Found</div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default JobResponse;
