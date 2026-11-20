import { useEffect } from "react";

export function useClosePopover(id: string) {
  useEffect(() => {
    const popover = document.getElementById(id);
    if (!popover) return;

    const clickables = popover.querySelectorAll<
      HTMLButtonElement | HTMLAnchorElement
    >(".popover-entry:not(.linked)");

    const clickHandler = () => {
      if (typeof popover.hidePopover === "function") {
        popover.hidePopover();
      }
    };

    clickables.forEach((clickable) => {
      clickable.addEventListener("click", clickHandler);
    });

    return () => {
      clickables.forEach((clickable) => {
        clickable.removeEventListener("click", clickHandler);
      });
    };
  }, [id]);
}
