import { ChangeEvent, FocusEvent, useState } from "react";
import { HTMLButton } from "../../core/html/html-button/html-button";
import { ALVTextBox, TextboxTypes } from "../../core/alv/alv-textbox";
const MIN_LENGTH = 8;
const MAX_LENGTH = 255;
const PASSWORD_PATTERN_RULE = `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*\\-_=+;:'",.<>?\\{\\}\\(\\)\\|\\/\\\\]).{${MIN_LENGTH},${MAX_LENGTH}}$`;

const ShowPasswordButton = ({
  onPressChanged,
  title,
}: {
  onPressChanged: (show: boolean) => void;
  title: string;
}) => {
  const handleOnFocus = (e: FocusEvent<HTMLButtonElement>) => {
    // we don't want this being focused
    e.currentTarget.blur();
  };

  return (
    <HTMLButton
      id="show-password-button"
      title={title}
      onFocus={handleOnFocus}
      onMouseUp={() => onPressChanged(false)}
      onMouseDown={() => onPressChanged(true)}
      onMouseLeave={() => onPressChanged(false)}
      className="w-6"
      tabIndex={-1}
    >
      👁️
    </HTMLButton>
  );
};

export type AkosiTextBoxPasswordProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  texts: {
    btnShowPassword: { title: string };
    placeholder: string;
    title: string;
  };
  value?: string | number | string[];
};

export const AkosiTextBoxPassword = ({
  onChange,
  texts,
  value,
}: AkosiTextBoxPasswordProps) => {
  const [type, setType] = useState<TextboxTypes>("password");

  const handleShowPasswordStateChanged = (show: boolean) => {
    show ? setType("text") : setType("password");
  };

  return (
    <ALVTextBox
      id="login-password"
      form={{ id: "password", isRequiredToSubmit: true }}
      type={type}
      size="sm"
      className="mt-1 w-full"
      placeholder={texts.placeholder}
      title={texts.title}
      actionElement={
        <ShowPasswordButton
          onPressChanged={handleShowPasswordStateChanged}
          title={texts.btnShowPassword.title}
        ></ShowPasswordButton>
      }
      minLength={MIN_LENGTH}
      maxLength={MAX_LENGTH}
      pattern={PASSWORD_PATTERN_RULE}
      value={value}
      onChange={onChange}
    />
  );
};
