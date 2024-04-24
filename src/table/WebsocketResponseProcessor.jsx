import { useContext, useEffect, useMemo, useState } from "react";
import AuthHeaderContext from "../login/AuthHeaderContext";
import useWebSocket from "react-use-websocket";
import LoginStateContext from "../login/LoginStateContext";
import ResponseTable from "./ResponseTable";
import Collapsible from "./Collapsible";
import {
  newHeartBeatFilter,
  scrapeInitialFilters,
  useFilters,
} from "../filter/filter";
import MessageFilter from "../filter/MessageFilter";
import { heartbeat, randomString } from "../Utils";
import useLoginHeader from "../login/useLoginHeader";
import useHeartbeat from "../login/useHeartbeat";
import useMessageHistory from "../rest/useMessageHistory";

function adjustSelected(filterId, activeFilters, checkState) {
  const news = { ...activeFilters };
  news[filterId] = checkState;
  return news;
}

const WebsocketResponseProcessor = ({ defaultFilterHeartbeats }) => {
  const [authHeader, setAuthHeader] = useContext(AuthHeaderContext);
  const [_, setLoginState] = useContext(LoginStateContext);
  const { sendMessage, lastMessage } = useWebSocket(authHeader?.host ?? "");
  const [messageHistory, setMessageHistory] = useState([]);
  const [allFilters, setAllFilters] = useState(
    defaultFilterHeartbeats ? [newHeartBeatFilter()] : []
  );
  const [activeFilters, setActiveFilters] = useState(
    scrapeInitialFilters(allFilters)
  );

  const sendAndLog = useMemo(() => {
    return (msg) => {
      setMessageHistory((prev) => [
        ...prev,
        {
          data: msg ? JSON.parse(msg) : null,
          send: true,
          time: new Date().toLocaleString(),
        },
      ]);
      sendMessage(msg);
    };
  }, [setMessageHistory, sendMessage]);

  useLoginHeader(authHeader, sendAndLog, setAuthHeader);
  useHeartbeat(lastMessage, sendAndLog, setLoginState);
  useMessageHistory(lastMessage, setMessageHistory);

  const filteredMessages = useFilters(
    allFilters,
    activeFilters,
    messageHistory
  );

  return (
    <div>
      <h2>Responses</h2>
      <Collapsible
        heading="All Responses"
        defaultCollapse={false}
        headerImportance="large"
      >
        <ResponseTable messageHistory={filteredMessages} />

        <Collapsible
          heading="Filters"
          defaultCollapse={!defaultFilterHeartbeats}
          headerImportance={"medium"}
        >
          {allFilters.map((f) => (
            <MessageFilter
              key={f.filterId}
              filter={f.filter}
              locked={f.locked}
              enabled={activeFilters[f.filterId]}
              onChecked={(c) =>
                setActiveFilters((prev) => adjustSelected(f.filterId, prev, c))
              }
            />
          ))}
        </Collapsible>
      </Collapsible>
    </div>
  );
};

export default WebsocketResponseProcessor;
