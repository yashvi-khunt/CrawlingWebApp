import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = ({ onSuccess, onFailure }) => {
  return <GoogleLogin width="100%" onSuccess={onSuccess} onError={onFailure} />;
};

export default GoogleAuthButton;
