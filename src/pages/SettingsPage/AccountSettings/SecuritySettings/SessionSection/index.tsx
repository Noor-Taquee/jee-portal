import "./style.css";

import { USER_SESSION_TOKEN_KEY } from "../../../../../context/UserContext/Provider";
import { useFetch } from "../../../../../hooks/useFetch";
import SessionTable from "./SessionTable";

export type Session = {
  session_token: string;
  device: string;
  agent: string;
  created_at: string;
  expires_at: string;
};

export default function SessionSection() {
  const { loading, result, error } = useFetch<Session[]>(
    "/api/user/activity/sessions",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(USER_SESSION_TOKEN_KEY)}`,
      },
    }
  );

  if (loading) return <div></div>;

  if (error || !result) return <div>{["Couldn't load", error]}</div>;

  return (
    <section className="settings-section content-based">
      <div className="settings-property">
        <p>Sessions</p>
        <small>See all active sessions</small>
      </div>
      <div className="settings-value">
        <SessionTable sessions={result} />
      </div>
    </section>
  );
}
