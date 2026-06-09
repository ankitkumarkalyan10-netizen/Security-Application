const BackendAPI = {
    baseUrl: '/api',

    async health() {
        const response = await fetch(`${this.baseUrl}/health`);
        return response.json();
    },

    async getSummary() {
        const response = await fetch(`${this.baseUrl}/summary`);
        return response.json();
    },

    async saveFinding(finding) {
        const response = await fetch(`${this.baseUrl}/findings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finding)
        });
        return response.json();
    },

    async saveSession(target, scanType) {
        const response = await fetch(`${this.baseUrl}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target, scanType })
        });
        return response.json();
    }
};

window.BackendAPI = BackendAPI;
