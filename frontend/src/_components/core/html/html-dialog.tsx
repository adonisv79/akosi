import { useEffect, useRef } from "react";
import {
  CommonElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from "../common.types";

export type HTMLDialogProps = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps & {
    isVisible?: boolean;
    onClose?: (id: string) => {};
    onShow?: (id: string) => {};
  };

export const HTMLDialog = ({
  children,
  className,
  isVisible = false,
  id,
  onClose,
  onShow,
}: HTMLDialogProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const modalElement = modalRef.current;
    if (isVisible) {
      modalElement?.showModal();
      onShow && onShow(id);
    } else if (!isVisible) {
      modalElement?.close();
      onClose && onClose(id);
    }
  }, [isVisible]);

  return (
    <dialog id={id} ref={modalRef} className={className}>
      {children}
    </dialog>
  );
};
