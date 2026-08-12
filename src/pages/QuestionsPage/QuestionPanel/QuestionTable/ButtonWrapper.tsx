interface ButtonWrapperProps {
  page: 1 | 2 | 3;
  setPage: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

export default function ButtonWrapper({ page, setPage }: ButtonWrapperProps) {
  return (
    <div id="q-t-button-wrapper">
      <button
        onClick={() => {
          if (page === 1) return;
          const p = (page - 1) as 1 | 2 | 3;
          setPage(p);
        }}
      >
        <i
          className={`ph-bold ph-caret-left ${page === 1 ? "unavailable" : ""}`}
        ></i>
        <p>Previous</p>
      </button>

      <button
        onClick={() => {
          if (page === 3) return;
          const p = (page + 1) as 1 | 2 | 3;
          setPage(p);
        }}
      >
        <i
          className={`ph-bold ph-caret-right ${page === 3 ? "unavailable" : ""}`}
        ></i>
        <p>Next</p>
      </button>
    </div>
  );
}
