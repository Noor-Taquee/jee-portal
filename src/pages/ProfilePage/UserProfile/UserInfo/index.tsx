import Avatar from "../../../../components/AccountButton/Avatar";

interface Props {
  user: {
    username: string;
    name: string;
    role: string;
    visibility: "none" | "users" | "public";
  };
}

export default function UserInfo({ user }: Props) {
  return (
    <div className="user-info">
      <Avatar name={user.name} />
      <div className="user-info-2">
        <h2 className="full-name">{user.name}</h2>
        <p className="user-role">{user.role}</p>
      </div>
    </div>
  );
}
