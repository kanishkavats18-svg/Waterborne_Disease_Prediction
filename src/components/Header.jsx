import { FaDroplet } from "react-icons/fa6";

function Header({ title, subtitle }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="status-chip">
        <FaDroplet />
        <span>AI Model Online</span>
      </div>
    </div>
  );
}

export default Header;