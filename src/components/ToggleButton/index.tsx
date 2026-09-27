import "./style.css";

import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export default function ToggleButton({ className, children, ...props }: Props) {
  return (
    <button
      className={`toggle-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
