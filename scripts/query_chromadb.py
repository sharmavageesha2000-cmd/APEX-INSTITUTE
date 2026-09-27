import os
import sys
import json
import chromadb

def query_chroma(query_text, n_results=3):
    chroma_path = os.path.abspath("./chroma_data")
    if not os.path.exists(chroma_path):
        return {"error": "Chroma data directory not found", "results": []}
    
    try:
        client = chromadb.PersistentClient(path=chroma_path)
        collection = client.get_collection(name="apex_company_directory")
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

        return {"query": query_text, "results": formatted}
    except Exception as e:
        return {"error": str(e), "results": []}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No query provided", "results": []}))
        sys.exit(1)
        
    query_str = " ".join(sys.argv[1:])
    result = query_chroma(query_str)
    print(json.dumps(result))
