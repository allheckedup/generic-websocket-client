import { useMemo } from "react";
import { randomString } from "../Utils";

export const newFilter = (filter, locked, enabled) => {
  return {
    filterId: randomString(),
    locked,
    enabled,
    filter,
  };
};

export const newHeartBeatFilter = () => {
  return newFilter({
    key: "ty",
    mode: "NOT_EQUALS",
    value: "HEARTBEAT",
  });
};

function runFilter({ data: dataPiece }, { filter: fltr }) {
  console.log(dataPiece);
  if (fltr.mode === "EQUALS") {
    return dataPiece[fltr.key] === fltr.value;
  }
  if (fltr.mode === "NOT_EQUALS") {
    return dataPiece[fltr.key] !== fltr.value;
  }
  return true;
}

export const useFilters = (allFilters, activeFilters, messageHistory) => {
  return useMemo(() => {
    return allFilters
      .filter((f) => activeFilters[f.filterId])
      .reduce((messages, fltr) => filter(fltr, messages), messageHistory);
  }, [allFilters, messageHistory, activeFilters]);
};

const filter = (f, data) => {
  return data.filter((d) => runFilter(d, f));
};
export default filter;

export function scrapeInitialFilters(allFilters) {
  const activeFilters = {};
  allFilters.forEach((f) => (activeFilters[f.filterId] = true));
  return activeFilters;
}
