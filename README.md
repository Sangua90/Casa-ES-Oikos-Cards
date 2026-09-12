# Casa ES Oikos Cards

Repository delle card OIKOS personalizzate di Casa ES.

## Contenuto

- **Casa ES Portone Garage**: card JAVA con stato live e pulsanti Apri, Stop e Chiudi.
- **Casa ES Portone Garage Badge**: distintivo con lo stato di `cover.portone_garage`.
- **Casa ES Raccolta Differenziata**: agenda dinamica basata su `calendar.raccolta_rifiuti`, con più raccolte nello stesso giorno e intervallo fino a 14 giorni.

## Installazione della card tramite repository

In OIKOS apri **Store → Comunità → JAVA → Aggiungi repository** e inserisci:

`Sangua90/Casa-ES-Oikos-Cards`

Installa quindi la card desiderata.

## Installazione manuale

- Card JAVA: importa `packages/casa-es-garage-1.0.1.zip` da **Store → Comunità → JAVA → Carica ZIP**.
- Distintivo: importa `packages/casa-es-garage-badge-1.0.0.zip` da **Store → Distintivi → Importa ZIP**.
- Raccolta differenziata: importa `packages/casa-es-raccolta-1.0.0.zip` da **Store → Comunità → JAVA → Carica ZIP**.

La card usa inizialmente `cover.portone_garage`; l'entità e il nome sono modificabili nelle impostazioni.

La card Raccolta Differenziata usa `calendar.raccolta_rifiuti`. Dalle impostazioni della card installa il package Home Assistant incluso per visualizzare tutti gli eventi futuri; senza package mostra comunque il prossimo evento del calendario.
