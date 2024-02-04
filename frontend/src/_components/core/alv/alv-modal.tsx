import { ReactNode } from "react";
import { CommonElementProps } from "../common.types";
import { HTMLDialog } from "../html/html-dialog";
type ALVModalProps = CommonElementProps & {
    isVisible?: boolean;
    modalId: string;
    modals: { id: string; children: ReactNode }[];
  };

export const ALVModal = ({
  className,
  modalId,
  modals,
  isVisible,
}: ALVModalProps) => {
  const modalItem = modals.find(m => m.id === modalId);
  if (!modalItem) return null;

  return (
    <HTMLDialog id={modalId} isVisible={isVisible} className={className}>
      {modalItem.children}
    </HTMLDialog>
  );
};
