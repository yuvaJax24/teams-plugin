/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { config, googleConfig } from "../config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const isSiggedIn = useIsAuthenticated();

  const onSignIn = () => {
    instance.loginRedirect({
      scopes: config.scopes,
    });
  };
  useEffect(() => {
    if (isSiggedIn) {
      instance
        .acquireTokenSilent({
          scopes: config.scopes,
          account: accounts?.[0],
        })
        .then((res) => {
          localStorage.setItem("graphAPIAccessToken", res?.accessToken);
          navigate("/meeting");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSiggedIn, instance, accounts]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      // http://localhost:3000/signin
      axios({
        url: "http://localhost:8000/cohort",
        method: "post",
        data: { token: codeResponse },
        withCredentials: true,
      });
    },
    flow: "auth-code",
  });
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to CRB</h1>
        <p className="mt-6 text-center">Login using</p>
        <button
          className="border-[2px] border-black px-3 py-1 cursor-pointer"
          onClick={onSignIn}
        >
          Microsoft Account
        </button>
      </div>
      {/* <GoogleOAuthProvider clientId={googleConfig?.clientId}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("first2-err");
          }}
          useOneTap
        />
      </GoogleOAuthProvider> */}
      <button onClick={login}>Google Login</button>
    </div>
  );
};

export default HomePage;
