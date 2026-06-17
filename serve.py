#!/usr/bin/env python3
import http.server, os

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    def log_message(self, *a): pass  # silence request log

os.chdir(os.path.dirname(os.path.abspath(__file__)))
http.server.HTTPServer(('', 7823), NoCacheHandler).serve_forever()
