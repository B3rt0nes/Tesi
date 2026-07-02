# Quenya: un traduttore da linguaggio naturale a query per Blazegraph

Benvenuto nel repository della mia tesi di Laurea in Informatica presso l'Università di Bologna.

## Descrizione del Progetto

Questo progetto di tesi documenta lo sviluppo di **Quenya**, un'interfaccia intelligente e un traduttore da linguaggio naturale a SPARQL. È stato progettato appositamente per interrogare il Datavault del centro di ricerca **DH.ARC** (Digital Humanities Advanced Research Centre), superando la complessa rigidità strutturale di un database a grafo senza richiedere agli utenti (spesso ricercatori di area umanistica) la conoscenza tecnica di SPARQL o delle specifiche ontologie RDF sottostanti.

Attraverso l'impiego di un Modello Linguistico di Grandi Dimensioni (LLM) compatto e affinato su dati sintetici, Quenya interpreta le domande in lingua italiana e restituisce interrogazioni SPARQL formalmente valide.

## Stack Tecnologico

- **LLM Base:** Microsoft Phi-3-mini-4k-instruct (3.8B parametri)
- **Fine-Tuning:** Framework Unsloth con approccio LoRA (Low-Rank Adaptation)
- **Infrastruttura Dati:** Datavault basato su Fedora Repository e Blazegraph (triplestore)
- **Backend:** FastAPI (motore inferenziale e gestione delle API)
- **Frontend:** React (layer di presentazione e interfaccia utente)

## Compilazione della Tesi

La tesi è stata scritta in LaTeX aderendo alle direttive del Prof. Fabio Vitali. Per compilarla in un PDF navigabile, è sufficiente eseguire i seguenti comandi dal terminale (nella cartella `tesi`):

```bash
pdflatex tesi.tex
bibtex tesi
bibtex web
pdflatex tesi.tex
pdflatex tesi.tex
```

Questo processo compilerà correttamente i riferimenti incrociati, la bibliografia standard (in stile `alpha`) e la sezione aggiuntiva relativa alla sitografia tecnica.

---
*Alberto Zuccari - Corso di Laurea in Informatica, Anno Accademico 2025/2026*
