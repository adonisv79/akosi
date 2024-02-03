import { Meta, StoryObj } from "@storybook/react";
import { AkosiLoginDialog } from "../../_components/akosi/sections/akosi-login-dialog";

const meta: Meta<typeof AkosiLoginDialog> = {
  title: "Akosi/Sections/ALV Login Dialog",
  component: AkosiLoginDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    texts: {
      buttonLoginText: "Login",
      dialogHeaderText: "Hi there! please sign-in",
      notAMemberText: "Not yet a member?",
      passwordForgotLink: "Forgot your password?",
      passwordHeaderText: "Password",
      passwordPlaceholderText: "Enter password here",
      passwordTooltipText:
        "Your password is your secret key to access the resource. Do not share it with annyone.",
      registerHereText: "Register here",
      usernameHeaderText: "Username",
      usernamePlaceholderText: "Enter username here",
      usernameTooltipText: "Your username is the unique account name",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
