import { ChangeEvent } from "react";
import { ALVTextBox } from "../../core/alv/alv-textbox";
const MIN_LENGTH = 4;
const MAX_LENGTH = 50;

export type AkosiTextBoxUsernameProps = {
  texts: {
    placeholder: string;
    title: string;
  };
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const AkosiTextBoxUsername = ({
  onChange,
  texts,
  value,
}: AkosiTextBoxUsernameProps) => {
  return (
    <ALVTextBox
      id="login-username"
      form={{ id: "username", isRequiredToSubmit: true }}
      type="username"
      size="sm"
      className="mt-1 w-full"
      placeholder={texts.placeholder}
      title={texts.title}
      actionElement={<span className="w-6"> :)</span>}
      value={value}
      minLength={MIN_LENGTH}
      maxLength={MAX_LENGTH}
      onChange={onChange}
    />
  );
};
