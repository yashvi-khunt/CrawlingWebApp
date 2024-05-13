function ParameterCard({
  params,
  setParams,
  handleInputChange,
  handleRemoveIndex,
  register,
  errors,
  prefix,
}) {
  const shortPrefix = prefix.toLowerCase()[0];
  return (
    <div className="card">
      <div className="card-body">
        <div className="row ">
          <div className="col-12">
            <label
              className="btn"
              style={{ margin: 0, padding: 0, cursor: "default" }}
            >
              {prefix} Parameters and their Xpaths
            </label>
            <button
              type="button"
              className="btn"
              onClick={() =>
                setParams((prev) => [...prev, { param: "", xpath: "" }])
              }
            >
              <i className="fa fa-circle-plus"></i>
            </button>
          </div>
        </div>
        {params.map((param, index) => (
          <div className="row" key={index}>
            <label
              className="form-group col-6 col-md-2"
              htmlFor={`param${index}`}
            >
              Parameter:
            </label>
            <div className="form-group col-6 col-md-4 ">
              <input
                className="form-control"
                type="text"
                id={`param${index}`}
                value={param.param}
                {...register(`${shortPrefix}param${index}`, {
                  required: "Parameter name is required",
                })}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "param",
                    e.target.value,
                    shortPrefix === "l",
                    shortPrefix
                  )
                }
              />
              {errors[`${shortPrefix}param${index}`] && (
                <span className="error invalid-feedback">
                  {errors[`${shortPrefix}param${index}`].message}
                </span>
              )}
            </div>
            <label
              className="form-group col-6 col-md-2"
              htmlFor={`attribute${index}`}
            >
              Attribute:
            </label>
            <div className="form-group col-6 col-md-4 ">
              <input
                className="form-control "
                type="text"
                id={`attribute${index}`}
                value={param.attribute}
                {...register(`${shortPrefix}attribute${index}`, {
                  //   required: "Attribute is required",
                })}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "attribute",
                    e.target.value,
                    shortPrefix === "l",
                    shortPrefix
                  )
                }
              />
              {errors[`${shortPrefix}attribute${index}`] && (
                <span className="error invalid-feedback">
                  {errors[`${shortPrefix}attribute${index}`].message}
                </span>
              )}
            </div>

            <label
              className="form-group col-6 col-md-2"
              htmlFor={`xpath${index}`}
            >
              Xpath:
            </label>
            <div className="form-group col-6 col-md-8 ">
              <input
                className="form-control "
                type="text"
                id={`xpath${index}`}
                value={param.xpath}
                {...register(`${shortPrefix}xpath${index}`, {
                  required: "Xpath is required",
                })}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "xpath",
                    e.target.value,
                    shortPrefix === "l",
                    shortPrefix
                  )
                }
              />
              {errors[`${shortPrefix}xpath${index}`] && (
                <span className="error invalid-feedback">
                  {errors[`${shortPrefix}xpath${index}`].message}
                </span>
              )}
            </div>
            <button
              type="button"
              className="btn form-control col-md-2 "
              onClick={() => handleRemoveIndex(index, shortPrefix === "l")}
            >
              <i className="fa fa-circle-minus"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParameterCard;
