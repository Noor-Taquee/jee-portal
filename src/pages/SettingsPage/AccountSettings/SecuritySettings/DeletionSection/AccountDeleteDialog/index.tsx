import "./style.css";

import { useEffect, useRef } from "react";
import DeletionDisclaimer from "./DeletionDisclaimer";

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
  setIsDeleteing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountDeleteDialog = ({
  dialogOpen,
  setDialogOpen,
  isDeleting,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [dialogOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if (!isDeleting) {
        setDialogOpen(false);
      }
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [isDeleting, setDialogOpen]);

  return (
    <dialog
      ref={dialogRef}
      id="account-delete-popover"
    >
      <DeletionDisclaimer />
      <div className="action">
        <button
          type="button"
          className="cta-1 fill"
        >
          <p>Confirm Delete</p>
        </button>
        <button
          type="button"
          className="cta-1 fill"
          onClick={() => setDialogOpen(false)}
        >
          <p>Cancel</p>
        </button>
      </div>
    </dialog>
  );
};

export default AccountDeleteDialog;
