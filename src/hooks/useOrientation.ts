import { useEffect, useState } from "react";

type Orientation = "portrait" | "landscape";

/** Hook for device orientation */
export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>("portrait");

  useEffect(() => {
    function checkOrientation() {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      );
    }

    window.addEventListener("load", checkOrientation);
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("load", checkOrientation);
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return orientation;
}
