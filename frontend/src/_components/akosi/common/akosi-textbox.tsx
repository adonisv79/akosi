import { ChangeEvent } from "react";
import { ALVTextBox } from "../../core/alv/alv-textbox";

export type AkosiTextBoxUsernameProps = {
  texts: {
    placeholder: string;
    title: string;
  };
  id: string;
  minLength?: number;
  maxLength: number;
  isRequiredToSubmit?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const AkosiTextBox = ({
  onChange,
  id,
  minLength,
  maxLength,
  isRequiredToSubmit = false,
  texts,
  value,
}: AkosiTextBoxUsernameProps) => {
  return (
    <ALVTextBox
      id={id}
      form={{ id, isRequiredToSubmit }}
      type="text"
      size="sm"
      className="mt-1 w-full"
      placeholder={texts.placeholder}
      title={texts.title}
      actionElement={<span className="w-6"> </span>}
      value={value}
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
    />
  );
};
