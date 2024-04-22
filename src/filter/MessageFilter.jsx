import { useState } from "react";

const displayStrings = {
  EQUALS: "equal to",
  NOT_EQUALS: "not equal to",
};

const MessageFilter = ({ filter, enabled, onChecked }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="message-filter-container">
      {isEditing ? (
        <form className="message-filter-edit"></form>
      ) : (
        <div className="message-filter">
          <span className="message-filter-actions">
            <input
              type="checkbox"
              className="message-filter-toggle"
              checked={enabled}
              onChange={(e) => onChecked(e.target.checked)}
            />
            <button className="message-filter-edit">💬</button>
          </span>
          <span className="message-filter-details">
            <span className="filter-field">
              <code>{filter.key}</code>
            </span>
            <select disabled={true}>
              <option> {displayStrings[filter.mode]} </option>
            </select>
            <code className="filter-field">{filter.value}</code>
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageFilter;
