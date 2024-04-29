import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function EmailConfirmSuccess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pwdToken, setPwdToken] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (searchParams.get("pwd")) {
      setPwdToken(searchParams.get("pwd"));
      setEmail(searchParams.get("email"));
      searchParams.delete("email");
      searchParams.delete("pwd");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  console.log(pwdToken, email);
  return (
    <div className="hold-transition lockscreen">
      <div className="lockscreen-wrapper`~">
        <div className="lockscreen-logo">
          <a href="/">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="help-block text-center lockscreen-name">
          Email confirmation completed successfully.
        </div>
        {/* /.lockscreen-item */}
        <div className="help-block text-center">
          {pwdToken === ""
            ? "You can now login to you account."
            : "Please set a password for login."}
        </div>
        {/* User name */}
        {pwdToken === "" ? null : (
          <button
            className="mt-3 btn btn-primary btn-block "
            onClick={() => {
              navigate(`/auth/set-password?email=${email}&pwd=${pwdToken}`);
            }}
          >
            Set Password
          </button>
        )}

        <div className="text-center mt-2">
          <a href="/auth/login"> Back to login</a>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmSuccess;
