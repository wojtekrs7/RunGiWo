export default function Modal({ title, children, onClose }) {
    return (
        <div className="modalBackdrop" role="dialog" aria-modal="true">
            <div className="modal">
                <div className="modalHeader">
                    <h3 className="modalTitle">{title}</h3>
                    <button className="btn btnSmall" onClick={onClose} aria-label="Zamknij">
                        ✕
                    </button>
                </div>
                <div className="modalBody">{children}</div>
            </div>
        </div>
    );
}
