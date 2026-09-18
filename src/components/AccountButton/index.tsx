import "./style.css";

import { useUser } from "../../hooks/useUser";

import Avatar from "./Avatar";

export default function AccountButton() {
  const { user } = useUser();

  if (!user) return <div></div>;

  return (
    <button id="account-button">
      <Avatar />
      <p>{user?.name}</p>
    </button>
  );
}
