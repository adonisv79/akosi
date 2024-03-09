import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { CommonElementProps } from "../common.types";
import { HTMLDialog, HTMLDialogReference } from "../html/html-dialog";
import { HTMLButton } from "../html/html-button/html-button";

export type ALVModalReference = {
  show: () => void;
};

export type ModalConfig = {
  id: string;
  children: ReactNode;
};

type ALVModalProps = CommonElementProps & {
  modalId: string;
  modals: ModalConfig[];
};

export const ALVModal = forwardRef<ALVModalReference, ALVModalProps>(({
  className,
  modalId,
  modals,
}, ref) => {
  const dialogRef = useRef<HTMLDialogReference | null>(null);
  useImperativeHandle(ref, () => ({
    show: () => {
      const modalElement = dialogRef.current;
      modalElement?.show();
    },
  }));

  const modalItem = modals.find((m) => m.id === modalId);
  if (!modalItem) return null;

  const handleOnCloseModal = () => {
    dialogRef.current?.close();
  }

  return (
    <HTMLDialog ref={dialogRef} id={modalId} className={className}>
      <div className=" text-black bg-white rounded-lg">
        <HTMLButton id="modal-close-button p-0 m-0" title="Close this dialog" onClick={handleOnCloseModal}>
          <i className="material-icons text-sm m-0 p-0">close</i>
        </HTMLButton>
        {modalItem.children}
      </div>
    </HTMLDialog>
  );
});
