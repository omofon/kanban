export default function ErrorModal({ message }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-6"
      onClick={onClose}
    >
      {/* Modal */}
      <article
        className="bg-surface rounded-lg w-fit p-6 md:p-8 shadow-lg flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="body-m text-danger">{message}</span>
      </article>
    </div>
  );
}
