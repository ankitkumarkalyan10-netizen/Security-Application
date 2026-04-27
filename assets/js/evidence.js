// evidence.js - Evidence Capture Module

const EvidenceManager = {
    // Initialize evidence manager
    init: function() {
        this.renderEvidenceList();
    },
    
    // Add new evidence
    addEvidence: function() {
        const title = document.getElementById('evidence-title').value;
        const severity = document.getElementById('evidence-severity').value;
        const description = document.getElementById('evidence-description').value;
        const payload = document.getElementById('evidence-payload').value;
        const screenshot = document.getElementById('evidence-screenshot').value;
        
        if (!title || !description) {
            alert('Please fill in the title and description!');
            return;
        }
        
        const evidence = {
            id: Date.now(),
            title,
            severity,
            description,
            payload,
            screenshot
        };
        
        AppState.evidenceList.push(evidence);
        this.renderEvidenceList();
        this.clearForm();
    },
    
    // Render evidence list
    renderEvidenceList: function() {
        const container = document.getElementById('evidence-list');
        
        if (!container) return;
        
        if (AppState.evidenceList.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary);">No evidence added yet.</p>';
            return;
        }
        
        container.innerHTML = AppState.evidenceList.map(item => `
            <div class="evidence-item">
                <span class="severity-badge badge-${item.severity}">${item.severity.toUpperCase()}</span>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <div class="evidence-detail"><strong>Payload:</strong> ${item.payload || 'N/A'}</div>
                <div class="evidence-detail"><strong>Screenshot/Log:</strong> ${item.screenshot || 'N/A'}</div>
                <button class="delete-btn" onclick="EvidenceManager.deleteEvidence(${item.id})">Delete</button>
            </div>
        `).join('');
    },
    
    // Delete evidence by ID
    deleteEvidence: function(id) {
        AppState.evidenceList = AppState.evidenceList.filter(item => item.id !== id);
        this.renderEvidenceList();
    },
    
    // Clear evidence form
    clearForm: function() {
        document.getElementById('evidence-title').value = '';
        document.getElementById('evidence-severity').value = 'medium';
        document.getElementById('evidence-description').value = '';
        document.getElementById('evidence-payload').value = '';
        document.getElementById('evidence-screenshot').value = '';
    },
    
    // Get all evidence
    getEvidence: function() {
        return AppState.evidenceList;
    },
    
    // Load evidence from sample report
    loadFromSample: function(findings) {
        findings.forEach((f, i) => {
            AppState.evidenceList.push({
                id: Date.now() + i,
                title: f.title,
                severity: f.severity,
                description: f.description,
                payload: f.payload,
                screenshot: f.screenshot
            });
        });
        this.renderEvidenceList();
    },
    
    // Clear all evidence
    clearAll: function() {
        AppState.evidenceList = [];
        this.renderEvidenceList();
    }
};

// Export to global
window.EvidenceManager = EvidenceManager;