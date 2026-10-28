import { NavLink } from "react-router-dom";
import "./style.css";

export default function PageNotFound404() {
  return (
    <div id="page-not-found-404" className="app-panel">
      <div>

      <h1>404</h1>
      <p>Page not found</p>
      </div>
      <NavLink to={"/"} className="cta-1">
        <p>Go back home</p>
      </NavLink>
    </div>
  );
}
