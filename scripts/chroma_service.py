import os
import json
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
import chromadb

PORT = 8008
CHROMA_PATH = os.path.abspath("./chroma_data")

print(f"[ChromaService] Initializing ChromaDB PersistentClient at {CHROMA_PATH}...")
client = chromadb.PersistentClient(path=CHROMA_PATH)
try:
    collection = client.get_collection(name="apex_company_directory")
    print(f"[ChromaService] Connected to collection 'apex_company_directory' ({collection.count()} docs)")
except Exception as e:
    print(f"[ChromaService] Error loading collection: {e}")
    collection = None

class ChromaHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "healthy",
                "collection": "apex_company_directory",
                "docs_count": collection.count() if collection else 0
            }).encode("utf-8"))
            return
        
        self.send_response(404)
        self.end_headers()

    def do_POST(self):
        if self.path == "/query":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode("utf-8"))
                query_text = data.get("query", "").strip()
                n_results = int(data.get("n_results", 3))
                
                if not query_text or not collection:
                    self.send_response(400)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "Invalid query or collection uninitialized"}).encode("utf-8"))
                    return

                res = collection.query(
                    query_texts=[query_text],
                    n_results=n_results
                )

                formatted = []
                if res and "ids" in res and len(res["ids"]) > 0:
                    ids = res["ids"][0]
                    docs = res["documents"][0]
                    metas = res["metadatas"][0]
                    distances = res["distances"][0] if "distances" in res else [0] * len(ids)

                    for i in range(len(ids)):
                        formatted.append({
                            "id": ids[i],
                            "text": docs[i],
                            "metadata": metas[i],
                            "distance": distances[i]
                        })

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "query": query_text,
                    "results": formatted
                }).encode("utf-8"))
            except Exception as ex:
                import traceback
                print(f"[ChromaService] Exception during /query: {ex}", flush=True)
                traceback.print_exc()
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(ex)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def log_message(self, format, *args):
        # Suppress noisy default logging
        sys.stderr.write(f"[ChromaService] {self.address_string()} - {format % args}\n")

def run():
    server_address = ("127.0.0.1", PORT)
    httpd = HTTPServer(server_address, ChromaHandler)
    print(f"[ChromaService] Server running on http://127.0.0.1:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()
        print("[ChromaService] Server stopped.")

if __name__ == "__main__":
    run()
