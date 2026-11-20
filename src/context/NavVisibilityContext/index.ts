import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type NavVisibilityContextValue = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const NavVisibilityContext = createContext<NavVisibilityContextValue | null>(
  null
);

export default NavVisibilityContext;
