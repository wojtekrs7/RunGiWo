import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import "./App.css";

import Buildings from "./pages/Buildings.jsx";
import Contractors from "./pages/Contractors.jsx";
import WorkOrders from "./pages/WorkOrders.jsx";

function LinkItem({ to, label, icon }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")}
            end
        >
            <span aria-hidden="true">{icon}</span>
            <span>{label}</span>
        </NavLink>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="appShell">
                <aside className="sidebar">
                    <div className="brand">
                        <div className="brandLogo" />
                        <div>
                            <div className="brandTitle">RunGiWo</div>
                            <div className="muted">Zarządzanie budynkami i zleceniami</div>
                        </div>
                    </div>

                    <nav className="nav">
                        <LinkItem to="/buildings" label="Budynki" icon="🏢" />
                        <LinkItem to="/contractors" label="Firmy" icon="🧰" />
                        <LinkItem to="/work-orders" label="Zlecenia" icon="📝" />
                    </nav>

                    <div className="sidebarFooter">
                        Dev: Vite (5173) → API proxy → Spring Boot
                    </div>
                </aside>

                <main className="content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/buildings" replace />} />
                        <Route path="/buildings" element={<Buildings />} />
                        <Route path="/contractors" element={<Contractors />} />
                        <Route path="/work-orders" element={<WorkOrders />} />
                        <Route path="*" element={<div className="alert">Nie znaleziono strony</div>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
