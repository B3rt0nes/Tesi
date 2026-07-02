document.addEventListener('DOMContentLoaded', () => {
    // State variables
    let database = [];
    let currentUser = null;

    // DOM Elements
    const bgContainer = document.getElementById('bg-container');
    
    // Sections
    const sectionSearch = document.getElementById('state-search');
    const sectionQuestion = document.getElementById('state-question');
    const sectionSuccess = document.getElementById('state-success');
    
    // Search Elements
    const searchForm = document.getElementById('search-form');
    const nameInput = document.getElementById('name-input');
    const searchError = document.getElementById('search-error');
    const suggestionsBox = document.getElementById('suggestions-container');
    const suggestionsList = document.getElementById('suggestions-list');
    
    // Question Elements
    const greetingTitleSpan = document.querySelector('#greeting-title span');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionError = document.getElementById('question-error');
    const btnBack = document.getElementById('btn-back');
    
    // Success Elements
    const ackText = document.getElementById('ack-text');
    const btnRestart = document.getElementById('btn-restart');

    // Default Background
    const defaultBg = 'linear-gradient(135deg, #0f1115 0%, #1e1b4b 100%)';

    // 1. Fetch and Decrypt Data
    const encryptionKey = "LaMiaTesiSegreta2024";

    fetch('dati.enc')
        .then(response => {
            if (!response.ok) throw new Error("Non riesco a caricare i dati.");
            return response.text();
        })
        .then(encodedText => {
            // Decrypt the Base64 and XOR
            const encryptedBytes = Uint8Array.from(atob(encodedText), c => c.charCodeAt(0));
            const keyBytes = new TextEncoder().encode(encryptionKey);
            
            const decryptedBytes = new Uint8Array(encryptedBytes.length);
            for(let i = 0; i < encryptedBytes.length; i++) {
                decryptedBytes[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
            }
            
            const csvText = new TextDecoder('utf-8').decode(decryptedBytes);
            parseCSV(csvText);
        })
        .catch(err => {
            console.error("Errore nel caricamento dei dati:", err);
            searchError.textContent = "Errore di connessione. Riprova più tardi.";
            searchError.classList.add('visible');
        });

    function parseCSV(csvText) {
        // Handle both \r\n and \n
        const lines = csvText.split(/\r?\n/);
        if (lines.length < 2) return; 

        // Skip header
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const parts = line.split(';');
            // Nome;Cognome;Nickname;Domanda;Opzione A;B;C;D;Risposta Corretta;Ringraziamento;Sfondo
            if (parts.length >= 10) {
                database.push({
                    nome: parts[0].trim(),
                    cognome: parts[1].trim(),
                    nickname: parts[2].trim(),
                    question: parts[3].trim(),
                    options: [
                        { label: 'A', text: parts[4].trim() },
                        { label: 'B', text: parts[5].trim() },
                        { label: 'C', text: parts[6].trim() },
                        { label: 'D', text: parts[7].trim() }
                    ].filter(opt => opt.text !== ""),
                    correctAnswer: parts[8].trim().toUpperCase(),
                    acknowledgement: parts[9].trim(),
                    background: parts[10] ? parts[10].trim() : null
                });
            }
        }
    }

    function normalizeString(str) {
        return str.toLowerCase().replace(/\s+/g, ' ').trim();
    }

    // Levenshtein distance for fuzzy search
    function levenshtein(a, b) {
        if(a.length === 0) return b.length;
        if(b.length === 0) return a.length;
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    // Navigation
    function switchState(newState) {
        sectionSearch.classList.remove('active');
        sectionQuestion.classList.remove('active');
        sectionSuccess.classList.remove('active');
        
        searchError.classList.remove('visible');
        questionError.classList.remove('visible');
        suggestionsBox.classList.add('hidden');
        
        setTimeout(() => {
            newState.classList.add('active');
        }, 50);
    }

    // 2. Handle Search Form Submit
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputVal = normalizeString(nameInput.value);
        suggestionsBox.classList.add('hidden');
        searchError.classList.remove('visible');
        
        let exactMatches = [];
        let partialMatches = []; 
        
        database.forEach(user => {
            const fullName = normalizeString(`${user.nome} ${user.cognome}`);
            const first = normalizeString(user.nome);
            const nick = normalizeString(user.nickname);
            
            if (fullName === inputVal || (nick && nick === inputVal)) {
                exactMatches.push(user);
            } else if (first === inputVal) {
                partialMatches.push(user);
            }
        });

        if (exactMatches.length > 0) {
            startQuestion(exactMatches[0]);
        } else if (partialMatches.length === 1) {
            startQuestion(partialMatches[0]);
        } else if (partialMatches.length > 1) {
            searchError.textContent = "Ho trovato più persone con questo nome. Specifica anche il cognome!";
            searchError.classList.add('visible');
        } else {
            findSuggestions(inputVal);
        }
    });

    function findSuggestions(inputVal) {
        let scored = [];
        database.forEach(user => {
            const fullName = normalizeString(`${user.nome} ${user.cognome}`);
            const first = normalizeString(user.nome);
            const nick = normalizeString(user.nickname);
            
            let distFull = levenshtein(inputVal, fullName);
            let distNick = nick ? levenshtein(inputVal, nick) : 999;
            let distFirst = levenshtein(inputVal, first);
            
            let bestDist = Math.min(distFull, distNick, distFirst);
            
            if (bestDist <= 3) {
                scored.push({ user, dist: bestDist });
            }
        });

        scored.sort((a, b) => a.dist - b.dist);
        const top3 = scored.slice(0, 3);

        if (top3.length > 0) {
            searchError.textContent = "Non ho trovato il nome esatto.";
            searchError.classList.add('visible');
            
            suggestionsList.innerHTML = '';
            top3.forEach(s => {
                const btn = document.createElement('button');
                btn.className = 'suggestion-btn';
                const displayName = `${s.user.nome} ${s.user.cognome}`.trim();
                btn.textContent = displayName + (s.user.nickname ? ` (${s.user.nickname})` : '');
                
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    nameInput.value = displayName;
                    suggestionsBox.classList.add('hidden');
                    searchError.classList.remove('visible');
                    startQuestion(s.user);
                });
                suggestionsList.appendChild(btn);
            });
            suggestionsBox.classList.remove('hidden');
        } else {
            searchError.textContent = "Mmm... non trovo questo nome. Sicuro di averlo scritto bene?";
            searchError.classList.add('visible');
        }
    }

    // 3. Prepare and Handle Question
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startQuestion(user) {
        currentUser = user;
        const displayName = `${user.nome} ${user.cognome}`.trim();
        greetingTitleSpan.textContent = displayName;
        questionText.textContent = user.question;
        
        optionsContainer.innerHTML = '';
        
        // Randomize options order
        const shuffledOptions = shuffleArray([...user.options]);
        
        shuffledOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt.text;
            
            btn.addEventListener('click', () => {
                handleAnswer(opt.label, btn);
            });
            
            optionsContainer.appendChild(btn);
        });
        
        switchState(sectionQuestion);
    }

    function handleAnswer(selectedLabel, buttonEl) {
        if (selectedLabel === currentUser.correctAnswer) {
            showSuccess();
        } else {
            buttonEl.classList.add('wrong');
            questionError.textContent = "Risposta errata! Riprova.";
            questionError.classList.add('visible');
            
            setTimeout(() => {
                buttonEl.classList.remove('wrong');
            }, 400);
        }
    }

    // 4. Handle Success
    function showSuccess() {
        ackText.innerHTML = currentUser.acknowledgement.replace(/\n/g, '<br>');
        
        if (currentUser.background) {
            bgContainer.style.backgroundImage = `url('${currentUser.background}')`;
        } else {
            bgContainer.style.backgroundImage = defaultBg;
        }
        
        switchState(sectionSuccess);
    }

    // 5. Back and Restart Buttons
    btnBack.addEventListener('click', () => {
        currentUser = null;
        switchState(sectionSearch);
    });

    btnRestart.addEventListener('click', () => {
        currentUser = null;
        nameInput.value = '';
        bgContainer.style.backgroundImage = defaultBg;
        switchState(sectionSearch);
    });
});
