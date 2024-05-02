import { Route, Routes } from "react-router-dom";
import HomePage from "../pages";
import Profile from "../pages/profile";
import { useEffect } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { config } from "../config";

const Approuter = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();

  useEffect(() => {
    if (!isAuthenticated) {
      instance
        .ssoSilent({
          scopes: config.scopes,
          loginHint: "username@yusoft136.onmicrosoft.com",
        })
        .then((res: any) => {
          instance.setActiveAccount(res?.account);
        })
        .catch((err: any) => {
          if (err instanceof InteractionRequiredAuthError) {
            instance.loginRedirect({
              scopes: config.scopes,
            });
          }
        });
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Approuter;
