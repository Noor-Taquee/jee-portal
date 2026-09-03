import "./style.css";

interface VerticalTableProps {
  id?: string;
  children?: React.ReactNode;
}

export default function VerticalTable({ id, children }: VerticalTableProps) {
  return (
    <div
      className="vertical-table"
      id={id}
    >
      {children}
    </div>
  );
}
