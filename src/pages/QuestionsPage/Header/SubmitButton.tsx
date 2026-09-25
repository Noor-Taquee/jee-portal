import ActionBtn from "../../../components/ActionBtn";

interface Props {
  submitExam: () => void;
}

export default function SubmitButton({ submitExam }: Props) {
  return (
    <ActionBtn
      title="End test and submit response"
      className="submit-btn"
      onClick={submitExam}
    >
      <p>Submit</p>
    </ActionBtn>
  );
}
