import Modal from "./Modal.jsx";

/**
 * Props:
 * - open: boolean
 * - title: string
 * - message: string
 * - onClose: () => void
 * - buttonText?: string (default: "OK")
 */
export default function AlertModal({ open, title, message, onClose, buttonText = "OK" }) {
    if (!open) return null;

    return (
        <Modal title={title || "Informacja"} onClose={onClose}>
            <div style={{ display: "grid", gap: 12 }}>
                <div>{message}</div>

                <div className="modalFooter">
                    <button className="btn btnPrimary" onClick={onClose}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
