import Modal from "./Modal.jsx";

export default function Confirm({ title, message, onCancel, onConfirm, confirmText = "Usuń" }) {
    return (
        <Modal title={title} onClose={onCancel}>
            <div className="muted" style={{ marginBottom: 12 }}>
                {message}
            </div>
            <div className="modalFooter">
                <button className="btn" onClick={onCancel}>
                    Anuluj
                </button>
                <button className="btn btnDanger" onClick={onConfirm}>
                    {confirmText}
                </button>
            </div>
        </Modal>
    );
}
