import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/buildings": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
            },
            "/contractors": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
            },
            "/work-orders": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
            },
        },
    },
});
