import { useState } from "react";

const Collapsible = (props) => {
  const [collapsed, setCollapsed] = useState(props.defaultCollapse ?? false);
  return (
    <div>
      <span
        className={`collapsing-header${collapsed ? " collapsed" : ""} size-${
          props.headerImportance ?? "large"
        }`}
      >
        <button onClick={(e) => setCollapsed((prev) => !prev)}>
          {collapsed ? "▶" : "▼"} {props.heading}
        </button>
      </span>
      <div className="collapsible-container">
        {!collapsed ? props.children : []}
      </div>
    </div>
  );
};

export default Collapsible;
