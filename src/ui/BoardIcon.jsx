export default function BoardIcon({ active, create }) {
  const color = active ? "white" : create ? "currentColor" : "currentColor";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H5.11A2.889 2.889 0 0 1 8 2.889V5.11A2.889 2.889 0 0 1 5.11 8H2.89A2.889 2.889 0 0 1 0 5.11V2.89ZM8 2.889A2.889 2.889 0 0 1 10.889 0H13.11A2.889 2.889 0 0 1 16 2.889V5.11A2.889 2.889 0 0 1 13.111 8H10.89A2.889 2.889 0 0 1 8 5.11V2.89ZM0 10.889A2.889 2.889 0 0 1 2.889 8H5.11A2.889 2.889 0 0 1 8 10.889V13.11A2.889 2.889 0 0 1 5.11 16H2.89A2.889 2.889 0 0 1 0 13.11V10.89ZM8 10.889A2.889 2.889 0 0 1 10.889 8H13.11A2.889 2.889 0 0 1 16 10.889V13.11A2.889 2.889 0 0 1 13.111 16H10.89A2.889 2.889 0 0 1 8 13.11V10.89Z"
        fill={color}
        opacity={active ? 1 : 0.75}
      />
    </svg>
  );
}
