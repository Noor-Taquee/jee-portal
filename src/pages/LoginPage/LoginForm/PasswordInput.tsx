import { KeyboardIcon, LockKeyhole } from "lucide-react";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PaswwordInput({
  password,
  setPassword,
  setKeyboard,
}: PasswordInputProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <div
      id="password"
      className="input-div"
    >
      <span className="icon-holder leading">
        <LockKeyhole />
      </span>
      <input
        type="text"
        name="password"
        id="password"
        autoComplete="off"
        value={password}
        placeholder={"01/01/2001"}
        onChange={onChange}
      />
      <span
        className="icon-holder trailing"
        onClick={() => {
          setKeyboard((p) => !p);
        }}
      >
        <KeyboardIcon />
      </span>
    </div>
  );
}
