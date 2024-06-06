import { MsalProvider } from "@azure/msal-react";
import Approuter from "./router";
import { IPublicClientApplication } from "@azure/msal-browser";
import Layout from "./component/layout";

function App({ msalInstance }: { msalInstance: IPublicClientApplication }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Layout>
        <Approuter />
      </Layout>
    </MsalProvider>
  );
}

export default App;
