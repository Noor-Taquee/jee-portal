import "./style.css";

import { useUser } from "../../hooks/useUser";

import type { ComponentPropsWithoutRef } from "react";

import Avatar from "./Avatar";

type Props = ComponentPropsWithoutRef<"button">;

export default function AccountButton({ ...props }: Props) {
  const { user } = useUser();

  if (!user) return <div></div>;

  return (
    <button
      id="account-button"
      {...props}
    >
      <Avatar />
      <p>{user?.name}</p>
    </button>
  );
}
