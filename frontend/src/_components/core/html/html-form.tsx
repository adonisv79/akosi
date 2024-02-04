import { FormEvent } from "react";
import {
  CommonElementProps,
  ParentalElementProps,
  UniqueElementProps,
} from "../common.types";

export type HTMLFormProps = CommonElementProps &
  UniqueElementProps &
  ParentalElementProps & {
    onSubmit?: (formData: Record<string, string>) => void;
  };

export const HTMLForm = ({ id, children, onSubmit }: HTMLFormProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formDataObject: Record<string, string> = {};

    formData.forEach((value, key) => {
      formDataObject[key] = value as string;
    });

    if (onSubmit) {
      onSubmit(formDataObject);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
