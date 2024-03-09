import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  CommonElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from "../common.types";

export type HTMLDialogReference = {
  show: () => void;
  close: () => void;
};

export type HTMLDialogProps = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps & {
    onClose?: (id: string) => {};
    onShow?: (id: string) => {};
  };

export const HTMLDialog = forwardRef<HTMLDialogReference, HTMLDialogProps>(
  ({ children, className, id, onClose, onShow }, ref) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => ({
      show: () => {
        const modalElement = modalRef.current;
        modalElement?.showModal();
        onShow && onShow(id);
      },
      close: () => {
        const modalElement = modalRef.current;
        modalElement?.close();
        onClose && onClose(id);
      },
    }));

    return (
      <dialog id={id} ref={modalRef} className={className}>
        {children}
      </dialog>
    );
  }
);
