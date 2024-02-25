import { useContext } from "react";
import { HTMLTable } from "../../_components/core/html/html-table/html-table";
import { TableConfig } from "../../_components/core/html/html-table/html-table.types";
import { useUserHistoryQuery } from "../../api/queries/users-query";
import { Logger } from "../../helpers/logger";
import { UserSessionContext } from "../../hooks/user-session.context";

const COMPONENT_NAME = "UserHistoriesTable";

export const UserHistoriesTable = () => {
  const logger = new Logger(COMPONENT_NAME);
  logger.info(`Mounting ${COMPONENT_NAME}`);
  const session = useContext(UserSessionContext);
  const { data: histories } = useUserHistoryQuery(session.token?.userId);

  if (!histories) return null;

  const config: TableConfig = {
    body: { rows: [], className: "overflow-scroll h-80 text-xs sticky" },
  };
  config.header = {
    className: "border sticky top-0 bg-gray-500 z-50",
    rows: [
      {
        cells: [
          { children: <>Date</> },
          { children: <>User</> },
          { children: <>Action</> },
        ],
      },
    ],
  };
  histories.map((h) => {
    config.body.rows.push({
      cells: [
        { children: <>{h.createdDate}</> },
        { children: <>{h.userId}</> },
        { children: <>{h.activityId}</> },
      ],
    });
  });

  return (
    <div className=" overflow-y-auto min-h-20 h-80">
      <HTMLTable
        config={config}
        id="s"
        className="border-collapse"
        classNameCells="border"
      />
    </div>
  );
};
