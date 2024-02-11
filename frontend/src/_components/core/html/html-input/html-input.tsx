import { ChangeEvent } from "react";
import {
  CommonElementProps,
  NavigableElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from "../../common.types";
import {
  HTMLInputElementAutoCompleteValues,
  HTMLInputElementTypes,
} from "./html-input.types";

export type HTMLInputProps = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps &
  NavigableElementProps & {
    /** Browser auto complete value */
    autoComplete?: HTMLInputElementAutoCompleteValues;
    /** Form identifier for the input (defaults to id). */
    name?: string;
    /** Enforces the number of characters allowed */
    length?: {
      /** Text character min length */
      min: number;
      /** Text character max length */
      max: number;
    };
    /** Default helper text that appears when the input is empty*/
    placeholder?: string;
    /** Indicates if the form element is required to be set in order to submit */
    required?: boolean;
    /** Input type */
    type: HTMLInputElementTypes;
    /** The value of the input */
    value?: string | number | string[];
    /** fires when the value of the input changes */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  };

/**
 * Basic input field
 * @param param0
 * @returns
 */
export const HTMLInput = ({
  autoComplete = "off",
  className,
  id,
  length = { min: 0, max: 255 },
  name,
  placeholder,
  required,
  title,
  type,
  value,
  onChange,
}: HTMLInputProps) => {
  return (
    <input
      autoComplete={autoComplete}
      className={className}
      name={name ?? id}
      id={id}
      placeholder={placeholder}
      title={title}
      type={type}
      value={value}
      minLength={length.min}
      maxLength={length.max}
      onChange={onChange}
      required={required}
    />
  );
};
