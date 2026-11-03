import { useContext } from "react";

import NavVisibilityContext from "../context/NavVisibilityContext";

export default function useNavVisibility() {
  const context = useContext(NavVisibilityContext);

  if (!context) {
    throw new Error(
      "useNavVisibility must be used within NavVisibilityProvider"
    );
  }

  return context;
}
