// ui.js - UI Module

const UI = {
    // Initialize UI
    init: function() {
        this.bindEvents();
        this.renderEvidenceList();
    },
    
    // Bind UI events
    bindEvents: function() {
        // Make functions globally accessible
        window.startScan = () => Scanner.startFullScan();
        window.runTool = (tool) => Scanner.runTool(tool);
        window.addEvidence = () => EvidenceManager.addEvidence();
        window.deleteEvidence = (id) => EvidenceManager.deleteEvidence(id);
        window.generateReport = (format) => ReportGenerator.generate(format);
        window.loadSampleReport = (num) => ReportGenerator.loadSample(num);
        window.copyCIConfig = () => this.copyCIConfig();
    },
    
    // Copy CI configuration to clipboard
    copyCIConfig: function() {
        const config = `name: Security Scan
on: [push, pull_request]
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Nuclei Scan
        run: |
          nuclei -u \${{ secrets.TARGET_URL }} \\
            -severity critical,high,medium \\
            -json -output results.json
      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: security-results
          path: results.json`;
        
        navigator.clipboard.writeText(config).then(() => {
            alert('CI configuration copied to clipboard!');
        });
    },
    
    // Show notification
    notify: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#00d26a' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    // Toggle section visibility
    toggleSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = section.style.display === 'none' ? 'block' : 'none';
        }
    },
    
    // Render evidence list (wrapper for EvidenceManager)
    renderEvidenceList: function() {
        if (typeof EvidenceManager !== 'undefined') {
            EvidenceManager.renderEvidenceList();
        }
    }
};

// Export to global
window.UI = UI;