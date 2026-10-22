import { Activity } from "react";

interface Props {
  /** Determines whether to show the children or the fallback */
  show: boolean;

  /** The fallback content to display when `show` is false */
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/** Component that conditionally renders its children based on the `show` prop */
export default function ConditionalComponent({
  show,
  fallback,
  children,
}: Props) {
  return (
    <>
      {!show && fallback}
      <Activity mode={show ? "visible" : "hidden"}>{children}</Activity>
    </>
  );
}
