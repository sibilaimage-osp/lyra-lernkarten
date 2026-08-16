const themen = document.querySelectorAll(".thema");
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
