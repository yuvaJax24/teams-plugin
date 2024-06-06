const MICROSOFT_DOMAIN = import.meta.env.VITE_MICROSOFT_DOMAIN;
const TENANT_DOMAIN = import.meta.env.VITE_TENANT_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const config = {
  clientId: CLIENT_ID,
  authority: `${MICROSOFT_DOMAIN}/${TENANT_DOMAIN}`,
  redirectUri: "/login",
  scopes: ["User.Read", "openid", "offline_access", "User.Read.All"],
};
