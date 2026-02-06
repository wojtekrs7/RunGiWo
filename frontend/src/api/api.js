async function readBodySafe(res) {
    const text = await res.text().catch(() => "");
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

export async function apiRequest(path, { method = "GET", body, headers } = {}) {
    const init = {
        method,
        headers: {
            ...(body ? { "Content-Type": "application/json" } : {}),
            ...(headers || {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const res = await fetch(path, init);
    const data = await readBodySafe(res);

    if (!res.ok) {
        const msg =
            typeof data === "string"
                ? data
                : data && typeof data === "object" && (data.message || data.error)
                    ? (data.message || data.error)
                    : `HTTP ${res.status}`;
        const err = new Error(msg);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}

export const BuildingsApi = {
    list: () => apiRequest("/buildings"),
    create: (payload) => apiRequest("/buildings", { method: "POST", body: payload }),
    update: (id, payload) => apiRequest(`/buildings/${id}`, { method: "PUT", body: payload }),
    remove: (id) => apiRequest(`/buildings/${id}`, { method: "DELETE" }),
};

export const ContractorsApi = {
    list: () => apiRequest("/contractors"),
    create: (payload) => apiRequest("/contractors", { method: "POST", body: payload }),
    update: (id, payload) => apiRequest(`/contractors/${id}`, { method: "PUT", body: payload }),
    remove: (id) => apiRequest(`/contractors/${id}`, { method: "DELETE" }),
};

export const WorkOrdersApi = {
    listByBuilding: (buildingId, status) => {
        const qs = status ? `?status=${encodeURIComponent(status)}` : "";
        return apiRequest(`/buildings/${buildingId}/work-orders${qs}`);
    },

    createForBuilding: (buildingId, payload) =>
        apiRequest(`/buildings/${buildingId}/work-orders`, { method: "POST", body: payload }),

    get: (id) => apiRequest(`/work-orders/${id}`),

    update: (id, payload) => apiRequest(`/work-orders/${id}`, { method: "PUT", body: payload }),

    updateStatus: (id, payload) =>
        apiRequest(`/work-orders/${id}/status`, { method: "PATCH", body: payload }),

    remove: (id) => apiRequest(`/work-orders/${id}`, { method: "DELETE" }),
};
