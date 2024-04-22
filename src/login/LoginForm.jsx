import { useContext, useEffect, useState } from "react";
import useToken from "./useToken";
import AuthHeaderContext from "./AuthHeaderContext";
import LoginStateContext from "./LoginStateContext";

const LoginForm = (props) => {
  const [authHeader, setAuthHeader] = useContext(AuthHeaderContext);
  const [loginProps, setLoginProps] = useState({});
  const [loginState, setLoginState] = useContext(LoginStateContext);
  useToken(loginProps, setAuthHeader);
  useEffect(() => {
    if (authHeader.hdr) {
      setLoginState((loginState) => ({ ...loginState, tokened: true }));
    }
  }, [authHeader, setLoginState]);
  const [heartbeating, setHeartbeating] = useState(false);
  useEffect(() => {
    setHeartbeating(Date.now() - (loginState?.hbtime ?? 0) < 30000);
  }, [loginState]);
  return (
    <div className="login-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const username = formData.get("username");
          const password = formData.get("password");
          const wsHostURL = formData.get("ws-host");
          const authHostURL = formData.get("auth-host");

          console.log(
            `Processing submit for ${username}, ${password.length} ${wsHostURL}`
          );
          if (username && password && wsHostURL) {
            setLoginProps({
              username,
              password,
              websocketURL: wsHostURL,
              authProvider: authHostURL,
            });
          }
        }}
      >
        <div id="user-credentials-container">
          <span className="input-container">
            <label htmlFor="username">
              <h3>Username: </h3>
              <input
                name="username"
                placeholder="Username"
                defaultValue="ejames"
              />
            </label>
          </span>
          <span className="input-container">
            <label htmlFor="password">
              <h3>Password: </h3>
              <input
                name="password"
                placeholder="Password"
                type="password"
                defaultValue="imadevnow"
              />
            </label>
          </span>
        </div>
        <span id="host-container" className="input-container">
          <label htmlFor="auth-host">
            <h3>Auth: </h3>
            <input
              name="auth-host"
              placeholder="Auth Host URL"
              defaultValue="https://auth.app.bidfx.dev/rep/v1/login"
              style={{ minWidth: "500px" }}
            />
          </label>
          <label htmlFor="host">
            <h3>Host: </h3>
            <input
              name="ws-host"
              placeholder="WS Host URL"
              defaultValue="wss://click-trade.app.bidfx.dev/rep/v1/ws"
              style={{ minWidth: "500px" }}
            />
          </label>
        </span>
        <span id="login-button">
          <button>Log In</button>
          <div id="login-status">
            {loginState.tokened ? (
              <h3 className="login-success">▶ Token Fetched</h3>
            ) : (
              <h3 className="login-failure">⏹ No token</h3>
            )}
            {loginState.tokened && heartbeating ? (
              <h3 className="login-success">✔ Logged In</h3>
            ) : (
              <h3 className="login-failure">❗ Logged Out</h3>
            )}
            {heartbeating ? (
              <h3 className="login-success">
                {loginState.beating ? "💛" : "🧡"} Heartbeating
              </h3>
            ) : (
              <span />
            )}
          </div>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
