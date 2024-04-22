import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const ResponseTable = ({ messageHistory }) => {
  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const columns = useMemo(() => {
    return [
      {
        accessorKey: "send",
        header: () => <span>Send/Receive</span>,
        cell: ({ row, getValue }) => {
          return (
            <span className={`${getValue() ? "send" : "rcv"}-icon`}>
              {getValue() ? "⬆" : "⬇"}
            </span>
          );
        },
      },
      {
        accessorKey: "data",
        header: () => <span>Data</span>,
        cell: ({ row, getValue }) => (
          <span className="data-quick-view">{JSON.stringify(getValue())}</span>
        ),
      },
      {
        accessorKey: "time",
        header: () => <span>Timestamp</span>,
      },
    ];
  }, []);

  const table = useReactTable({
    data: messageHistory,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: false,
  });

  return (
    <div className="response-and-filters">
      <div className="responder-container">
        <div className="response-table">
          <table>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className={
                      selectedRow === row.id
                        ? `row-selected`
                        : `row-unselected-${
                            row.getVisibleCells().at(0).getValue()
                              ? "send"
                              : "rcv"
                          }`
                    }
                    onClick={() => {
                      setSelectedMessage(
                        row.getVisibleCells().at(1).getValue()
                      );
                      setSelectedRow(row.id);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className={cell.column.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="message-inspect">
          <pre>
            {selectedMessage ? JSON.stringify(selectedMessage, null, 2) : null}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ResponseTable;
