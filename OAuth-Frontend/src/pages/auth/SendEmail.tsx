import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SendEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("email")) {
      setEmail(searchParams.get("email"));

      searchParams.delete("email");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  return (
    <div className="hold-transition lockscreen">
      <div className="lockscreen-wrapper">
        <div className="lockscreen-logo">
          <a href="/">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="help-block text-center lockscreen-name">
          Account Created Successfully!
        </div>
        {/* /.lockscreen-item */}
        <div className="help-block text-center">
          We have sent a confirmation email to
        </div>
        {/* User name */}
        <div className="lockscreen-name">{email}</div>
        <a
          target="_blank"
          href="https://mail.google.com"
          className="mt-3 btn btn-primary btn-block "
        >
          <i className="mr-2 fa fa-envelope" />
          Open Mail
        </a>
        <div className="text-center mt-2">
          <a href="/auth/login">Or Back to login</a>
        </div>
      </div>
    </div>
  );
}

export default SendEmail;
