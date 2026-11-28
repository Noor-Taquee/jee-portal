import { useState } from "react";
import AccountDeleteDialog from "./AccountDeleteDialog";

const DeletionSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleteing, setIsDeleting] = useState(false);

  return (
    <section className="settings-section value-based">
      <div className="settings-property">
        <p>Account Deletion</p>
        <small>Permanently delete your account</small>
      </div>

      <div className="settings-value">
        <button
          aria-label="Delete"
          className="cta-1 danger"
          onClick={() => setDialogOpen(true)}
        >
          <span>Delete</span>
        </button>
      </div>

      <AccountDeleteDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        isDeleting={isDeleteing}
        setIsDeleteing={setIsDeleting}
      />
    </section>
  );
};

export default DeletionSection;
