import { RefObject } from "react";
import {
  CommonElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from "../../common.types";
import { ALVDialogheader } from "./alv-dialog-header";

export type HTMLDialogProps = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps & {
    modalRef: RefObject<HTMLDialogElement>;
    onClose?: () => {};
    text: {
      title: string;
    };
  };

export const ALVDialog = ({
  children,
  className,
  id,
  modalRef,
  onClose,
  text,
}: HTMLDialogProps) => {
  const handleOnCloseModal = () => {
    modalRef.current?.close();
  };

  return (
    <dialog
      id={id}
      ref={modalRef}
      className={`rounded-lg p-4 bg-white text-black shadow-lg ${className}`}
      onClose={onClose}
    >
      <ALVDialogheader
        className="font-bold border-b-2 py-2"
        text={{ title: text.title }}
        onClose={handleOnCloseModal}
      />
      <div className=" text-black bg-white">{children}</div>
    </dialog>
  );
};
