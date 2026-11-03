import { useState } from "react";
import type { PropsWithChildren } from "react";

import NavVisibilityContext from ".";

export default function NavVisibilityProvider({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(true);

  return (
    <NavVisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </NavVisibilityContext.Provider>
  );
}
