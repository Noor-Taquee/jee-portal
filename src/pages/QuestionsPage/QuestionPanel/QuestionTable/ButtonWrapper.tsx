import ActionBtn from "../../../../components/ActionBtn";

interface ButtonWrapperProps {
  page: 1 | 2 | 3;
  setPage: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

export default function ButtonWrapper({ page, setPage }: ButtonWrapperProps) {
  return (
    <div id="q-t-button-wrapper">
      <ActionBtn
        className={page === 1 ? "disabled" : ""}
        onClick={() => {
          if (page === 1) return;
          const p = (page - 1) as 1 | 2 | 3;
          setPage(p);
        }}
      >
        <i className={"ph-bold ph-caret-left"}></i>
        <p>{"Previous"}</p>
      </ActionBtn>

      <ActionBtn
        className={page === 3 ? "disabled" : ""}
        onClick={() => {
          if (page === 3) return;
          const p = (page + 1) as 1 | 2 | 3;
          setPage(p);
        }}
      >
        <i className={"ph-bold ph-caret-right"}></i>
        <p>{"Next"}</p>
      </ActionBtn>
    </div>
  );
}
