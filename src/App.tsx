import { MsalProvider } from "@azure/msal-react";
import Approuter from "./router";
import { IPublicClientApplication } from "@azure/msal-browser";
import Layout from "./component/layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleConfig } from "./config";

function App({ msalInstance }: { msalInstance: IPublicClientApplication }) {
  return (
    <GoogleOAuthProvider clientId={googleConfig?.clientId}>
      <MsalProvider instance={msalInstance}>
        <Layout>
          <Approuter />
        </Layout>
      </MsalProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
