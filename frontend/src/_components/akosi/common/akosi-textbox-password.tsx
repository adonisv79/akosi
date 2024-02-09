import { useState } from "react";
import { HTMLButton } from "../../core/html/html-button/html-button";
import { SizeableElementProps, ThemableElementProps } from "../common.types";
import { AkosiTextBox, TextboxTypes } from "./akosi-textbox";
import { useTranslation } from "react-i18next";

export type AkosiTextBoxPasswordProps = ThemableElementProps &
  SizeableElementProps & {};

const ShowPasswordButton = ({
  onMouseUp,
  onMouseDown,
  onMouseLeave,
}: {
  onMouseUp: () => void;
  onMouseDown: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <HTMLButton
      id="show-password-button"
      toolTip="ss"
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
    >
      👁️
    </HTMLButton>
  );
};

export const AkosiTextBoxPassword = ({}: AkosiTextBoxPasswordProps) => {
  const { t } = useTranslation();
  const [type, setType] = useState<TextboxTypes>('password');

  const handleShowPassword = () => {
    setType('text')
  };

  const handleHidePassword = () => {
    setType('password')
  };

  return (
    <AkosiTextBox
      id="login-password"
      formId="password"
      type={type}
      size="sm"
      className="mt-1 w-full"
      placeholder={t("registrationDialog.passwordPlaceholderText")}
      tootTip={t("registrationDialog.passwordTooltipText")}
      actionElement={
        <ShowPasswordButton
          onMouseDown={handleShowPassword}
          onMouseLeave={handleHidePassword}
          onMouseUp={handleHidePassword}
        ></ShowPasswordButton>
      }
    />
  );
};
