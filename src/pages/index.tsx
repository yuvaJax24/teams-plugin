/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { config } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const isSiggedIn = useIsAuthenticated();
  const [loggedAccount, setloggedAccount] = useState<any>();

  const onSignIn = () => {
    instance.loginRedirect({
      scopes: config.scopes,
    });
  };

  useEffect(() => {
    const currentUser = accounts?.[0];
    if (currentUser) {
      setloggedAccount(currentUser);
    }
  }, [accounts]);

  useEffect(() => {
    if (isSiggedIn) {
      instance
        .acquireTokenSilent({
          scopes: config.scopes,
          account: accounts?.[0],
        })
        .then((res) => {
          localStorage.setItem("graphAPIAccessToken", res?.accessToken);
        });
    }
  }, [isSiggedIn, instance, accounts]);

  const onSignOut = () => {
    instance.logoutRedirect();
  };

  return (
    <div>
      {isSiggedIn ? <p>Sigged in as {loggedAccount?.username}</p> : null}
      {isSiggedIn ? (
        <button onClick={() => navigate("/profile")}>My Profile</button>
      ) : null}
      <button
        onClick={() => {
          if (isSiggedIn) {
            onSignOut();
          } else {
            onSignIn();
          }
        }}
      >
        {isSiggedIn ? "Signout" : "SignIn"}
      </button>
    </div>
  );
};

export default HomePage;
