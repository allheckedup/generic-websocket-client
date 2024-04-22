import { createRoot } from "react-dom/client";
import { useState } from "react";
import LoginForm from "./login/LoginForm";
import AuthHeaderContext from "./login/AuthHeaderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebsocketResponseProcessor from "./table/WebsocketResponseProcessor";
import LoginStateContext from "./login/LoginStateContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [restReqs, setRestReqs] = useState([{}]);
  const [cgets, setCgets] = useState([]);
  const [convs, setConvs] = useState([]);
  const authHeader = useState({});
  const loginState = useState({});

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <LoginStateContext.Provider value={loginState}>
          <AuthHeaderContext.Provider value={authHeader}>
            <h1>Websockets</h1>
            <hr />
            <LoginForm />
            <hr />
            <WebsocketResponseProcessor defaultFilterHeartbeats={true} />
          </AuthHeaderContext.Provider>
        </LoginStateContext.Provider>
      </QueryClientProvider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
