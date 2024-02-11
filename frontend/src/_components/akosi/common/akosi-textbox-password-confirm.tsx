import { ChangeEvent, useEffect, useState } from "react";
import { ALVTextBox } from "../../core/alv/alv-textbox";

export type AkosiTextBoxPasswordConfirmProps = {
  currentPassword?: string;
  texts: {
    placeholder: string;
    title: string;
    isEmpty: string;
    isMatching: string;
    isNotMatching: string;
  };
};

export const AkosiTextBoxPasswordConfirm = ({
  currentPassword,
  texts,
}: AkosiTextBoxPasswordConfirmProps) => {
  const [confirmValue, setConfirmValue] = useState("");
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  useEffect(() => {
    if (!confirmValue) setIsMatch(null);
    else if (confirmValue === currentPassword) setIsMatch(true);
    else setIsMatch(false);
  }, [currentPassword, confirmValue]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(e.currentTarget.value);
  };

  return (
    <ALVTextBox
      id={`login-password-confirm"}`}
      form={{ id: "password-confirm", isRequiredToSubmit: true }}
      type="password"
      size="sm"
      className="mt-1 w-full"
      placeholder={texts.placeholder}
      title={texts.title}
      actionElement={
        <span className="w-6">
          {isMatch ? (
            <span title={texts.isMatching}>✅</span>
          ) : isMatch === false ? (
            <span title={texts.isNotMatching}>❎</span>
          ) : (
            <span title={texts.isEmpty}>☑️</span>
          )}
        </span>
      }
      value={confirmValue}
      onChange={handleOnChange}
    />
  );
};
