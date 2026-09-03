interface UsernameInputProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function UsernameInput({
  username,
  setUsername,
}: UsernameInputProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setUsername(e.target.value);
  }

  return (
    <div
      id="username"
      className="input-div"
    >
      <i className="ph-fill ph-user leading"></i>
      <input
        type="text"
        name="username"
        id="username"
        autoComplete="off"
        value={username}
        placeholder={"Noor Taquee"}
        onChange={onChange}
      />
    </div>
  );
}
