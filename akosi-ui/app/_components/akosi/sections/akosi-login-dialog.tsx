import { FormEvent } from 'react';
import { ALVForm } from '../../core/alv-form';
import { ALVLabel } from '../../core/alv-label';
import { ALVSection } from '../../core/alv-section';
import { ALVTypography } from '../../core/alv-typography';
import { HTMLButton } from '../../core/html/html-button/html-button';
import { AkosiTextBox } from '../basics/akosi-textbox';
import { AkosiButton } from '../basics/akosi-button';

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
          <AkosiTextBox id="login-username" type='username' className="mt-1 w-full" />
        </div>
        <div className="mb-4">
          <ALVTypography weight="semibold" size="sm" theme="light">
            <ALVLabel targetElementId="password">{passwordHeaderText}</ALVLabel>
          </ALVTypography>
          <AkosiTextBox id="login-password" type='password' className="mt-1 w-full" />
        </div>
        <AkosiButton
          type="submit"
          id="login-button"
          theme="primary"
          borderRounding="full"
          className="px-4 py-2 w-full"
        >
          Log in
        </AkosiButton>
        <ALVTypography italic size="sm" theme="light">
          Not a member? Register here
        </ALVTypography>
      </ALVForm>
    </ALVSection>
  );
};
