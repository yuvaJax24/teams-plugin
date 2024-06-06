import { useEffect } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const Meeting = () => {
  const isSiggedIn = useIsAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isSiggedIn) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSiggedIn]);
  return <div>CRB - My Meetings</div>;
};

export default Meeting;
