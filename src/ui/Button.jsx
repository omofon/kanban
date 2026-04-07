// components/ui/Button.jsx
const variants = {
  primary: "bg-brand hover:bg-brand-hover text-ink-white",
  secondary: "bg-brand-subtle hover:bg-brand-hover/20 text-brand",
  destructive: "bg-danger hover:bg-danger-hover text-ink-white",
};

const sizes = {
  L: "px-6 py-4 text-[15px]",
  S: "px-4 py-2 text-[13px]",
  XS: "px-4.5 py-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "L",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full font-bold cursor-pointer
        flex items-center justify-center gap-1
        transition-colors duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
