import { useNavigate } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

interface HeaderProps {
  branchName?: string;
}

/**
 * Top bar of the UI shell. Stays mounted across every route inside the
 * app — only the content in <Layout>'s <Outlet /> changes.
 */
export default function Header({ branchName = "Main Branch" }: HeaderProps) {
  const { cashierName, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const displayName = cashierName ?? "Cashier";

  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-logo-mark">P</div>
        <span className="header-logo-text">POS</span>
      </div>

      <div className="header-actions">
        <button className="header-branch-btn" type="button">
          {branchName}
          <ChevronDown size={14} />
        </button>

        <div className="header-user">
          <div className="header-avatar">
            {displayName.slice(0, 2).toUpperCase()}
          </div>
          <span className="header-user-name">{displayName}</span>
        </div>

        <button className="header-logout" type="button" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
