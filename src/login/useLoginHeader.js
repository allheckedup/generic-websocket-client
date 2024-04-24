import { useEffect } from "react";
import { randomString } from "../Utils";

export default (hdr, sender) => {
  useEffect(() => {
    if (hdr.hdr) {
      sender(
        JSON.stringify({
          id: `init-login-${randomString()}`,
          ty: "GET",
          hdr: hdr.hdr,
          params: {
            guid: "idk-some-guid-todo-random-gen",
          },
          path: "/login",
        })
      );
    }
  }, [hdr, sender]);
};
