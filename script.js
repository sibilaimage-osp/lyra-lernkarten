(() => {

    if (window.ecoVolutionAppLoaded) {
        console.log("ECO-Volution: Script bereits geladen.");
        return;
    }

    window.ecoVolutionAppLoaded = true;

    const themen = document.querySelectorAll(".thema");
    const kartenBereich = document.getElementById("kartenBereich");

    let fragen = [];

    async function ladeKapitel4() {

        try {

            const antwort = await fetch("fragen/kapitel-04.json");

            if (!antwort.ok) {
                throw new Error("kapitel-04.json konnte nicht geladen werden.");
            }

            fragen = await antwort.json();

            console.log("✅ Kapitel 4 geladen:", fragen);

        } catch (fehler) {

            console.error("❌ Fehler beim Laden:", fehler);

            kartenBereich.innerHTML = `
                <div class="karte">
                    <h2>⚠️ Fehler beim Laden</h2>
                    <p>Die Lernkarten konnten nicht geladen werden.</p>
                </div>
            `;
        }
    }


    themen.forEach(function (thema) {

        thema.addEventListener("click", function () {

            const name = thema.dataset.thema;

            console.log("🖱️ Thema geklickt:", name);

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

                kartenBereich.scrollIntoView({
                    behavior: "smooth"
                });

                return;
            }


            zeigeKarte(passendeFragen[0]);

        });

    });


    function zeigeKarte(frage) {

        kartenBereich.innerHTML = `
            <div class="karte">

                <div class="kartenNummer">
                    🃏 LERNKARTE ${frage.id}
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

                            <p>
                                ${frage.erklaerung}
                            </p>

                        </div>
                    `;

                } else {

                    button.classList.add("falsch");

                    antwortButtons[frage.richtig]
                        .classList.add("richtig");

                    feedback.innerHTML = `
                        <div class="feedback falschText">

                            ❌ Leider falsch.

                            <p>
                                Die richtige Antwort ist
                                <strong>
                                    ${String.fromCharCode(
                                        65 + frage.richtig
                                    )}
                                </strong>.
                            </p>

                            <p>
                                ${frage.erklaerung}
                            </p>

                        </div>
                    `;
                }

            });

        });


        kartenBereich.scrollIntoView({
            behavior: "smooth"
        });

    }


    ladeKapitel4();

})();
