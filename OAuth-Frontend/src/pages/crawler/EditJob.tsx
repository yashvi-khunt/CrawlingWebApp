import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useGetFormDataQuery } from "../../redux/api/crawlingJobApi";
import { useForm } from "react-hook-form";
import ParameterCard from "./ParameterCard";

function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    data: jobData,
    error: jobError,
    isLoading: jobLoading,
  } = useGetFormDataQuery(parseInt(jobId || ""));
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [showLevelParams, setShowLevelParams] = useState(false);
  const [showBaseParams, setShowBaseParams] = useState(false);
  const [baseParams, setBaseParams] = useState([]);
  const [levelParams, setLevelParams] = useState([]);
  const [parentEl, setParentEl] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    if (jobData?.success) {
      const { jobName, url, parameters } = jobData.data;
      setValue("jobName", jobName);
      setValue("url", url);

      const baseParams = parameters.filter((param) => !param.isLevelParam);
      const levelParams = parameters.filter((param) => param.isLevelParam);

      setBaseParams(baseParams);
      setLevelParams(levelParams);

      const nextUrlParam = baseParams.find(
        (param) => param.param === "nextURL"
      );
      const parentElParam = baseParams.find(
        (param) => param.param === "ParentEl"
      );

      if (nextUrlParam) {
        setNextUrl(nextUrlParam.xpath);
        setShowLevelParams(true);
      }
      if (parentElParam) {
        setParentEl(parentElParam.xpath);
        setShowBaseParams(true);
      }
    }
  }, [jobData]);

  const onSubmit = (data) => {
    const filteredBaseParams = baseParams.filter(
      (param) => param.param !== "nextURL" && param.param !== "ParentEl"
    );

    const obj = {
      jobName: data.jobName,
      url: data.url,
      parameters: [
        ...filteredBaseParams.map((param) => ({
          ...param,
          isLevelParam: false,
        })),
      ],
    };

    if (nextUrl !== "") {
      obj.parameters.push({
        param: "nextURL",
        xpath: nextUrl,
        attribute: "href",
        isLevelParam: false,
      });
    }

    if (parentEl !== "") {
      obj.parameters.push({
        param: "ParentEl",
        xpath: parentEl,
        isLevelParam: false,
      });
    }

    if (levelParams.length > 0) {
      obj.parameters = [
        ...obj.parameters,
        ...levelParams.map((param) => ({ ...param, isLevelParam: true })),
      ];
    }

    console.log({ id: jobId, ...obj });
    // updateJob({ id: jobId, ...obj });
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

  const handleRemoveIndex = (index, isLevel) => {
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

  const handleNextUrlChange = (e, isUrl) => {
    if (isUrl) {
      setNextUrl(e.target.value);
      setShowLevelParams(e.target.value !== "");
    } else {
      setParentEl(e.target.value);
      setShowBaseParams(e.target.value !== "");
    }
  };

  if (jobLoading) {
    return <div>Loading...</div>;
  }

  if (jobError) {
    return <div>Error loading job data</div>;
  }

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Crawling Job</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
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
                          message: "Please enter a proper URL.",
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
                      {...register("parentEl")}
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
                      {...register("nextUrl")}
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
              Save Changes
            </button>
            <a href="/crawling-jobs" className="btn btn-link mt-3">
              Cancel
            </a>
          </form>
        </section>
      </div>
    </>
  );
}

export default EditJob;
