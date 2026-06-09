# Web Application Pentest Toolkit

A client-side security assessment dashboard for web application penetration testing. This toolkit includes target configuration, a security checklist, scan tool runners, evidence capture, severity mapping, and remediation guidance.

## Technologies Used

- HTML
- CSS
- JavaScript
- Python / Flask
- SQLite

## Features

- Target URL configuration and scan type selection
- Vulnerability checklist for authentication, input validation, session management, HTTP headers, and API security
- Scan runner UI for tools like Nmap, Nuclei, ZAP Proxy, and Burp Suite
- Evidence capture form for findings, severity, descriptions, PoC payloads, and logs
- Severity rubric table with remediation timelines
- Sample audit reports and report state management via JavaScript
- Python Flask backend with SQLite persistence for findings and scan sessions
- Improved human-friendly UI with live summary cards and real-time dashboard feedback

## Project Structure

- `index.html` — Main application page
- `assets/css/main.css` — Styling for the dashboard
- `assets/js/app.js` — Main application state and initialization code
- `components/` — Reusable HTML components (navbar, sidebar)

## How to Use

1. Install the Python package dependencies:
   `pip install -r requirements.txt`
2. Start the backend:
   `python app.py`
3. Open `index.html` in a browser (or use a simple static server if preferred).
4. Enter the target URL in the Target Configuration section.
5. Select a scan type (`Quick Scan`, `Standard Scan`, or `Full Audit`).
6. Click `Start Scan` to begin the workflow and store the session in SQLite.
7. Use the Evidence Capture section to log findings, severity, descriptions, and proof of concept details.
8. Consult the Severity Rubric and Remediation Mapping sections for fix guidance.

## Notes

- This is a front-end prototype and does not perform real network scans by itself.
- The scan runner UI simulates tool statuses and progress for reporting and workflow purposes.
- For a fully operational pentest toolkit, integrate this UI with backend services and actual security tools.

## License

This repository does not include an explicit license. Use and modify it as needed.
