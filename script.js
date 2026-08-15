document.getElementById("kapitel1").addEventListener("click", function () {

    document.getElementById("kartenBereich").innerHTML = `
    
        <div class="karte">

            <h2>🃏 Kapitel 4 – Karte 1</h2>

            <p class="frage">
                Was bedeutet GoB?
            </p>

            <button class="antwort">
                A) Gesetz über Banken
            </button>

            <button class="antwort">
                B) Grundsätze ordnungsgemäßer Buchführung
            </button>

            <button class="antwort">
                C) Gewinn ohne Bilanz
            </button>

            <button class="antwort">
                D) Grundordnung der Betriebe
            </button>

        </div>
        
    `;
});
