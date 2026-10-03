import "./style.css";

import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"div">;

export default function InputBox({ className, children }: Props) {
  return <div className={`input-box ${className}`}>{children}</div>;
}
