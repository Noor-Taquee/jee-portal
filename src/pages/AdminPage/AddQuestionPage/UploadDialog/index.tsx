// oxlint-disable max-lines-per-function
import "./style.css";

import { useEffect, useRef, useState } from "react";

import type { ReviewQuestion } from "..";
import { USER_SESSION_TOKEN_KEY } from "../../../../context/UserContext/Provider";

import ReviewDialog from "./ReviewDialog";
import SuccessDialog from "./SuccessDialog";
import FailureDialog from "./FailureDialog";
import LoadingDialog from "./LoadingDialog";

interface Props {
  question: ReviewQuestion | null;
  uploadDialog: boolean;
  setUploadDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UploadDialog({
  question,
  uploadDialog: uploadDialog,
  setUploadDialog: setUploadDialog,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [failure, setFailure] = useState<
    false | { message: string; cause?: string }
  >(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (uploadDialog) {
      if (!el.open) {
        el.showModal();
      }
    } else if (el.open) {
      el.close();
    }
  }, [uploadDialog]);

  const discard = () => {
    setUploadDialog(false);
    setLoading(false);
    setSuccess(false);
    setFailure(false);
  };

  const handleUpload = () => {
    if (!question) return;

    setLoading(true);
    setFailure(false);
    setSuccess(false);

    fetch("/api/jee/uploadQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(USER_SESSION_TOKEN_KEY)}`,
      },
      body: JSON.stringify({ question }),
    })
      .then(async (response) => {
        const data: {
          success?: boolean;
          error?: string;
          cause?: string;
        } = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error, { cause: data.cause });
        } else {
          setSuccess(true);
        }
      })
      .catch((error: { message: string; cause: string }) => {
        setFailure({
          message: error.message ?? "Couldn't upload question",
          cause: error.cause,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <dialog
      id="upload-popover"
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
      }}
    >
      {!loading && !success && !failure && (
        <ReviewDialog
          handleUpload={handleUpload}
          discard={discard}
        />
      )}
      {loading && <LoadingDialog />}
      {success && <SuccessDialog discard={discard} />}
      {failure && (
        <FailureDialog
          failure={failure}
          handleUpload={handleUpload}
          discard={discard}
        />
      )}
    </dialog>
  );
}
