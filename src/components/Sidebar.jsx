import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        💧 Water AI
      </div>

      <Link to="/">Dashboard</Link>

      <Link to="/disease">
        Disease Predictor
      </Link>

      <Link to="/risk">
        Risk Predictor
      </Link>

      <Link to="/analytics">
        Analytics
      </Link>

    </div>
  );
}

export default Sidebar;