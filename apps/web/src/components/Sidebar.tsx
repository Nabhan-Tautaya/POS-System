import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  Clock,
  BarChart3,
  Settings,
} from "lucide-react";
import "../styles/Sidebar.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/sales", label: "Sales", icon: ShoppingCart },
  { to: "/products", label: "Products", icon: Package },
  { to: "/registers", label: "Registers", icon: Wallet },
  { to: "/shifts", label: "Shifts", icon: Clock },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

/**
 * Left navigation. Part of the shell — mounted once, never unmounted
 * as the user moves between pages.
 */
export default function Sidebar() {
  return (
    <aside className="sidebar">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            <Icon size={17} />
            {item.label}
          </NavLink>
        );
      })}
    </aside>
  );
}
