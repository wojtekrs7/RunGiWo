import { useEffect, useMemo, useState } from "react";
import { BuildingsApi, ContractorsApi, WorkOrdersApi } from "../api/api.js";
import Modal from "../components/Modal.jsx";
import Confirm from "../components/Confirm.jsx";

function StatusBadge({ value }) {
    return <span className="badge">{value}</span>;
}

function WorkOrderForm({
                           initial,
                           buildings,
                           contractors,
                           onSubmit,
                           onCancel,
                           submitText,
                       }) {
    const [title, setTitle] = useState(initial?.title || "");
    const [description, setDescription] = useState(initial?.description || "");
    const [priority, setPriority] = useState(initial?.priority || "MEDIUM");
    const [scope, setScope] = useState(initial?.scope || "");

    const [buildingId, setBuildingId] = useState(
        initial?.buildingId ?? buildings[0]?.id ?? ""
    );
    const [contractorId, setContractorId] = useState(
        initial?.contractorId ?? ""
    );

    const [error, setError] = useState("");

    function validate() {
        if (!title.trim()) return "Tytuł jest wymagany.";
        if (!scope.trim()) return "Zakres (scope) jest wymagany.";
        if (!buildingId) return "Budynek jest wymagany.";
        if (!contractorId) return "Firma jest wymagana.";
        return "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        setError("");

        await onSubmit({
            title: title.trim(),
            description: description.trim() || null,
            priority,              // enum: LOW/MEDIUM/HIGH
            scope,                 // wymagany przez backend
            buildingId: Number(buildingId),
            contractorId: Number(contractorId),
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert">{error}</div>}

            <div className="row">
                <div className="field">
                    <div className="label">Tytuł</div>
                    <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="field">
                    <div className="label">Zakres (scope)</div>
                    <input className="input" value={scope} onChange={(e) => setScope(e.target.value)} />
                </div>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
                <div className="field">
                    <div className="label">Budynek</div>
                    <select className="select" value={buildingId} onChange={(e) => setBuildingId(e.target.value)}>
                        {buildings.map((b) => (
                            <option key={b.id} value={b.id}>
                                #{b.id} — {b.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field">
                    <div className="label">Firma</div>
                    <select className="select" value={contractorId} onChange={(e) => setContractorId(e.target.value)}>
                        <option value="">— wybierz —</option>
                        {contractors.map((c) => (
                            <option key={c.id} value={c.id}>
                                #{c.id} — {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
                <div className="field">
                    <div className="label">Priorytet</div>
                    <select className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>

                <div className="field">
                    <div className="label">Opis</div>
                    <textarea
                        className="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="modalFooter">
                <button type="button" className="btn" onClick={onCancel}>Anuluj</button>
                <button type="submit" className="btn btnPrimary">{submitText}</button>
            </div>
        </form>
    );
}

export default function WorkOrders() {
    const [orders, setOrders] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [contractors, setContractors] = useState([]);

    const [selectedBuildingId, setSelectedBuildingId] = useState("");
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [confirmItem, setConfirmItem] = useState(null);

    const kpis = useMemo(() => ({
        total: orders.length,
        done: orders.filter((o) => o.status === "DONE").length,
        inProgress: orders.filter((o) => o.status === "IN_PROGRESS").length,
    }), [orders]);

    async function loadBasics() {
        const [b, c] = await Promise.all([
            BuildingsApi.list(),
            ContractorsApi.list(),
        ]);
        setBuildings(b);
        setContractors(c);
        if (!selectedBuildingId && b.length > 0) setSelectedBuildingId(String(b[0].id));
    }

    async function loadOrders(bid) {
        if (!bid) return;
        setLoading(true);
        try {
            const data = await WorkOrdersApi.listByBuilding(bid);
            setOrders(data);
        } catch (e) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBasics();
    }, []);

    useEffect(() => {
        loadOrders(selectedBuildingId);
    }, [selectedBuildingId]);

    async function handleCreate(payload) {
        await WorkOrdersApi.createForBuilding(payload.buildingId, payload);
        setCreateOpen(false);
        loadOrders(String(payload.buildingId));
    }

    async function handleEditSave(payload) {
        await WorkOrdersApi.update(editItem.id, payload);
        setEditItem(null);
        loadOrders(selectedBuildingId);
    }

    async function handleDelete(id) {
        await WorkOrdersApi.remove(id);
        setConfirmItem(null);
        loadOrders(selectedBuildingId);
    }

    return (
        <>
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Zlecenia</h1>
                    <p className="pageSubtitle">CRUD zleceń przypisanych do budynku</p>
                </div>
                <button className="btn btnPrimary" onClick={() => setCreateOpen(true)}>
                    + Dodaj zlecenie
                </button>
            </div>

            <div className="kpiRow">
                <div className="card kpi"><p className="kpiLabel">Wszystkie</p><p className="kpiValue">{kpis.total}</p></div>
                <div className="card kpi"><p className="kpiLabel">W trakcie</p><p className="kpiValue">{kpis.inProgress}</p></div>
                <div className="card kpi"><p className="kpiLabel">Zakończone</p><p className="kpiValue">{kpis.done}</p></div>
            </div>

            <div className="card">
                <div className="cardBody">
                    <div className="toolbar">
                        <select className="select" value={selectedBuildingId} onChange={(e) => setSelectedBuildingId(e.target.value)}>
                            {buildings.map((b) => (
                                <option key={b.id} value={b.id}>
                                    #{b.id} — {b.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {err && <div className="alert">{err}</div>}

                    {loading ? (
                        <div className="muted">Ładowanie…</div>
                    ) : (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tytuł</th>
                                <th>Status</th>
                                <th>Priorytet</th>
                                <th>Firma</th>
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((o) => (
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{o.title}</td>
                                    <td><StatusBadge value={o.status} /></td>
                                    <td>{o.priority}</td>
                                    <td>{o.contractorName || `#${o.contractorId}`}</td>
                                    <td>
                                        <button className="btn btnSmall" onClick={() => setEditItem(o)}>Edytuj</button>
                                        <button className="btn btnSmall btnDanger" onClick={() => setConfirmItem(o)}>Usuń</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {createOpen && (
                <Modal title="Dodaj zlecenie" onClose={() => setCreateOpen(false)}>
                    <WorkOrderForm
                        buildings={buildings}
                        contractors={contractors}
                        onSubmit={handleCreate}
                        onCancel={() => setCreateOpen(false)}
                        submitText="Dodaj"
                    />
                </Modal>
            )}

            {editItem && (
                <Modal title={`Edytuj zlecenie #${editItem.id}`} onClose={() => setEditItem(null)}>
                    <WorkOrderForm
                        initial={editItem}
                        buildings={buildings}
                        contractors={contractors}
                        onSubmit={handleEditSave}
                        onCancel={() => setEditItem(null)}
                        submitText="Zapisz"
                    />
                </Modal>
            )}

            {confirmItem && (
                <Confirm
                    title="Usuń zlecenie"
                    message={`Czy na pewno usunąć "${confirmItem.title}"?`}
                    onCancel={() => setConfirmItem(null)}
                    onConfirm={() => handleDelete(confirmItem.id)}
                />
            )}
        </>
    );
}
