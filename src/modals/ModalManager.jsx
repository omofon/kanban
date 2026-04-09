import { useUI } from "../context/UIContext";
import AddBoard from "./AddBoard";
import AddColumn from "./AddColumn";
import AddTask from "./AddTask";
import DeleteBoard from "./DeleteBoard";
import DeleteTask from "./DeleteTask";
import EditBoard from "./EditBoard";
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
    case "deleteTask":
      return <DeleteTask {...props} />;
    case "addBoard":
      return <AddBoard {...props} />;
    case "deleteBoard":
      return <DeleteBoard {...props} />;
    case "editBoard":
      return <EditBoard {...props} />;
    case "addColumn":
      return <AddColumn {...props} />;
    default:
      return null;
  }
}
