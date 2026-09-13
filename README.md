# Casa ES Oikos Cards

Repository delle card OIKOS personalizzate di Casa ES.

## Contenuto

- **Casa ES Portone Garage**: card JAVA con stato live e pulsanti Apri, Stop e Chiudi.
- **Casa ES Portone Garage Badge**: distintivo con lo stato di `cover.portone_garage`.
- **Casa ES Raccolta Differenziata**: mostra separatamente tutte le raccolte da esporre questa sera e, sotto, il solo ritiro successivo.
- **Casa ES Boiler**: temperatura attuale e colore dinamico quando il boiler sta scaldando.
- **Casa ES Modalità Ospiti**: stato e comando di `input_boolean.modalita_ospite`.
- **Casa ES Batterie Scariche**: individua automaticamente le batterie dei dispositivi sotto la soglia configurata.
- **Casa ES Ventole e Stufetta**: controlla ventole switch e stufette con script Accendi/Spegni; la stufetta è verde quando accesa e rossa quando spenta.

## Installazione della card tramite repository

In OIKOS apri **Store → Comunità → JAVA → Aggiungi repository** e inserisci:

`Sangua90/Casa-ES-Oikos-Cards`

Installa quindi la card desiderata.

## Installazione manuale

- Card JAVA: importa `packages/casa-es-garage-1.0.1.zip` da **Store → Comunità → JAVA → Carica ZIP**.
- Distintivo: importa `packages/casa-es-garage-badge-1.0.0.zip` da **Store → Distintivi → Importa ZIP**.
- Raccolta differenziata: importa `packages/casa-es-raccolta-1.2.0.zip` da **Store → Comunità → JAVA → Carica ZIP**.
- Boiler: importa `packages/casa-es-boiler-1.0.0.zip` da **Store → Comunità → JAVA → Carica ZIP**.
- Modalità ospiti: importa `packages/casa-es-ospiti-1.0.0.zip` da **Store → Comunità → JAVA → Carica ZIP**.
- Batterie scariche: importa `packages/casa-es-battery-check-2.0.0.zip` da **Store → Comunità → JAVA → Carica ZIP**.
- Ventole e stufetta: importa `packages/casa-es-ventole-stufetta-1.1.0.zip` da **Store → Comunità → JAVA → Carica ZIP**.

La card usa inizialmente `cover.portone_garage`; l'entità e il nome sono modificabili nelle impostazioni.

La card Raccolta Differenziata usa `calendar.raccolta_rifiuti`. Dalle impostazioni della card installa il package Home Assistant incluso per visualizzare tutti gli eventi futuri; senza package mostra comunque il prossimo evento del calendario.
