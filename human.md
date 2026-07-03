---
name: human
description: Riscrive testo dal suono artificiale/robotico in prosa naturale, come la scriverebbe una persona competente e non un chatbot. Elimina sistematicamente i pattern tipici della scrittura generata da LLM (vocabolario ricorrente tipo "cruciale"/"fondamentale", puffery, transizioni generiche, formattazione eccessiva, parallelismi negativi "non è X, è Y", riassunti compulsivi, falsi range "da X a Y") catalogati nella guida "Signs of AI writing" di Wikipedia. USA SEMPRE questa skill quando l'utente chiede di "umanizzare" un testo, di renderlo "meno da AI"/"meno robotico"/"più naturale", dice che un testo "suona come ChatGPT" o "si sente scritto da un'AI", chiede di ripulire una bozza da tic da LLM, o chiede di riscrivere qualcosa per farlo sembrare scritto da lui/lei stesso — anche se non nomina esplicitamente "Human" o questa skill.
---

# Human

Una skill per riscrivere testo in modo che suoni genuinamente umano: non applicando trucchetti superficiali (tipo sostituire "delve" con un sinonimo a caso), ma riscrivendo davvero la logica e il ritmo della frase come farebbe una persona che conosce l'argomento e scrive con voce propria.

## Perché questa skill esiste

Il testo generato da AI ha pattern statistici riconoscibili: non è "cattiva scrittura" in senso assoluto, è scrittura che **regredisce verso la media** — la formulazione più probabile e generica che si applica a qualunque contesto, invece della formulazione specifica che si applica solo a *questo* contesto. Il lavoro di questa skill è invertire quella regressione: sostituire il generico con lo specifico, il vago con il concreto, la struttura prevedibile con una struttura che rispecchia il pensiero reale di chi scrive.

Importante: **non stai solo cercando parole da cambiare**. Se ti limiti a un trova-e-sostituisci lessicale, il risultato suona ancora da AI, solo con sinonimi diversi. Devi riscrivere a livello di frase e paragrafo.

## Processo

1. **Leggi tutto il testo prima di toccarlo.** Capisci cosa l'autore vuole davvero dire, qual è il registro (tecnico, colloquiale, formale), e cosa in quel testo è fatto/dato specifico da preservare esattamente (numeri, nomi, terminologia tecnica, citazioni dirette, codice, comandi).
2. **Passa il testo attraverso i controlli qui sotto**, categoria per categoria.
3. **Riscrivi per intero le frasi problematiche**, non fare patch lessicali isolate.
4. **Rileggi ad alta voce (mentalmente)**: se una frase non la diresti mai a un collega davanti a un caffè, va rivista ancora.
5. **Non introdurre contenuto nuovo.** Umanizzare non significa arricchire, speculare o aggiungere colore che l'autore non ha messo. Se manca un dato, lascialo mancante — non inventarlo per "sembrare più naturale".

## Cosa cercare ed eliminare

### 1. Vocabolario da AI
Parole statisticamente sovra-rappresentate nei testi LLM, spesso usate come scelta "sicura" invece che specifica: *delve/approfondire* (quando è generico), *tapestry/intreccio*, *pivotal*, *underscore/sottolinea*, *foster/favorisce*, *testament/testimonianza*, *enhance/valorizza*, *crucial/cruciale*, *intricate/intricato*, *landscape* (in senso figurato tipo "panorama tecnologico"), *robust/robusto* (come riempitivo), "gioca un ruolo significativo", "funge da testimonianza di".
→ Non bandire la parola in sé se è davvero quella giusta lì. Bandisci l'uso quando è un riempitivo vago che potresti togliere senza perdere informazione.

### 2. Puffery e gonfiamento d'importanza
Frasi che dichiarano che qualcosa è importante invece di mostrarlo: "rappresenta una svolta cruciale", "sottolinea l'importanza di", "gioca un ruolo fondamentale nel panorama di". Anche il simbolismo indebito (attribuire significati epici a dettagli marginali) rientra qui.
→ Cancella la dichiarazione di importanza. Se il fatto è davvero importante, lo si vede dal contesto, non va annunciato.

### 3. Parallelismi negativi
Il costrutto "non è X, è Y" usato per effetto retorico invece che per un contrasto reale ("Non è solo un tool, è un cambio di paradigma").
→ Se il contrasto è reale, riscrivilo in modo diretto. Se non lo è, elimina la struttura ed esprimi il concetto una volta sola.

### 4. Regola del tre e liste inflazionate
Terzine di aggettivi o elementi usate per riempire ("innovativo, trasformativo e rivoluzionario"), spesso ridondanti tra loro.
→ Tieni solo quello che aggiunge informazione distinta. Spesso basta uno solo dei tre.

### 5. Falsi range
Costrutti "da X a Y" che sembrano indicare uno spettro ma in realtà elencano solo due elementi slegati ("dalla pianificazione strategica all'implementazione").
→ Se non c'è davvero un continuum, elenca gli elementi per quello che sono.

### 6. Transizioni generiche e riassunti compulsivi
"Inoltre", "peraltro", "in conclusione", "nel complesso" usati per abitudine anche quando il testo è troppo corto per richiederli, o quando ripetono quanto già detto due righe sopra.
→ Se il paragrafo precedente si regge da solo, non serve annunciarne la fine né la connessione col successivo.

### 7. Clausole finali vaghe ("tailing clauses")
Frasi participiali aggiunte in coda solo per dare un'aria di importanza, senza aggiungere informazione ("...evidenziando così l'impatto duraturo del progetto").
→ Se la tagli e non perdi nulla, tagliala.

### 8. Copertura/attribuzione vaga
"I critici sostengono", "alcuni ritengono", "gli esperti concordano" senza nominare nessuno.
→ Nomina la fonte reale, oppure elimina l'attribuzione e presenta il fatto direttamente se è verificabile.

### 9. Formattazione eccessiva
Grassetto su troppi termini, liste puntate nel formato "Termine: definizione" usate anche per prosa semplice, elenchi numerati dove basterebbe un paragrafo, emoji nei titoli, uso ossessivo del trattino lungo (—) in punti dove andrebbe una virgola o due punti.
→ Nella prosa discorsiva, preferisci frasi complete. Riserva grassetto/liste a dove aiutano davvero la scansione visiva (istruzioni passo-passo, confronti tabellari), non come default.

### 10. Coerenza col contesto tecnico
Se il testo è tecnico (per Alberto: tesi, documentazione di codice, note su Blazegraph/SPARQL/LoRA/ecc.), **non semplificare né arrotondare la precisione tecnica** per suonare più "umano". Un umano esperto scrive comunque in modo preciso — l'umanizzazione riguarda ritmo, struttura e onestà, non genericità. Mantieni terminologia esatta, numeri esatti, nomi di variabili/funzioni/parametri invariati.

## Cosa NON toccare

- Fatti, numeri, nomi propri, terminologia tecnica consolidata — riscrivi la forma, mai la sostanza.
- Citazioni dirette o testo tra virgolette.
- Codice, comandi, percorsi di file, sintassi.
- Il punto di vista dell'autore: non aggiungere opinioni o interpretazioni che il testo originale non conteneva.

## Output

Restituisci il testo riscritto per intero (non solo un elenco di modifiche), a meno che l'utente non chieda esplicitamente un diff o un commento riga per riga. Se hai fatto scelte di riscrittura non ovvie (es. hai tagliato una frase perché ridondante), puoi aggiungere una riga finale brevissima di nota — ma solo se aggiunge valore, non come rito automatico ("Ecco la versione riscritta:" seguito da nient'altro va benissimo).

Se il testo in input è già scritto in modo naturale e non presenta questi pattern, dillo chiaramente invece di riscriverlo comunque per giustificare il lavoro — modificare per il gusto di modificare è esso stesso un tic da evitare.