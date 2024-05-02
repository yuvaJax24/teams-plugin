import { useMsal } from "@azure/msal-react";
import { config } from "../../config";
import { useEffect, useState } from "react";
import { fetchGraphApi } from "../../services";

const Profile = () => {
  const { accounts, instance } = useMsal();
  const [profileDetail, setProfileDetail] = useState<any>();
  const [managerDetail, setManagerDetail] = useState<any>();

  useEffect(() => {
    instance
      .acquireTokenSilent({
        scopes: config.scopes,
        account: accounts?.[0],
      })
      .then((res: any) => {
        const accessToken = res?.accessToken;
        fetchGraphApi("https://graph.microsoft.com/v1.0/me", accessToken).then(
          (res: any) => {
            setProfileDetail(res);
          }
        );
        fetchGraphApi(
          "https://graph.microsoft.com/v1.0/me/manager",
          accessToken
        ).then((res: any) => {
          setManagerDetail(res);
        });
      });
  }, [instance, accounts]);

  return (
    <div>
      Profile
      <div>
        <p>{profileDetail?.displayName}</p>
        <p>{profileDetail?.mail}</p>
        <p>{profileDetail?.jobTitle}</p>
      </div>
      <div>
        <p>Manager</p>
        <p>{managerDetail?.displayName}</p>
        <p>{managerDetail?.mail}</p>
        <p>{managerDetail?.jobTitle}</p>
      </div>
    </div>
  );
};

export default Profile;
