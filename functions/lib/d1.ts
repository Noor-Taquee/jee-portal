export type D1Env = {
  d1: D1Database;
};

/**
 * Represents a row in the "users" table of the D1 database.
 */
export type UsersTableRow = {
  id: number;
  name: string;
  username: string;
  password: string;
  role: "admin" | "student" | "maintainer";
  session_token: string | null;
  session_created_at: number | null;
  session_expires_at: number | null;
};
