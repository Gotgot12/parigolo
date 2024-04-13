declare global {
    interface Window {
        _env_: {
            BACKEND_PORT: string;
        };
    }
}

export const API_BASE_URL = `http://localhost:${window._env_.BACKEND_PORT}`;