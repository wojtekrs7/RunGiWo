import { useEffect, useState } from "react";

export default function Contractors() {
    const [contractors, setContractors] = useState([]);

    useEffect(() => {
        fetch("/contractors")
            .then(res => res.json())
            .then(setContractors);
    }, []);

    return (
        <>
            <h2>Firmy</h2>
            <ul>
                {contractors.map(c => (
                    <li key={c.id}>{c.name}</li>
                ))}
            </ul>
        </>
    );
}
