import { FormEvent } from "react"
import { CommonElementProps, ParentalElementProps, UniqueElementProps } from "./common.types"

export type ALVFormProps = CommonElementProps & UniqueElementProps & ParentalElementProps & {
  onSubmit: (e: FormEvent) => void
}

export const ALVForm = ({
  id,
  children,
  onSubmit,
}: ALVFormProps) => {
  return <form id={id} onSubmit={onSubmit}>
    {children}
  </form>
}