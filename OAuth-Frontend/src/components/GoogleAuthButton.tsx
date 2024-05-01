import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = ({ onSuccess, onFailure }) => {
  return <GoogleLogin onSuccess={onSuccess} onError={onFailure} />;
};

export default GoogleAuthButton;
