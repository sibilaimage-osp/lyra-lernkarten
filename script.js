const kapitel4Button = document.getElementById("kapitel4");
const kartenBereich = document.getElementById("kartenBereich");

kapitel4Button.addEventListener("click", function () {

    kartenBereich.innerHTML = `
    
        <div class="karte">

            <div class="kartenNummer">
                KARTE 1
            </div>

            <h2>📚 Kapitel 4</h2>

            <p class="frage">
                Was bedeutet GoB?
            </p>

            <div class="antworten">

                <button class="antwort" data-richtig="false">
                    A) Gesetz über Banken
                </button>

                <button class="antwort" data-richtig="true">
                    B) Grundsätze ordnungsgemäßer Buchführung
                </button>

                <button class="antwort" data-richtig="false">
                    C) Gewinn ohne Bilanz
                </button>

                <button class="antwort" data-richtig="false">
                    D) Grundordnung der Betriebe
                </button>

            </div>

            <div id="feedback"></div>

        </div>
    `;

    const antworten = document.querySelectorAll(".antwort");
    const feedback = document.getElementById("feedback");

    antworten.forEach(function (antwort) {

        antwort.addEventListener("click", function () {

            antworten.forEach(function (button) {
                button.disabled = true;
            });

            if (antwort.dataset.richtig === "true") {

                antwort.classList.add("richtig");

                feedback.innerHTML = `
                    <div class="feedback richtigText">
                        ✅ Richtig!
                        <br>
                        Grundsätze ordnungsgemäßer Buchführung
                    </div>
                `;

            } else {

                antwort.classList.add("falsch");

                feedback.innerHTML = `
                    <div class="feedback falschText">
                        ❌ Leider falsch.
                        <br>
                        Die richtige Antwort ist B.
                    </div>
                `;

                antworten.forEach(function (button) {

                    if (button.dataset.richtig === "true") {
                        button.classList.add("richtig");
                    }

                });
            }

        });

    });

});
