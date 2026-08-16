const themen = document.querySelectorAll(".thema");
const kartenBereich = document.getElementById("kartenBereich");

let fragen = [];

async function ladeKapitel4() {
    try {
        const antwort = await fetch("fragen/kapitel-04.json");

        if (!antwort.ok) {
            throw new Error("Kapitel 4 konnte nicht geladen werden.");
        }

        fragen = await antwort.json();

    } catch (fehler) {
        console.error(fehler);

        kartenBereich.innerHTML = `
            <div class="karte">
                <h2>⚠️ Fehler</h2>
                <p>Die Lernkarten konnten nicht geladen werden.</p>
            </div>
        `;
    }
}

ladeKapitel4();


themen.forEach(function (thema) {

    thema.addEventListener("click", function () {

        const name = thema.dataset.thema;

        const passendeFragen = fragen.filter(function (frage) {
            return frage.thema === name;
        });

        if (passendeFragen.length === 0) {

            kartenBereich.innerHTML = `
                <div class="karte">
                    <h2>📚 ${name}</h2>
                    <p>
                        Für dieses Thema sind noch keine Lernkarten vorhanden.
                    </p>
                </div>
            `;

            return;
        }

        zeigeKarte(passendeFragen[0]);

    });

});


function zeigeKarte(frage) {

    kartenBereich.innerHTML = `

        <div class="karte">

            <div class="kartenNummer">
                KARTE ${frage.id}
            </div>

            <h2>${frage.thema}</h2>

            <p class="frage">
                ${frage.frage}
            </p>

            <div class="antworten">

                ${frage.antworten.map(function (antwort, index) {

                    return `
                        <button
                            class="antwort"
                            data-index="${index}"
                        >
                            ${String.fromCharCode(65 + index)}) ${antwort}
                        </button>
                    `;

                }).join("")}

            </div>

            <div id="feedback"></div>

        </div>
    `;


    const antwortButtons =
        document.querySelectorAll(".antwort");

    const feedback =
        document.getElementById("feedback");


    antwortButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const ausgewaehlt =
                Number(button.dataset.index);

            antwortButtons.forEach(function (b) {
                b.disabled = true;
            });


            if (ausgewaehlt === frage.richtig) {

                button.classList.add("richtig");

                feedback.innerHTML = `
                    <div class="feedback richtigText">
                        ✅ Richtig!
                        <br><br>
                        ${frage.erklaerung}
                    </div>
                `;

            } else {

                button.classList.add("falsch");

                antwortButtons[frage.richtig]
                    .classList.add("richtig");

                feedback.innerHTML = `
                    <div class="feedback falschText">
                        ❌ Leider falsch.
                        <br><br>
                        Die richtige Antwort ist
                        <strong>
                            ${String.fromCharCode(65 + frage.richtig)}
                        </strong>.
                        <br><br>
                        ${frage.erklaerung}
                    </div>
                `;
            }

        });

    });


    kartenBereich.scrollIntoView({
        behavior: "smooth"
    });
}const themen = document.querySelectorAll(".thema");
const kartenBereich = document.getElementById("kartenBereich");

themen.forEach(function (thema) {

    thema.addEventListener("click", function () {

        const name = thema.dataset.thema;

        kartenBereich.innerHTML = `
            <div class="karte">

                <div class="kartenNummer">
                    LERNKARTE
                </div>

                <h2>${name}</h2>

                <p class="frage">
                    Was möchtest du über dieses Thema lernen?
                </p>

                <div class="antworten">

                    <button class="antwort">
                        A) Ich möchte die Grundlagen verstehen.
                    </button>

                    <button class="antwort">
                        B) Ich möchte Beispiele kennenlernen.
                    </button>

                    <button class="antwort">
                        C) Ich möchte mein Wissen testen.
                    </button>

                    <button class="antwort">
                        D) Ich möchte alles wiederholen.
                    </button>

                </div>

            </div>
        `;

        kartenBereich.scrollIntoView({
            behavior: "smooth"
        });

    });

});
