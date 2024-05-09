/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchGraphApi } from "../../services";

const Profile = () => {
  const [profileDetail, setProfileDetail] = useState<any>();
  const [managerDetail, setManagerDetail] = useState<any>();
  const graphAPIAccessToken = localStorage.getItem("graphAPIAccessToken");
  useEffect(() => {
    fetchGraphApi(
      "https://graph.microsoft.com/v1.0/me",
      graphAPIAccessToken as string
    ).then((res: any) => {
      setProfileDetail(res);
    });
    fetchGraphApi(
      "https://graph.microsoft.com/v1.0/me/manager",
      graphAPIAccessToken as string
    ).then((res: any) => {
      setManagerDetail(res);
    });
    fetchGraphApi(
      "https://graph.microsoft.com/v1.0/users",
      graphAPIAccessToken as string
    ).then((res) => {
      if (res) {
        console.log("Users::", res);
      }
    });
    fetchGraphApi(
      "https://graph.microsoft.com/v1.0/me/calendar",
      graphAPIAccessToken as string
    ).then((res) => {
      if (res) {
        console.log("Calendar::", res);
      }
    });
  }, [graphAPIAccessToken]);

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
