import { useRef } from "react"
import { ALVModal, ALVModalReference, ModalConfig } from "../../../_components/core/alv/alv-modal"
import { HTMLButton } from "../../../_components/core/html/html-button/html-button"
import { CreateUserProfile } from "./create-user-profile"
import { UserProfilesList } from "./user-profiles-list"

export const ProfilesPage = () => {
  const modalRef = useRef<ALVModalReference>(null);
  const handleOnCreateButtonClicked = () => {
    modalRef.current?.show();
  }

  const modals:ModalConfig[] = [{ id: 'xx', children: <CreateUserProfile /> }]

  return <><UserProfilesList />
  <HTMLButton id="create" onClick={handleOnCreateButtonClicked}>Create</HTMLButton>
  <ALVModal ref={modalRef} modalId="xx" modals={modals}></ALVModal>
  </>
}