import { useEffect, useState } from "react";
import { ContractorsApi } from "../api/api.js";
import Modal from "../components/Modal.jsx";
import Confirm from "../components/Confirm.jsx";
import AlertModal from "../components/AlertModal.jsx";

function ContractorForm({ initial, onSubmit, onCancel, submitText }) {
    const [name, setName] = useState(initial?.name || "");
    const [email, setEmail] = useState(initial?.email || "");
    const [phone, setPhone] = useState(initial?.phone || "");
    const [nip, setNip] = useState(initial?.nip || "");
    const [error, setError] = useState("");

    function validate() {
        if (!name.trim()) return "Nazwa firmy jest wymagana.";
        if (!nip.trim()) return "NIP jest wymagany.";
        if (!email.trim()) return "Email jest wymagany.";
        if (!phone.trim()) return "Telefon jest wymagany.";
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
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            nip: nip.trim(),
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {error ? (
                <div className="alert" style={{ marginBottom: 12 }}>
                    {error}
                </div>
            ) : null}

            <div className="row">
                <div className="field">
                    <div className="label">Nazwa</div>
                    <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                    <div className="label">Email</div>
                    <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
                <div className="field">
                    <div className="label">Telefon</div>
                    <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="field">
                    <div className="label">NIP</div>
                    <input className="input" value={nip} onChange={(e) => setNip(e.target.value)} />
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

export default function Contractors() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [confirmItem, setConfirmItem] = useState(null);

    // ✅ uniwersalny popup
    const [errorPopup, setErrorPopup] = useState(null);

    async function load() {
        setLoading(true);
        setErr("");
        try {
            const data = await ContractorsApi.list();
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

    async function handleCreate(payload) {
        try {
            await ContractorsApi.create(payload);
            setCreateOpen(false);
            await load();
        } catch (e) {
            setErrorPopup({
                title: "Błąd dodawania",
                message: e?.message || "Nie udało się dodać firmy.",
            });
        }
    }

    async function handleEditSave(payload) {
        try {
            await ContractorsApi.update(editItem.id, payload);
            setEditItem(null);
            await load();
        } catch (e) {
            setErrorPopup({
                title: "Błąd zapisu",
                message: e?.message || "Nie udało się zapisać zmian.",
            });
        }
    }

    async function handleDelete(id) {
        try {
            await ContractorsApi.remove(id);
            setConfirmItem(null);
            await load();
        } catch (e) {
            setConfirmItem(null);

            const msg = (e?.message || "").toLowerCase();
            const raw = JSON.stringify(e?.data || "").toLowerCase();

            const isFk =
                msg.includes("foreign key") ||
                msg.includes("violates foreign key") ||
                raw.includes("foreign key") ||
                raw.includes("violates foreign key") ||
                raw.includes("building_contracts");

            if (isFk) {
                setErrorPopup({
                    title: "Nie można usunąć firmy",
                    message:
                        "Ta firma jest przypisana do budynku (kontrakt w building_contracts) lub ma powiązane dane. " +
                        "Najpierw usuń przypisanie (kontrakt) i dopiero potem usuń firmę.",
                });
                return;
            }

            setErrorPopup({
                title: "Błąd usuwania",
                message: e?.message || "Nie udało się usunąć firmy.",
            });
        }
    }

    return (
        <>
            <div className="pageHeader">
                <div>
                    <h1 className="pageTitle">Firmy</h1>
                    <p className="pageSubtitle">Pełny CRUD dla wykonawców.</p>
                </div>
                <button className="btn btnPrimary" onClick={() => setCreateOpen(true)}>
                    + Dodaj firmę
                </button>
            </div>

            <div className="card">
                <div className="cardBody">
                    {err ? (
                        <div className="alert" style={{ marginBottom: 12 }}>
                            {err}
                        </div>
                    ) : null}

                    {loading ? (
                        <div className="muted">Ładowanie…</div>
                    ) : (
                        <div className="tableWrap">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{ width: 80 }}>ID</th>
                                    <th>Nazwa</th>
                                    <th>Email</th>
                                    <th>Telefon</th>
                                    <th>NIP</th>
                                    <th style={{ width: 220, textAlign: "right" }}>Akcje</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>
                                            <b>{c.name}</b>
                                        </td>
                                        <td>{c.email}</td>
                                        <td>{c.phone}</td>
                                        <td>{c.nip}</td>
                                        <td>
                                            <div className="rightActions">
                                                <button className="btn btnSmall" onClick={() => setEditItem(c)}>
                                                    Edytuj
                                                </button>
                                                <button className="btn btnSmall btnDanger" onClick={() => setConfirmItem(c)}>
                                                    Usuń
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="muted">
                                            Brak firm. Dodaj pierwszą.
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
                <Modal title="Dodaj firmę" onClose={() => setCreateOpen(false)}>
                    <ContractorForm
                        initial={{ name: "", email: "", phone: "", nip: "" }}
                        onSubmit={handleCreate}
                        onCancel={() => setCreateOpen(false)}
                        submitText="Dodaj"
                    />
                </Modal>
            ) : null}

            {editItem ? (
                <Modal title={`Edytuj firmę #${editItem.id}`} onClose={() => setEditItem(null)}>
                    <ContractorForm
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
                    message={`Czy na pewno usunąć firmę "${confirmItem.name}"?`}
                    onCancel={() => setConfirmItem(null)}
                    onConfirm={() => handleDelete(confirmItem.id)}
                    confirmText="Usuń"
                />
            ) : null}
            <AlertModal
                open={!!errorPopup}
                title={errorPopup?.title}
                message={errorPopup?.message}
                onClose={() => setErrorPopup(null)}
                buttonText="OK"
            />
        </>
    );
}
