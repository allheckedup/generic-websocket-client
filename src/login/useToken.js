import { useContext, useEffect } from "react";
import AuthHeaderContext from "./AuthHeaderContext";
import fetchToken from "./fetchToken";
import { useQuery } from "@tanstack/react-query";

const createHdr = (bearerToken) => {
  return {
    Authorization: `Bearer ${bearerToken}`,
    "heartbeat-interval": "15",
    "x-timezone": "Europe/London",
  };
};

function fetchAndSetToken(loginProps, setAuthHeader) {
  fetchToken(loginProps)
    .then((tokenRes) => {
      if (tokenRes.token) {
        setAuthHeader({
          hdr: createHdr(tokenRes.token),
          host: loginProps.websocketURL,
        });
      }
    })
    .catch(console.error);
}

export default function useToken(loginProps, setAuthHeader) {
  useEffect(() => {
    fetchAndSetToken(loginProps, setAuthHeader);
    let timerId = setInterval(
      () => fetchAndSetToken(loginProps, setAuthHeader),
      120000
    );
    return clearInterval(timerId);
  }, [loginProps, setAuthHeader]);
}
