import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

import NavVisibilityContext from ".";

type NavVisibilityProviderProps = PropsWithChildren<{
  pathname: string;
  isMobile: boolean;
}>;

export default function NavVisibilityProvider({
  children,
  pathname,
  isMobile,
}: NavVisibilityProviderProps) {
  const [visible, setVisible] = useState(true);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (pathname === previousPathname) return;

    // oxlint-disable-next-line react/set-state-in-effect
    setPreviousPathname(pathname);
    if (isMobile) setVisible(false);
  }, [isMobile, pathname, previousPathname]);

  return (
    <NavVisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </NavVisibilityContext.Provider>
  );
}
