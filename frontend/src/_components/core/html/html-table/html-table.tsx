import { TableConfig } from "./html-table.types";

export type HTMLTableProps = {
  id: string;
  className?: string;
  classNameCells?: string;
  data: object[];
  config: TableConfig;
};

export const HTMLTable = ({
  id,
  className,
  classNameCells,
  config,
}: HTMLTableProps) => {
  return (
    <table id={id} className={className}>
      {config.caption && (
        <caption className={config.caption.className}>
          {config.caption.children}
        </caption>
      )}

      {config.header && (
        <thead className={config.header.className}>
          {config.header.rows.map((rowConfig, index) => (
            <tr id={rowConfig.id} key={`${rowConfig.id}${index}`} className={rowConfig.className}>
              {rowConfig.cells.map((cellConfig, index) => (
                <th id={cellConfig.id} key={`${cellConfig.id}${index}`} className={`${classNameCells} ${cellConfig.className}`}>
                  {cellConfig.children}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}

      <tbody className={config.body.className}>
        {config.body.rows.map((rowConfig, index) => (
          <tr id={rowConfig.id} key={`${rowConfig.id}${index}`} className={rowConfig.className}>
            {rowConfig.cells.map((cellConfig, index) => (
              <td id={cellConfig.id} key={`${cellConfig.id}${index}`} className={`${classNameCells} ${cellConfig.className}`}>{cellConfig.children}</td>
            ))}
          </tr>
        ))}
      </tbody>

      {config.footer && (
        <tfoot className={config.footer.className}>
          {config.footer.rows.map((rowConfig, index) => (
            <tr id={rowConfig.id} key={`${rowConfig.id}${index}`} className={rowConfig.className}>
              {rowConfig.cells.map((cellConfig, index) => (
                <td id={cellConfig.id} key={`${cellConfig.id}${index}`} className={`${classNameCells} ${cellConfig.className}`}>{cellConfig.children}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  );
};
