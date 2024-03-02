import { CommonElementProps } from "../../common.types";

export type HTMLOptionConfig = CommonElementProps & {
  text: string;
  value: string;
};

export type HTMLOptionGroupConfig = CommonElementProps & {
  groupLabel: string;
  groupOptions: HTMLOptionConfig[];
};

export type HTMLSelectConfig = CommonElementProps & {
  options: (HTMLOptionConfig | HTMLOptionGroupConfig)[];
};