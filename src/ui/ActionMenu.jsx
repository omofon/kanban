import { useBoard } from "../context/BoardContext";

export default function ActionMenu({ isOpen, onClose }) {
  const {} = useBoard();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Menu */}
      <section className="fixed top-20 md:top-24 lg:top-28 right-6 w-48 bg-surface rounded-lg z-50 shadow-lg p-4 space-y-4">
        <button
          onClick={() => {
            // function to open edit board modal
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
            // function to open delete board modal
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
