export interface D1Env {
  DB: D1Database;
}

export type UsersTableRow = {
  id: number;
  name: string;
  username: string;
  password: string;
  role: "admin" | "student" | "maintainer";
  visibility: "all" | "users" | "none";
};

export type SessionsTableRow = {
  /**  FOREIGN KEY referencing the "id" column in the "users" table. */
  user_id: number;

  /** The session token. */
  session_token: string | null;

  /**
   * The timestamp when the session was created.
   * ISO 8601 formatted timestamp `YYYY-MM-DD HH:MM:SS.SSS`
   * @example "2023-08-15 12:34:56.789"
   */
  created_at: string | null;

  /**
   * The timestamp when the active session expires.
   * ISO 8601 formatted timestamp `YYYY-MM-DD HH:MM:SS.SSS`
   * @example "2023-08-15 12:34:56.789"
   */
  expires_at: string | null;

  /** The device from which the session was created. */
  device: string | null;

  /** The user agent string of the browser or client. */
  agent: string | null;
};
