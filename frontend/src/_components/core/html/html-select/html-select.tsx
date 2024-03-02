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
    <select
      id={id}
      className={`${className}`}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {config.options.map((optionGroup, index) => {
        if ("groupOptions" in optionGroup) {
          return (
            <optgroup
              id={optionGroup.id}
              key={`${optionGroup.id}${index}`}
              className={`${classNameOption} ${optionGroup.className}`}
              label={optionGroup.groupLabel}
            >
              {optionGroup.groupOptions.map((option) => (
                <option
                  id={option.id}
                  key={`${option.id}${index}`}
                  className={`${classNameOption} ${option.className}`}
                  value={option.value}
                >
                  {option.text}
                </option>
              ))}
            </optgroup>
          );
        } else {
          return (
            <option
              id={optionGroup.id}
              key={`${optionGroup.id}${index}`}
              className={`${classNameOption} ${optionGroup.className}`}
              value={optionGroup.value}
            >
              {optionGroup.text}
            </option>
          );
        }
      })}
    </select>
  );
};
