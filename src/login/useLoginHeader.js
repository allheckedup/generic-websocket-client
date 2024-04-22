import { useEffect } from "react";
import { randomString } from "../Utils";

export default (hdr, sender) => {
  const requestId = `init-login-${randomString()}`;
  useEffect(() => {
    if (hdr.hdr) {
      sender(
        JSON.stringify({
          id: requestId,
          ty: "GET",
          hdr: hdr.hdr,
          params: {
            guid: "idk-some-guid-todo-random-gen",
          },
          path: "/login",
        })
      );
    }
  }, [hdr, sender, requestId]);
};
