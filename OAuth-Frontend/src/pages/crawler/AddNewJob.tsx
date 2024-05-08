import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddCrawlingJobMutation } from "../../redux/api/crawlingJobApi";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../redux/hooks";

function AddNewJob() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [showLevelParams, setShowLevelParams] = useState(false);

  const [baseParams, setBaseParams] = useState([{ param: "", xpath: "" }]);
  const [nextUrl, setNextUrl] = useState("");
  const [levelParams, setLevelParams] = useState([]);

  const [addJob, { data, error: addJobError }] = useAddCrawlingJobMutation();

  useEffect(() => {
    if (data?.success) {
      dispatch(
        openSnackbar({
          severity: "success",
          message: data.message,
        })
      );
      navigate("/crawling-jobs");
    }
  }, [data]);

  useEffect(() => {
    // console.log(error?.data.message);
    if (addJobError?.data && !addJobError?.data.success)
      dispatch(
        openSnackbar({
          severity: "error",
          message: addJobError?.data.message,
        })
      );
  }, [addJobError?.data]);

  const onSubmit = (data: unknown) => {
    const obj: ApiTypes.AddCrawlingJobParams = {
      jobName: data.jobName,
      url: data.url,
      parameters: [
        ...baseParams.map((param) => ({ ...param, isLevelParam: false })),
      ],
    };

    if (nextUrl !== "") {
      obj.parameters = [
        ...obj.parameters,
        {
          param: "nextURL",
          xpath: nextUrl,
          isLevelParam: false,
        },
      ];
    }

    if (levelParams.length > 0) {
      obj.parameters = [
        ...obj.parameters,
        levelParams.length > 0 && [
          ...levelParams.map((param) => ({ ...param, isLevelParam: true })),
        ],
      ];
    }

    console.log(obj);
    addJob(obj);
  };

  const handleInputChange = (index, key, value, isLevel) => {
    if (!isLevel) {
      const params = [...baseParams];
      params[index][key] = value;
      setBaseParams(params);
    } else {
      const params = [...levelParams];
      params[index][key] = value;
      setLevelParams(params);
    }
  };

  const handleRemoveIndex = (index: number, isLevel: boolean) => {
    if (!isLevel) {
      const params = [...baseParams];
      params.splice(index, 1);
      setBaseParams(params);
    } else {
      const params = [...levelParams];
      params.splice(index, 1);
      setLevelParams(params);
    }
  };

  const handleNextUrlChange = (e) => {
    setNextUrl(e.target.value);
    if (e.target.value !== "") {
      setShowLevelParams(true);
    } else {
      setShowLevelParams(false);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Add Crawling Job</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card card-primary">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="jobName">Job Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="jobName"
                      {...register("jobName", {
                        required: "Job name is required",
                        pattern: {
                          value: /^[a-zA-Z0-9\s-_@]*$/,
                          message:
                            "Name should not contain special characters.",
                        },
                      })}
                    />
                    {errors.jobName && (
                      <span className="error invalid-feedback">
                        {errors.jobName.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="url">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      {...register("url", {
                        required: "URL is required",
                        pattern: {
                          value:
                            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
                          message: "Please enter a proper url.",
                        },
                      })}
                    />
                    {errors.url && (
                      <span className="error invalid-feedback">
                        {errors.url.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12">
                    <label
                      className="btn"
                      style={{ margin: 0, padding: 0, cursor: "default" }}
                    >
                      Parameters and their Xpaths
                    </label>
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        setBaseParams((prev) => [
                          ...prev,
                          { param: "", xpath: "" },
                        ])
                      }
                    >
                      <i className="fa fa-circle-plus"></i>
                    </button>
                  </div>
                </div>
                {baseParams.map((param, index) => (
                  <div className="row" key={index}>
                    <label
                      className="form-group col-6 col-md-2"
                      htmlFor={`param${index}`}
                    >
                      Parameter:
                    </label>
                    <div className="form-group col-6 col-md-2 ">
                      <input
                        className="form-control"
                        type="text"
                        id={`param${index}`}
                        value={param.param}
                        {...register(`param${index}`, {
                          required: "Parameter name is required",
                        })}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "param",
                            e.target.value,
                            false
                          )
                        }
                      />
                      {errors[`param${index}`] && (
                        <span className="error invalid-feedback">
                          {errors[`param${index}`].message}
                        </span>
                      )}
                    </div>
                    <label
                      className="form-group col-6 col-md-2"
                      htmlFor={`xpath${index}`}
                    >
                      Xpath:
                    </label>
                    <div className="form-group col-6 col-md-2 ">
                      <input
                        className="form-control "
                        type="text"
                        id={`xpath${index}`}
                        value={param.xpath}
                        {...register(`xpath${index}`, {
                          required: "Xpath is required",
                        })}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "xpath",
                            e.target.value,
                            false
                          )
                        }
                      />
                      {errors[`xpath${index}`] && (
                        <span className="error invalid-feedback">
                          {errors[`xpath${index}`].message}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn form-control col-md-2 "
                      onClick={() => handleRemoveIndex(index, false)}
                    >
                      <i className="fa fa-circle-minus"></i>
                    </button>
                  </div>
                ))}

                <div className="row ">
                  <label className="col-2" htmlFor="nextUrl">
                    Next URL Xpath
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="nextUrl"
                      {...register("nextUrl", {
                        // pattern: {
                        //   value:
                        //     /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
                        //   message: "Please enter a proper url.",
                        // },
                      })}
                      value={nextUrl}
                      onChange={handleNextUrlChange}
                    />
                    {errors.nextUrl && (
                      <span className="error invalid-feedback">
                        {errors.nextUrl.message}
                      </span>
                    )}
                  </div>
                </div>

                {showLevelParams && (
                  <>
                    <div className="row ">
                      <div className="col-12">
                        <label
                          className="btn"
                          style={{ margin: 0, padding: 0, cursor: "default" }}
                        >
                          Level Parameters and their Xpaths
                        </label>
                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            setLevelParams((prev) => [
                              ...prev,
                              { param: "", xpath: "" },
                            ])
                          }
                        >
                          <i className="fa fa-circle-plus"></i>
                        </button>
                      </div>
                    </div>

                    {levelParams.map((param, index) => (
                      <div className="row" key={index}>
                        <label
                          className="form-group col-6 col-md-2"
                          htmlFor={`lparam${index}`}
                        >
                          Parameter:
                        </label>
                        <div className="form-group col-6 col-md-2 ">
                          <input
                            className="form-control "
                            type="text"
                            id={`lparam${index}`}
                            {...register(`lparam${index}`, {
                              required: "Parameter name is required",
                            })}
                            value={param.param}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "param",
                                e.target.value,
                                true
                              )
                            }
                          />

                          {errors[`lparam${index}`] && (
                            <span className="error invalid-feedback">
                              {errors[`lparam${index}`].message}
                            </span>
                          )}
                        </div>
                        <label
                          className="form-group col-6 col-md-2"
                          htmlFor={`lxpath${index}`}
                        >
                          Xpath:
                        </label>
                        <div className="form-group col-6 col-md-2 ">
                          <input
                            className="form-control "
                            type="text"
                            id={`lxpath${index}`}
                            {...register(`lxpath${index}`, {
                              required: "Xpath is required",
                            })}
                            value={param.xpath}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "xpath",
                                e.target.value,
                                true
                              )
                            }
                          />
                          {errors[`lxpath${index}`] && (
                            <span className="error invalid-feedback">
                              {errors[`lxpath${index}`].message}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn form-control col-md-2 "
                          onClick={() => handleRemoveIndex(index, true)}
                        >
                          <i className="fa fa-circle-minus"></i>
                        </button>
                      </div>
                    ))}
                  </>
                )}
                <button type="submit" className="btn btn-primary mt-3">
                  Add
                </button>
                <a href="/crawling-jobs" className="btn btn-link mt-3">
                  Cancel
                </a>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddNewJob;
