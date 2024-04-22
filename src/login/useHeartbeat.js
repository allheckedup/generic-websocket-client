import { useEffect } from "react";
import { heartbeat } from "../Utils";

export default (lastMessage, sender, setLoginState) => {
  useEffect(() => {
    if (lastMessage) {
      if (JSON.parse(lastMessage.data)?.ty === "HEARTBEAT") {
        sender(heartbeat());
        setLoginState((state) => ({
          ...state,
          hbtime: Date.now(),
          beating: true,
        }));
        setTimeout(
          () => setLoginState((prev) => ({ ...prev, beating: false })),
          500
        );
      }
    }
  }, [lastMessage, setLoginState, sender]);
};
