import ActionBtn from "../../../components/ActionBtn";
import { useExamSession } from "../../../hooks/useExamSession";
import { changeHash } from "../../../hooks/useHash";

export default function SubmitButton() {
  const examSession = useExamSession();

  return (
    <ActionBtn
      title="End test and submit response"
      className="submit-btn"
      onClick={() => {
        examSession.setCompletedAt(new Date());
        changeHash("result");
      }}
    >
      <p>Submit</p>
    </ActionBtn>
  );
}
