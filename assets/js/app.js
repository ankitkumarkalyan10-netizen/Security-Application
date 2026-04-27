// app.js - Main Application Entry Point

// Global state
const AppState = {
    evidenceList: [],
    currentReport: null,
    scanResults: {}
};

// Sample audit reports data
const sampleReports = {
    1: {
        target: "https://demo-ecommerce.example.com",
        date: "2026-04-15",
        findings: [
            {
                title: "SQL Injection in Search Parameter",
                severity: "critical",
                description: "The search parameter 'q' is vulnerable to SQL injection. An attacker can extract sensitive database information including user credentials.",
                payload: "GET /search?q=' OR 1=1--",
                screenshot: "logs/sql_injection_test.txt"
            },
            {
                title: "Missing Content Security Policy",
                severity: "medium",
                description: "The application does not implement a Content Security Policy header, making it vulnerable to XSS attacks.",
                payload: "N/A - Configuration issue",
                screenshot: "headers/csp_missing.txt"
            },
            {
                title: "Insecure Cookie Flags",
                severity: "medium",
                description: "Session cookies are missing the Secure and HttpOnly flags, exposing them to XSS theft and network interception.",
                payload: "Set-Cookie: session=abc123; Path=/",
                screenshot: "cookies/cookie_analysis.txt"
            },
            {
                title: "IDOR - User Profile Access",
                severity: "high",
                description: "Users can access other users' profiles by manipulating the user ID parameter in the URL.",
                payload: "GET /api/users/123/profile -> GET /api/users/456/profile",
                screenshot: "logs/idor_test.txt"
            }
        ],
        checklist: {
            "auth-1": true, "auth-2": true, "auth-3": false, "auth-4": true, "auth-5": false,
            "input-1": true, "input-2": true, "input-3": false, "input-4": false, "input-5": false,
            "session-1": false, "session-2": true, "session-3": false, "session-4": true, "session-5": true,
            "header-1": true, "header-2": true, "header-3": false, "header-4": false, "header-5": true,
            "api-1": true, "api-2": true, "api-3": false, "api-4": true, "api-5": false
        }
    },
    2: {
        target: "https://api-finance.example.com",
        date: "2026-04-20",
        findings: [
            {
                title: "Broken Authentication - JWT None Algorithm",
                severity: "critical",
                description: "The API accepts the 'none' algorithm in JWT tokens, allowing attackers to forge tokens and bypass authentication.",
                payload: "Authorization: Bearer eyJhbGciOiJub25lIn0.eyJzdWIiOiJhZG1pbiJ9.",
                screenshot: "logs/jwt_attack.txt"
            },
            {
                title: "Excessive Data Exposure",
                severity: "high",
                description: "API endpoints return sensitive user data (SSN, account numbers) that should not be exposed to the client.",
                payload: "GET /api/account/details",
                screenshot: "logs/data_exposure.txt"
            },
            {
                title: "Missing Rate Limiting",
                severity: "high",
                description: "API endpoints lack rate limiting, making them vulnerable to brute force and DoS attacks.",
                payload: "N/A - Configuration issue",
                screenshot: "config/rate_limit_missing.txt"
            },
            {
                title: "CORS Misconfiguration",
                severity: "medium",
                description: "CORS policy allows any origin, enabling cross-site requests from malicious domains.",
                payload: "Access-Control-Allow-Origin: *",
                screenshot: "headers/cors.txt"
            },
            {
                title: "XXE Injection in XML Parser",
                severity: "critical",
                description: "The XML parser is vulnerable to XXE attacks, allowing reading of local files and SSRF.",
                payload: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><data>&xxe;</data>',
                screenshot: "logs/xxe_attack.txt"
            }
        ],
        checklist: {
            "auth-1": false, "auth-2": true, "auth-3": true, "auth-4": false, "auth-5": true,
            "input-1": false, "input-2": false, "input-3": false, "input-4": false, "input-5": true,
            "session-1": false, "session-2": false, "session-3": true, "session-4": false, "session-5": false,
            "header-1": false, "header-2": false, "header-3": true, "header-4": true, "header-5": true,
            "api-1": true, "api-2": false, "api-3": true, "api-4": true, "api-5": false
        }
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Web Application Pentest Toolkit loaded');
    UI.init();
    EvidenceManager.init();
});

// Export for global access
window.AppState = AppState;
window.sampleReports = sampleReports;