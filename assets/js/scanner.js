// scanner.js - Scan Runner Module

const Scanner = {
    // Run individual tool scan
    runTool: function(toolName) {
        const statusEl = document.getElementById(`${toolName}-status`);
        const progressEl = document.getElementById('scan-progress');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        const outputEl = document.getElementById('scan-output');
        
        const targetUrl = document.getElementById('target-url').value;
        
        if (!targetUrl) {
            alert('Please enter a target URL first!');
            return;
        }
        
        // Update status
        statusEl.textContent = 'Running...';
        statusEl.className = 'tool-status running';
        progressEl.style.display = 'block';
        outputEl.innerHTML = '';
        
        // Simulate scan progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressFill.textContent = Math.round(progress) + '%';
            
            // Add output lines
            const output = this.getToolOutput(toolName, targetUrl, progress);
            if (output) {
                outputEl.innerHTML += `<div class="output-line">${output}</div>`;
                outputEl.scrollTop = outputEl.scrollHeight;
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                statusEl.textContent = 'Completed';
                statusEl.className = 'tool-status completed';
                progressText.textContent = `${toolName.toUpperCase()} scan completed!`;
                outputEl.innerHTML += `<div class="output-line success">✓ ${toolName.toUpperCase()} scan finished successfully</div>`;
                
                // Store result
                AppState.scanResults[toolName] = {
                    completed: true,
                    timestamp: new Date().toISOString(),
                    target: targetUrl
                };
            }
        }, 500);
    },
    
    // Get tool-specific output messages
    getToolOutput: function(tool, url, progress) {
        const timestamp = new Date().toLocaleTimeString();
        
        if (tool === 'nmap') {
            if (progress < 30) return `[${timestamp}] Starting Nmap scan on ${url}...`;
            if (progress < 60) return `[${timestamp}] Discovered open ports: 80, 443, 8080`;
            if (progress < 90) return `[${timestamp}] Service detection: Apache/2.4.41, OpenSSL`;
            return `[${timestamp}] Nmap scan complete: 3 hosts up, 15 ports scanned`;
        }
        
        if (tool === 'nuclei') {
            if (progress < 30) return `[${timestamp}] Loading Nuclei templates...`;
            if (progress < 60) return `[${timestamp}] [critical] SQL Injection detected on /login`;
            if (progress < 90) return `[${timestamp}] [high] XSS reflected in /search?q=`;
            return `[${timestamp}] Nuclei scan complete: 5 vulnerabilities found`;
        }
        
        if (tool === 'zap') {
            if (progress < 30) return `[${timestamp}] Initializing ZAP spider...`;
            if (progress < 60) return `[${timestamp}] Spider found 150 URLs`;
            if (progress < 90) return `[${timestamp}] Active scan in progress...`;
            return `[${timestamp}] ZAP complete: 8 alerts (2 High, 3 Medium, 3 Low)`;
        }
        
        if (tool === 'burp') {
            if (progress < 30) return `[${timestamp}] Burp Suite initializing proxy...`;
            if (progress < 60) return `[${timestamp}] Proxy listener active on 127.0.0.1:8080`;
            if (progress < 90) return `[${timestamp}] Scanning detected endpoints...`;
            return `[${timestamp}] Burp scan complete: Report generated`;
        }
        
        return '';
    },
    
    // Start full scan with all tools
    startFullScan: function() {
        const targetUrl = document.getElementById('target-url').value;
        const scanType = document.getElementById('scan-type').value;
        
        if (!targetUrl) {
            alert('Please enter a target URL!');
            return;
        }
        
        alert(`Starting ${scanType} scan on ${targetUrl}\n\nThis will run Nmap, Nuclei, and ZAP scans.`);
        
        // Run all tools sequentially
        this.runTool('nmap');
        setTimeout(() => this.runTool('nuclei'), 6000);
        setTimeout(() => this.runTool('zap'), 12000);
    },
    
    // Get scan results
    getResults: function() {
        return AppState.scanResults;
    },
    
    // Clear scan results
    clearResults: function() {
        AppState.scanResults = {};
        document.getElementById('scan-output').innerHTML = '';
        
        ['nmap', 'nuclei', 'zap', 'burp'].forEach(tool => {
            const statusEl = document.getElementById(`${tool}-status`);
            statusEl.textContent = 'Ready';
            statusEl.className = 'tool-status';
        });
        
        document.getElementById('scan-progress').style.display = 'none';
    }
};

// Export to global
window.Scanner = Scanner;