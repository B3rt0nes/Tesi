import base64
import sys
import os

def main():
    key = b"LaMiaTesiSegreta2024"
    csv_file = "dati.csv"
    out_file = "dati.enc"
    
    if not os.path.exists(csv_file):
        print(f"Errore: il file {csv_file} non esiste in questa cartella.")
        sys.exit(1)
        
    with open(csv_file, "rb") as f:
        data = f.read()

    encrypted = bytes(b ^ key[i % len(key)] for i, b in enumerate(data))
    encoded = base64.b64encode(encrypted).decode('utf-8')

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(encoded)

    print(f"Compilazione completata! File criptato salvato in: {out_file}")
    print("Ricordati di NON caricare dati.csv su GitHub, ma solo dati.enc!")

if __name__ == "__main__":
    main()
