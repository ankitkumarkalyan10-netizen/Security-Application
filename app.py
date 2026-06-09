import os
import sqlite3
from datetime import datetime, timezone

from flask import Flask, jsonify, request, g, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_DIR = os.path.join(BASE_DIR, "data")
DATABASE = os.path.join(DB_DIR, "security_app.db")

app = Flask(__name__, static_folder="assets", static_url_path="/assets")


def init_db():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = get_db()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS findings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            severity TEXT NOT NULL,
            description TEXT,
            payload TEXT,
            screenshot TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS audit_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            target TEXT NOT NULL,
            scan_type TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
    conn.commit()


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()


@app.route("/", methods=["GET"])
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()})


@app.route("/api/summary", methods=["GET"])
def summary():
    conn = get_db()
    findings_count = conn.execute("SELECT COUNT(*) FROM findings").fetchone()[0]
    sessions_count = conn.execute("SELECT COUNT(*) FROM audit_sessions").fetchone()[0]
    severity_breakdown = conn.execute(
        "SELECT severity, COUNT(*) AS total FROM findings GROUP BY severity"
    ).fetchall()

    return jsonify(
        {
            "findings": findings_count,
            "sessions": sessions_count,
            "severity": {row["severity"]: row["total"] for row in severity_breakdown},
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
    )


@app.route("/api/findings", methods=["GET", "POST"])
def findings():
    conn = get_db()

    if request.method == "GET":
        rows = conn.execute(
            "SELECT id, title, severity, description, payload, screenshot, created_at FROM findings ORDER BY id DESC"
        ).fetchall()
        return jsonify([dict(row) for row in rows])

    payload = request.get_json(silent=True) or {}
    title = (payload.get("title") or "Unnamed finding").strip()
    severity = (payload.get("severity") or "medium").strip().lower()
    description = (payload.get("description") or "No description provided").strip()
    evidence_payload = (payload.get("payload") or "").strip()
    screenshot = (payload.get("screenshot") or "").strip()

    if not title:
        return jsonify({"error": "Title is required"}), 400

    cursor = conn.execute(
        "INSERT INTO findings (title, severity, description, payload, screenshot) VALUES (?, ?, ?, ?, ?)",
        (title, severity, description, evidence_payload, screenshot),
    )
    conn.commit()

    return jsonify({"id": cursor.lastrowid, "message": "Finding saved to database"})


@app.route("/api/sessions", methods=["POST"])
def sessions():
    payload = request.get_json(silent=True) or {}
    target = (payload.get("target") or "Unknown target").strip()
    scan_type = (payload.get("scanType") or "standard").strip()

    if not target:
        return jsonify({"error": "Target is required"}), 400

    conn = get_db()
    conn.execute(
        "INSERT INTO audit_sessions (target, scan_type) VALUES (?, ?)",
        (target, scan_type),
    )
    conn.commit()
    return jsonify({"message": "Scan session recorded"})


with app.app_context():
    init_db()


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
