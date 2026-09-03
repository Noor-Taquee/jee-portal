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
      <i className="ph-fill ph-lock leading"></i>
      <input
        type="text"
        name="password"
        id="password"
        autoComplete="off"
        value={password}
        placeholder={"01/01/2001"}
        onChange={onChange}
      />
      <i
        className="ph-fill ph-keyboard trailing"
        onClick={() => {
          setKeyboard((p) => !p);
        }}
      ></i>
    </div>
  );
}
