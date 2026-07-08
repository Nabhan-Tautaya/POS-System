import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

/**
 * The UI shell itself: Header + Sidebar stay mounted, and whichever
 * route matched renders into <Outlet />. Every authenticated page is
 * nested under the <Layout /> route in App.tsx, so it automatically
 * gets the shell for free — no page has to re-import Header/Sidebar.
 */
export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
