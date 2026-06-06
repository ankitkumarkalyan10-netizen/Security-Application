# Web Application Pentest Toolkit

A client-side security assessment dashboard for web application penetration testing. This toolkit includes target configuration, a security checklist, scan tool runners, evidence capture, severity mapping, and remediation guidance.

## Technologies Used

- HTML
- CSS
- JavaScript

## Features

- Target URL configuration and scan type selection
- Vulnerability checklist for authentication, input validation, session management, HTTP headers, and API security
- Scan runner UI for tools like Nmap, Nuclei, ZAP Proxy, and Burp Suite
- Evidence capture form for findings, severity, descriptions, PoC payloads, and logs
- Severity rubric table with remediation timelines
- Sample audit reports and report state management via JavaScript

## Project Structure

- `index.html` — Main application page
- `assets/css/main.css` — Styling for the dashboard
- `assets/js/app.js` — Main application state and initialization code
- `components/` — Reusable HTML components (navbar, sidebar)

## How to Use

1. Open `index.html` in a web browser.
2. Enter the target URL in the Target Configuration section.
3. Select a scan type (`Quick Scan`, `Standard Scan`, or `Full Audit`).
4. Click `Start Scan` to begin a simulated scan workflow.
5. Review the security checklist items and mark findings as needed.
6. Use the Evidence Capture section to log findings, severity, descriptions, and proof of concept details.
7. Consult the Severity Rubric and Remediation Mapping sections for fix guidance.

## Notes

- This is a front-end prototype and does not perform real network scans by itself.
- The scan runner UI simulates tool statuses and progress for reporting and workflow purposes.
- For a fully operational pentest toolkit, integrate this UI with backend services and actual security tools.

## License

This repository does not include an explicit license. Use and modify it as needed.
