import { useEffect, useMemo, useState } from "react";
import { BuildingsApi } from "../api/api.js";
import Modal from "../components/Modal.jsx";
import Confirm from "../components/Confirm.jsx";

function BuildingForm({ initial, onSubmit, onCancel, submitText }) {
    const [name, setName] = useState(initial?.name || "");
    const [address, setAddress] = useState(initial?.address || "");
    const [error, setError] = useState("");

    function validate() {
        if (!name.trim()) return "Nazwa jest wymagana.";
        if (!address.trim()) return "Adres jest wymagany.";
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
        await onSubmit({ name: name.trim(), address: address.trim() });
    }

    return (
        <form onSubmit={handleSubmit}>
            {error ? <div className="alert" style={{ marginBottom: 12 }}>{error}</div> : null}

            <div className="row">
                <div className="field">
                    <div className="label">Nazwa</div>
                    <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                    <div className="label">Adres</div>
                    <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
            </div>

            <div className="modalFooter">
                <button type="button" className="btn" onClick={onCancel}>
                    Anuluj
                </button>
                <button type="submit" className="btn btnPrimary">
                    {submitText}
                </button>
            </div>
        </form>
    );
}

export default function Buildings() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [confirmItem, setConfirmItem] = useState(null);

    const total = items.length;

    async function load() {
        setLoading(true);
        setErr("");
        try {
            const data = await BuildingsApi.list();
            setItems(Array.isArray(data) ? data : []);
        } catch (e) {
            setErr(e.message || "Błąd ładowania");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const kpis = useMemo(() => {
        return {
            total,
        };
    }, [total]);

    async function handleCreate(payload) {
        try {
            await BuildingsApi.create(payload);
            setCreateOpen(false);
            await load();
        } catch (e) {
            alert(`Nie udało się dodać budynku: ${e.message}`);
        }
    }

    async function handleEditSave(payload) {
        try {
            await BuildingsApi.update(editItem.id, payload);
            setEditItem(null);
            await load();
        } catch (e) {
            alert(`Nie udało się zapisać zmian: ${e.message}`);
        }
    }

    async function handleDelete(id) {
        try {
            await BuildingsApi.remove(id);
            setConfirmItem(null);
            await load();
        } catch (e) {
            alert(`Nie udało się usunąć: ${e.message}`);
        }
    }

    return (
        <>
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Budynki</h1>
                    <p className="pageSubtitle">Dodawanie, edycja i usuwanie budynków.</p>
                </div>
                <div>
                    <button className="btn btnPrimary" onClick={() => setCreateOpen(true)}>
                        + Dodaj budynek
                    </button>
                </div>
            </div>

            <div className="kpiRow">
                <div className="card kpi">
                    <p className="kpiLabel">Liczba budynków</p>
                    <p className="kpiValue">{kpis.total}</p>
                </div>
                <div className="card kpi">
                    <p className="kpiLabel">Status</p>
                    <p className="kpiValue">{loading ? "Ładowanie…" : err ? "Błąd" : "OK"}</p>
                </div>
                <div className="card kpi">
                    <p className="kpiLabel">Wskazówka</p>
                    <p className="kpiValue">CRUD</p>
                </div>
            </div>

            <div className="card">
                <div className="cardBody">
                    {err ? <div className="alert" style={{ marginBottom: 12 }}>{err}</div> : null}
                    {loading ? (
                        <div className="muted">Ładowanie listy budynków…</div>
                    ) : (
                        <div className="tableWrap">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{ width: 80 }}>ID</th>
                                    <th>Nazwa</th>
                                    <th>Adres</th>
                                    <th style={{ width: 220, textAlign: "right" }}>Akcje</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((b) => (
                                    <tr key={b.id}>
                                        <td>{b.id}</td>
                                        <td><b>{b.name}</b></td>
                                        <td>{b.address}</td>
                                        <td>
                                            <div className="rightActions">
                                                <button className="btn btnSmall" onClick={() => setEditItem(b)}>
                                                    Edytuj
                                                </button>
                                                <button className="btn btnSmall btnDanger" onClick={() => setConfirmItem(b)}>
                                                    Usuń
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="muted">
                                            Brak budynków. Dodaj pierwszy.
                                        </td>
                                    </tr>
                                ) : null}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {createOpen ? (
                <Modal title="Dodaj budynek" onClose={() => setCreateOpen(false)}>
                    <BuildingForm
                        initial={{ name: "", address: "" }}
                        onSubmit={handleCreate}
                        onCancel={() => setCreateOpen(false)}
                        submitText="Dodaj"
                    />
                </Modal>
            ) : null}

            {editItem ? (
                <Modal title={`Edytuj budynek #${editItem.id}`} onClose={() => setEditItem(null)}>
                    <BuildingForm
                        initial={editItem}
                        onSubmit={handleEditSave}
                        onCancel={() => setEditItem(null)}
                        submitText="Zapisz"
                    />
                </Modal>
            ) : null}

            {confirmItem ? (
                <Confirm
                    title="Potwierdź usunięcie"
                    message={`Czy na pewno usunąć budynek "${confirmItem.name}"?`}
                    onCancel={() => setConfirmItem(null)}
                    onConfirm={() => handleDelete(confirmItem.id)}
                    confirmText="Usuń"
                />
            ) : null}
        </>
    );
}
