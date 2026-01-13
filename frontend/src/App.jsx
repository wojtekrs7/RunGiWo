import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Buildings from "./pages/Buildings";
import Contractors from "./pages/Contractors";
import WorkOrders from "./pages/WorkOrders";

export default function App() {
    return (
        <BrowserRouter>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <nav style={{ width: 220, padding: 20, background: "#eee" }}>
                    <h3>RunGiWo</h3>
                    <ul>
                        <li><Link to="/buildings">Budynki</Link></li>
                        <li><Link to="/contractors">Firmy</Link></li>
                        <li><Link to="/work-orders">Zlecenia</Link></li>
                    </ul>
                </nav>

                <main style={{ flex: 1, padding: 20 }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/buildings" replace />} />
                        <Route path="/buildings" element={<Buildings />} />
                        <Route path="/contractors" element={<Contractors />} />
                        <Route path="/work-orders" element={<WorkOrders />} />
                        <Route path="*" element={<div>Nie znaleziono strony</div>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
