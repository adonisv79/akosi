import { TableConfig } from "./html-table.types";

export type HTMLTableProps = {
  id: string;
  className?: string;
  data: object[];
  config: TableConfig;
};

export const HTMLTable = ({ id, className, config }: HTMLTableProps) => {
  return (
    <table id={id} className={className}>
      {config.caption && (
        <caption className={config.caption.className}>
          {config.caption.children}
        </caption>
      )}

      {config.header && (
        <thead className={config.header.className}>
          {config.header.rows.map((rowConfig) => (
            <tr className={rowConfig.className}>
              {rowConfig.cells.map((cellConfig) => (
                <th className={cellConfig.className}>{cellConfig.children}</th>
              ))}
            </tr>
          ))}
        </thead>
      )}

      <tbody className={config.body.className}>
        {config.body.rows.map((rowConfig) => (
          <tr className={rowConfig.className}>
            {rowConfig.cells.map((cellConfig) => (
              <td className={cellConfig.className}>{cellConfig.children}</td>
            ))}
          </tr>
        ))}
      </tbody>

      {config.footer && (
        <tfoot className={config.footer.className}>
          {config.footer.rows.map((rowConfig) => (
            <tr className={rowConfig.className}>
              {rowConfig.cells.map((cellConfig) => (
                <td className={cellConfig.className}>{cellConfig.children}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  );
};
