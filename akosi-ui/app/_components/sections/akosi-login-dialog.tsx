import { FormEvent } from 'react';
import { ALVButton } from '../basic/alv-button';
import { ALVForm } from '../basic/alv-form';
import { AlvInput } from '../basic/alv-input';
import { ALVLabel } from '../basic/alv-label';
import { ALVSection } from '../basic/alv-section';

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
      <h2 className="text-2xl font-semibold mb-4">{dialogHeaderText}</h2>
      <ALVForm id="login-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <ALVLabel
            targetElementId="username"
            className="block text-sm font-medium text-gray-600"
          >
            {usernameHeaderText}
          </ALVLabel>
          <AlvInput
            type="text"
            id="username"
            name="username"
            className="mt-1 w-full"
          />
        </div>
        <div className="mb-4">
          <ALVLabel
            targetElementId="password"
            className="block text-sm font-medium text-gray-600"
          >
            {passwordHeaderText}
          </ALVLabel>
          <AlvInput
            type="password"
            id="password"
            name="password"
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
