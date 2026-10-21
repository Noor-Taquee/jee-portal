import "@clerk/types";

declare global {
  interface UserPublicMetadata {
    role: "admin" | "maintainer" | "user";
  }
}
