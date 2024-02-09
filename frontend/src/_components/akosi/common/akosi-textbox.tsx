import { ReactNode } from "react";
import { HTMLInput } from "../../core/html/html-input/html-input";
import {
  HTMLInputElementAutoCompleteValues,
  HTMLInputElementTypes,
} from "../../core/html/html-input/html-input.types";
import { SizeableElementProps, ThemableElementProps } from "../common.types";

export type TextboxTypes =
  | "email"
  | "text"
  | "password"
  | "password-update"
  | "username";

export type AkosiTextBoxProps = ThemableElementProps &
  SizeableElementProps & {
    id: string;
    className?: string;
    formId?: string;
    placeholder?: string;
    tootTip?: string;
    type: TextboxTypes;
    useAutocomplete?: boolean;
    actionElement?: ReactNode;
  };

export const AkosiTextBox = ({
  id,
  className,
  formId,
  size = "base",
  theme = "light",
  placeholder,
  tootTip,
  type = "text",
  useAutocomplete,
  actionElement,
}: AkosiTextBoxProps) => {
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
      <HTMLInput
        id={id}
        name={formId ?? id}
        autoComplete={inputAutoComplete}
        className={`mt-0 ${classesConsolidated}`}
        placeholder={placeholder}
        tootTip={tootTip}
        type={inputType}
      />
      {actionElement && (
        <span className="absolute inset-y-0 right-0 px-2 flex border-l items-center">
          {actionElement}
        </span>
      )}
    </span>
  );
};
