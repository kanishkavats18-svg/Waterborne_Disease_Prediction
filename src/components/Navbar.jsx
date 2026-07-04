import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>
        Waterborne Disease AI
      </h2>

      <div>

        <Link to="/">Home</Link>

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

    </nav>
  );
}

export default Navbar;