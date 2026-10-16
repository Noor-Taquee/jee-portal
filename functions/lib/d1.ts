export interface D1Env {
  DB: D1Database;
}

/**
 * Represents a row in the "users" table of the D1 database.
 */
export type UsersTableRow = {
  id: number;
  name: string;
  username: string;
  password: string;

  role: "admin" | "student" | "maintainer";

  /**
   * The session token associated with the user.
   */
  session_token: string | null;

  /**
   * The timestamp when the session was created.
   * ISO 8601 formatted timestamp `YYYY-MM-DD HH:MM:SS.SSS`
   * @example "2023-08-15 12:34:56.789"
   */
  session_created_at: string | null;

  /**
   * The timestamp when the active session expires.
   * ISO 8601 formatted timestamp `YYYY-MM-DD HH:MM:SS.SSS`
   * @example "2023-08-15 12:34:56.789"
   */
  session_expires_at: string | null;
};
