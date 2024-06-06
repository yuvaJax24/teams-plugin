import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages";
import Profile from "../pages/profile";
import { useEffect } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { config } from "../config";
import RoomBooking from "../pages/room-booking";
import Meeting from "../pages/my-meeting";
import PrivacyPolicy from "../pages/privacy-policy";
import TermsofUse from "../pages/Terms-of-use";

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
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/booking" element={<RoomBooking />} />
      <Route path="/meeting" element={<Meeting />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsofUse />} />
    </Routes>
  );
};

export default Approuter;
