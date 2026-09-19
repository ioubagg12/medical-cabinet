"""Tiny local web server for the Medical Cabinet prototype.
Serves this folder to every device on your Wi-Fi and prints the address
to open on your phone."""
import http.server, socket, os, sys

PORT = 8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

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
