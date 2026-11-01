import { useEffect, useState } from "react";

type Orientation = "portrait" | "landscape";

function checkOrientation(): Orientation {
  return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
}

/**
 * Hook for device orientation
 * | horizontal | vertical|
 * | :-------: | :------: |
 * | landscape | portrait |
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>(checkOrientation());

  useEffect(() => {
    function updateOrientation() {
      setOrientation(checkOrientation());
    }

    window.addEventListener("load", updateOrientation);
    window.addEventListener("resize", updateOrientation);

    return () => {
      window.removeEventListener("load", updateOrientation);
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return orientation;
}
