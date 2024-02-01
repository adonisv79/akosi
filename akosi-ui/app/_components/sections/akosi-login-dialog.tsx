import { FormEvent } from 'react';
import { ALVButton } from '../basic/alv-button';
import { ALVForm } from '../basic/alv-form';
import { AlvInput } from '../basic/alv-input';
import { ALVLabel } from '../basic/alv-label';
import { ALVSection } from '../basic/alv-section';
import { ALVTypography } from '../basic/alv-typography';

type AkosiLoginDialogProps = {
  dialogHeaderText: string;
  usernameHeaderText: string;
  passwordHeaderText: string;
};

export const AkosiLoginDialog = ({
  dialogHeaderText,
  usernameHeaderText,
  passwordHeaderText,
}: AkosiLoginDialogProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <ALVSection
      id="akosi-login-container"
      className="bg-white p-8 rounded-md shadow-md"
      displayType="grid"
    >
      <ALVTypography type="h4" className="mb-4">
        {dialogHeaderText}
      </ALVTypography>
      <ALVForm id="login-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light">
            <ALVLabel targetElementId="username">{usernameHeaderText}</ALVLabel>
          </ALVTypography>
          <AlvInput
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            className="mt-1 w-full"
          />
        </div>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light">
            <ALVLabel targetElementId="password">{passwordHeaderText}</ALVLabel>
          </ALVTypography>
          <AlvInput
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            className="mt-1 w-full"
          />
        </div>
        <ALVButton
          type="submit"
          id="login-button"
          theme="primary"
          className="px-4 py-2"
        >
          Log in
        </ALVButton>
      </ALVForm>
    </ALVSection>
  );
};
