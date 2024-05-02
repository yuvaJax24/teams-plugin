export const fetchGraphApi = (url: string, accessToken: string) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers,
  };
  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
