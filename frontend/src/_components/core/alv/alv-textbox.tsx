import { ChangeEvent, ReactNode } from "react";
import {
  HTMLInputElementAutoCompleteValues,
  HTMLInputElementTypes,
} from "../html/html-input/html-input.types";
import {
  SizeableElementProps,
  ThemableElementProps,
} from "../../akosi/common.types";
import {
  CommonElementProps,
  FormElementProps,
  UniqueElementProps,
} from "../common.types";

export type TextboxTypes =
  | "email"
  | "text"
  | "password"
  | "password-update"
  | "username";

export type ALVTextBoxProps = CommonElementProps &
  FormElementProps &
  UniqueElementProps &
  ThemableElementProps &
  SizeableElementProps & {
    pattern?: string;
    placeholder?: string;
    type: TextboxTypes;
    useAutocomplete?: boolean;
    maxLength?: number;
    minLength?: number;
    actionElement?: ReactNode;
    value?: string | number | string[];
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  };

export const ALVTextBox = ({
  id,
  className,
  form,
  size = "base",
  theme = "light",
  pattern,
  placeholder,
  title,
  maxLength,
  minLength,
  type = "text",
  useAutocomplete,
  actionElement,
  value,
  onChange,
}: ALVTextBoxProps) => {
  let inputAutoComplete: HTMLInputElementAutoCompleteValues = "off";
  let inputType: HTMLInputElementTypes = "text";
  switch (type) {
    case "email":
      if (useAutocomplete) inputAutoComplete = "email";
      inputType = "email";
      break;
    case "password":
      if (useAutocomplete) inputAutoComplete = "current-password";
      inputType = "password";
      break;
    case "password-update":
      if (useAutocomplete) inputAutoComplete = "new-password";
      inputType = "password";
      break;
    case "username":
      if (useAutocomplete) inputAutoComplete = "username";
      break;
  }

  const themeClasses =
    theme === "light"
      ? "bg-white text-black border-black-500 hover:bg-gray-100"
      : "bg-black text-white border-black-500 hover:bg-gray-800";

  const sizeClasses =
    size === "sm"
      ? "text-sm p-2 border-sm"
      : size === "base"
      ? "text-base p-2.5 border-md"
      : "text-lg p-3 border-lg";

  const classesConsolidated = `border rounded-md p-2 ${themeClasses} ${sizeClasses} ${className}`;

  return (
    <span className="relative">
      <input
        autoComplete={inputAutoComplete}
        className={`mt-0 ${classesConsolidated}`}
        name={form?.id ?? id}
        id={id}
        pattern={pattern}
        placeholder={placeholder}
        title={title}
        type={inputType}
        value={value}
        onChange={onChange}
        required={form?.isRequiredToSubmit}
        maxLength={maxLength}
        minLength={minLength}
      />
      {actionElement && (
        <span className="absolute inset-y-0 right-0 px-2 flex border-l items-center">
          {actionElement}
        </span>
      )}
    </span>
  );
};
