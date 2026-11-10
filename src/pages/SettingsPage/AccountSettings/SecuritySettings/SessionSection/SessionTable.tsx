import { useState } from "react";
import type { Session } from ".";
import SessionLogoutPopover from "./SessionLogoutPopover";

interface Props {
  sessions: Session[];
}

const SessionTable = ({ sessions }: Props) => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);


  return (
    <>
      {selectedSession && <SessionLogoutPopover sessionToken={selectedSession} />}
      <table id="sessions-table">
        <thead>
          <tr>
            <th className="device">
              <p>Device</p>
            </th>
            <th className="created-at">
              <p>Created</p>
            </th>
            <th className="expires-at">
              <p>Updated</p>
            </th>
            <th>
              <p>Action</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, i) => (
            <tr key={`${session.created_at}-${i}`}>
              <td className="device">
                <p>{`${session.agent} on ${session.device}`}</p>
              </td>
              <td className="created-at">
                <p>{session.created_at}</p>
              </td>
              <td className="expires-at">
                <p>{session.expires_at}</p>
              </td>
              <td>
                <button
                  aria-label="logout"
                  className="select-button"
                  popoverTarget="session-logout-popover"
                  onClick={() => { setSelectedSession(session.session_token) }}
                >
                  <p>logout</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SessionTable;
