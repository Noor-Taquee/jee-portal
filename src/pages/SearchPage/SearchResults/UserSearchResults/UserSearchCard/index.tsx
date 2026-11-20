import "./style.css";

import { useNavigate } from "react-router-dom";
import Avatar from "../../../../../components/Avatar";

interface Props {
  searchUser: {
    username: string;
    name: string;
    role: string;
    visibility: "all" | "users" | "none";
  };
}

export default function UserSearchCard({ searchUser }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="user-search-card"
      onClick={() => {
        navigate(`/user/${encodeURIComponent(searchUser.username)}`);
      }}
    >
      <Avatar name={searchUser.name} />
      <div className="info">
        <strong className="full-name">{searchUser.name}</strong>
        <p className="username">
          @{searchUser.username}
          <span className="user-role">{searchUser.role}</span>
        </p>
      </div>
    </div>
  );
}
