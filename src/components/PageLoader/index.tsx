import "./style.css";

export default function PageLoader() {
  return (
    <div
      id="page-loader"
      className="app-panel"
    >
      <p className="header scanning-loader"></p>
      <div className="box scanning-loader">
        <p></p>
      </div>

      <p className="header scanning-loader"></p>
      <div className="box scanning-loader">
        <p></p>
      </div>
    </div>
  );
}
