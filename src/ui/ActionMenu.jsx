import { useBoard } from "../context/BoardContext";
import { useUI } from "../context/UIContext";

export default function ActionMenu({ isOpen, onClose }) {
  const {} = useBoard();
  const { openModal, closeModal } = useUI();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Menu */}
      <section className="fixed top-20 md:top-24 lg:top-28 right-6 w-48 bg-surface rounded-lg z-50 shadow-lg p-4 space-y-4">
        <button
          onClick={() => {
            openModal("editBoard");
            onClose();
          }}
          className="text-left w-full rounded-md text-ink-muted body-l
            cursor-pointer transition-colors duration-150 hover:text-brand
            "
        >
          Edit Board
        </button>

        <button
          onClick={() => {
            openModal("deleteBoard");
            onClose();
          }}
          className="text-left w-full rounded-md text-danger body-l
            cursor-pointer transition-colors duration-150 hover:text-danger-hover
            "
        >
          Delete Board
        </button>
      </section>
    </>
  );
}
