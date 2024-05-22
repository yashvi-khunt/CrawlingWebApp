import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAddCrawlingJobMutation } from "../../redux/api/crawlingJobApi";
import { openSnackbar } from "../../redux/slice/snackbarSlice";
import { useAppDispatch } from "../../redux/hooks";
import ParameterCard from "./ParameterCard";

function AddNewJob() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [showLevelParams, setShowLevelParams] = useState(false);
  const [showBaseParams, setShowBaseParams] = useState(false);
  const [baseParams, setBaseParams] = useState([{ param: "", xpath: "" }]);
  const [levelParams, setLevelParams] = useState([]);
  const [parentEl, setParentEl] = useState("");
  const [nextUrl, setNextUrl] = useState("");

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
          attribute: "href",
          isLevelParam: false,
        },
      ];
    }

    if (parentEl !== "") {
      obj.parameters = [
        ...obj.parameters,
        {
          param: "ParentEl",
          xpath: parentEl,
          isLevelParam: false,
        },
      ];
    }

    if (levelParams.length > 0) {
      obj.parameters = [
        ...obj.parameters,
        ...levelParams.map((param) => ({ ...param, isLevelParam: true })),
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

  const handleNextUrlChange = (e, isUrl: boolean) => {
    if (isUrl) {
      setNextUrl(e.target.value);
      if (e.target.value !== "") {
        setShowLevelParams(true);
      } else {
        setShowLevelParams(false);
      }
    } else {
      setParentEl(e.target.value);
      if (e.target.value !== "") {
        setShowBaseParams(true);
      } else {
        setShowBaseParams(false);
      }
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2 justify-between">
              <div>
                <h1>Add Crawling Job</h1>
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
          {/* <div className="card card-primary"> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card card-primary">
              <div className="card-body">
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
              </div>
            </div>
            <div className="card card-primary">
              <div className="card-body">
                <div className="row ">
                  <label className="col-2" htmlFor="parentEl">
                    Parent Element Xpath
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="parentEl"
                      {...register("parentEl", {
                        // Add validation rules if needed
                      })}
                      value={parentEl}
                      onChange={(e) => handleNextUrlChange(e, false)}
                    />
                    {errors.parentEl && (
                      <span className="error invalid-feedback">
                        {errors.parentEl.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showBaseParams && (
              <ParameterCard
                params={baseParams}
                setParams={setBaseParams}
                handleInputChange={handleInputChange}
                handleRemoveIndex={handleRemoveIndex}
                register={register}
                errors={errors}
                prefix=""
              />
            )}
            <div className="card card-primary">
              <div className="card-body">
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
                      onChange={(e) => handleNextUrlChange(e, true)}
                    />
                    {errors.nextUrl && (
                      <span className="error invalid-feedback">
                        {errors.nextUrl.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showLevelParams && (
              <ParameterCard
                params={levelParams}
                setParams={setLevelParams}
                handleInputChange={handleInputChange}
                handleRemoveIndex={handleRemoveIndex}
                register={register}
                errors={errors}
                prefix="Level"
              />
            )}

            <button type="submit" className="btn btn-primary mt-3">
              Add
            </button>
            <a href="/crawling-jobs" className="btn btn-link mt-3">
              Cancel
            </a>
          </form>
          {/* </div> */}
        </section>
      </div>
    </>
  );
}

export default AddNewJob;
