/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { config } from "../config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default HomePage;
