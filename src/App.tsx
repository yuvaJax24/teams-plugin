import { MsalProvider } from "@azure/msal-react";
import Approuter from "./router";
import { IPublicClientApplication } from "@azure/msal-browser";

function App({ msalInstance }: { msalInstance: IPublicClientApplication }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Approuter />
    </MsalProvider>
  );
}

export default App;
