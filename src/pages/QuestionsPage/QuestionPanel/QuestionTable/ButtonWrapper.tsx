import ActionBtn from "../../../../components/ActionBtn";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface ButtonWrapperProps {
  page: 1 | 2 | 3;
  setPage: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

export default function ButtonWrapper({ page, setPage }: ButtonWrapperProps) {
  return (
    <div id="q-t-button-wrapper">
      <ActionBtn
        title="To previous pane"
        className={page === 1 ? "disabled" : ""}
        onClick={() => {
          if (page === 1) return;
          const p = (page - 1) as 1 | 2 | 3;
          setPage(p);
        }}
      >
        <ChevronsLeft />
        <p>{"Previous"}</p>
      </ActionBtn>

      <ActionBtn
        title="To Next pane"
        className={page === 3 ? "disabled" : ""}
        onClick={() => {
          if (page === 3) return;
          const p = (page + 1) as 1 | 2 | 3;
          setPage(p);
        }}
      >
        <ChevronsRight />
        <p>{"Next"}</p>
      </ActionBtn>
    </div>
  );
}
