"""Tiny local web server for the Medical Cabinet prototype.
Serves this folder to every device on your Wi-Fi and prints the address
to open on your phone."""
import http.server, socket, os, sys, json, threading

PORT = 8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))
CONTACT_FILE = os.path.abspath("contact.json")   # edits made in the app are saved here
CONTACT_FIELDS = {"personal": ["address", "phone", "email"],
                  "emergency": ["name", "relation", "phone"]}
CONTACT_LOCK = threading.Lock()

def lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))   # no packet is actually sent
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      ".webmanifest": "application/manifest+json"}
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")   # always show the latest edit
        super().end_headers()
    def log_message(self, fmt, *args):
        pass  # keep the window quiet

    # --- contact details API: GET/POST /api/contact, stored in contact.json ---
    def _json(self, code, body):
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path.split("?")[0] == "/api/contact":
            try:
                with open(CONTACT_FILE, encoding="utf-8") as f:
                    return self._json(200, json.load(f))
            except (OSError, ValueError):
                return self._json(200, {})
        return super().do_GET()

    def do_POST(self):
        if self.path.split("?")[0] != "/api/contact":
            return self._json(404, {"error": "not found"})
        try:
            n = int(self.headers.get("Content-Length", 0))
            if n > 20000:
                raise ValueError("too large")
            body = json.loads(self.rfile.read(n).decode("utf-8"))
            clean = {}
            for group, fields in CONTACT_FIELDS.items():
                src = body.get(group) or {}
                clean[group] = {k: str(src.get(k, ""))[:200] for k in fields}
        except (ValueError, AttributeError):
            return self._json(400, {"error": "bad data"})
        with CONTACT_LOCK:
            tmp = CONTACT_FILE + ".tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(clean, f, ensure_ascii=False, indent=2)
            os.replace(tmp, CONTACT_FILE)
        self._json(200, clean)

server = None
for port in range(PORT, PORT + 10):
    try:
        server = http.server.ThreadingHTTPServer(("0.0.0.0", port), Handler)
        break
    except OSError:
        continue
if server is None:
    sys.exit("Could not find a free port (8000-8009).")

ip = lan_ip()
print("\n  Medical Cabinet is running.\n")
print("  On your phone (same Wi-Fi), open:\n")
print(f"      http://{ip}:{server.server_port}\n")
print(f"  On this computer:  http://localhost:{server.server_port}")
print("\n  Keep this window open. Press Ctrl+C to stop.\n")
try:
    server.serve_forever()
except KeyboardInterrupt:
    print("Stopped.")
