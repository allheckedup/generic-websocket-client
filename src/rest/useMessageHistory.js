import { useEffect } from "react";

export default (lastMessage, setMessageHistory) => {
  useEffect(() => {
    if (lastMessage) {
      setMessageHistory((msgs) => [
        ...msgs,
        {
          data: lastMessage.data ? JSON.parse(lastMessage.data) : null,
          send: false,
          time: new Date().toLocaleString(),
        },
      ]);
    }
  }, [lastMessage, setMessageHistory]);
};
