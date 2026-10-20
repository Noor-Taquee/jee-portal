// oxlint-disable max-lines-per-function
import "./style.css";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/react";

import type { ReviewQuestion } from "..";

import ReviewDialogue from "./ReviewDialogue";
import SuccessDialogue from "./SuccessDialoge";
import FailureDialogue from "./FailureDialogue";
import LoadingDialogue from "./LoadingDialogue";

interface Props {
  question: ReviewQuestion | null;
  uploadDialogue: boolean;
  setUploadDialogue: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UploadDialogue({
  question,
  uploadDialogue,
  setUploadDialogue,
}: Props) {
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [failure, setFailure] = useState<
    false | { message: string; cause?: string }
  >(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (uploadDialogue) {
      if (!el.open) {
        el.showModal();
      }
    } else if (el.open) {
      el.close();
    }
  }, [uploadDialogue]);

  const discard = () => {
    setUploadDialogue(false);
    setLoading(false);
    setSuccess(false);
    setFailure(false);
  };

  const handleUpload = async () => {
    if (!question) return;

    const token = await getToken();

    setLoading(true);
    setFailure(false);
    setSuccess(false);

    fetch("/api/jee/uploadQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        <ReviewDialogue
          handleUpload={handleUpload}
          discard={discard}
        />
      )}
      {loading && <LoadingDialogue />}
      {success && <SuccessDialogue discard={discard} />}
      {failure && (
        <FailureDialogue
          failure={failure}
          handleUpload={handleUpload}
          discard={discard}
        />
      )}
    </dialog>
  );
}
