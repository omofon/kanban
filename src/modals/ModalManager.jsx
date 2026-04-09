import { useUI } from "../context/UIContext";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";

export default function ModalManager() {
  const { modal, closeModal } = useUI();

  if (!modal) return null;

  const props = { isOpen: true, onClose: closeModal, ...modal };

  switch (modal.type) {
    case "viewTask":
      return <ViewTask {...props} />;
    case "editTask":
      return <EditTask {...props} />;
    case "addTask":
      return <AddTask {...props} />;
    default:
      return null;
  }
}
