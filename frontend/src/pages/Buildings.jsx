import { useEffect, useState } from "react";

export default function Buildings() {
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        fetch("/buildings")
            .then(res => res.json())
            .then(setBuildings);
    }, []);


    return (
        <>
            <h2>Budynki</h2>
            <ul>
                {buildings.map(b => (
                    <li key={b.id}>
                        <b>{b.name}</b> – {b.address}
                    </li>
                ))}
            </ul>
        </>
    );
}
