import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { JSX } from "react/jsx-runtime";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import Registers from "./pages/Registers";
import Shifts from "./pages/Shifts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import "./styles/global.css";

/** Blocks access to the shell until someone has logged in. */
function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Outside the shell — no header/sidebar here */}
      <Route path="/login" element={<Login />} />

      {/* Everything nested here renders inside <Layout />'s <Outlet />,
          and is gated behind RequireAuth so hitting /dashboard,
          /products, etc. directly while logged out bounces to /login. */}
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/products" element={<Products />} />
        <Route path="/registers" element={<Registers />} />
        <Route path="/shifts" element={<Shifts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
