import { useUser } from "../../../hooks/useUser";

import { UserIcon } from "lucide-react";

interface UsernameInputProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function UsernameInput({
  username,
  setUsername,
}: UsernameInputProps) {
  const { user } = useUser();

  function onChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setUsername(e.target.value);
  }

  return (
    <div
      id="username"
      className="input-div"
    >
      <span className="icon-holder leading">
        <UserIcon />
      </span>
      <input
        type="text"
        name="username"
        id="username"
        autoComplete="off"
        value={username}
        placeholder={user?.name}
        onChange={onChange}
      />
    </div>
  );
}
