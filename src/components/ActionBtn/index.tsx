import "./style.css";

import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

/** Basic horizontal button. */
export default function ActionBtn({ className, children, ...props }: Props) {
  return (
    <button
      className={`action-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
