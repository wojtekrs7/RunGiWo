import { useEffect, useState } from "react";

export default function WorkOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const buildingId = 1;

    useEffect(() => {
        fetch(`/buildings/${buildingId}/work-orders`)
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`HTTP ${res.status} ${text ? "- " + text : ""}`);
                }
                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("API nie zwróciło listy");
                setOrders(data);
            })
            .catch((e) => setError(e.message));
    }, []);

    if (error) return <div style={{ color: "red" }}>Błąd: {error}</div>;

    return (
        <>
            <h2>Zlecenia (budynek #{buildingId})</h2>
            <ul>
                {orders.map((o) => (
                    <li key={o.id}>
                        {o.title} – {o.status}
                    </li>
                ))}
            </ul>
        </>
    );
}
