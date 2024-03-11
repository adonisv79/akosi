import { HTMLButton } from "../../html/html-button/html-button";
import { ALVTypography } from "../alv-typography";

type ALVDialogheaderProps = {
  className?: string;
  text: {
    title: string;
  };
  onClose?: () => void;
};

export const ALVDialogheader = ({ className, text, onClose }: ALVDialogheaderProps) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <ALVTypography type="h4">{text.title}</ALVTypography>
      <HTMLButton
        id="modal-close-button"
        className="rounded-full w-6 h-6 hover:bg-gray-200 flex"
        title="Close this dialog"
        onClick={onClose}
      >
        <i className="material-icons text-sm">close</i>
      </HTMLButton>
    </div>
  );
};
