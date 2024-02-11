import { ChangeEvent } from "react";
import { CommonElementProps, UniqueElementProps } from "../../common.types";
import { HTMLSelectConfig } from "./html-select.types";

export type HTMLSelectProps = CommonElementProps &
  UniqueElementProps & {
    classNameOption?: string;
    name: string;
    config: HTMLSelectConfig;
    defaultValue?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  };

export const HTMLSelect = ({
  className,
  classNameOption,
  config,
  defaultValue,
  id,
  name,
  onChange,
}: HTMLSelectProps) => {
  return (
    <select id={id} className={`${className}`} name={name} defaultValue={defaultValue} onChange={onChange}>
      {config.options.map((optionGroup) => {
        if ("options" in optionGroup) {
          return (
            <optgroup
              className={`${classNameOption} ${optionGroup.className}`}
              label={optionGroup.label}
            >
              {optionGroup.options.map((option) => (
                <option className={`${classNameOption} ${option.className}`} value={option.value}>
                  {option.text}
                </option>
              ))}
            </optgroup>
          );
        } else {
          return (
            <option className={`${classNameOption} ${optionGroup.className}`} value={optionGroup.value}>
              {optionGroup.text}
            </option>
          );
        }
      })}
    </select>
  );
};
