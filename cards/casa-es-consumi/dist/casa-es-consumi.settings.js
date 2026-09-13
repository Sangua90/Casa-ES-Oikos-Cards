const { jsxs: d, Fragment: b, jsx: e } = window.__OIKOS_SDK__.jsxRuntime, u = [
  { key: "boiler", name: "Boiler", entity: "sensor.boiler_power", threshold: 3, icon: "thermometer" },
  { key: "dryer", name: "Asciugatrice", entity: "sensor.asciugatrice_samsung_power", threshold: 7, icon: "wind" },
  { key: "dishwasher", name: "Lavastoviglie", entity: "sensor.presa_lavastoviglie_power", threshold: 10, icon: "droplets" },
  { key: "oven", name: "Forno", entity: "sensor.presa_forno_power", threshold: 30, icon: "flame" },
  { key: "climaP1", name: "Climatizzatore P1", entity: "sensor.clima_p1_power", threshold: 20, icon: "wind" },
  { key: "climaPt", name: "Climatizzatore PT", entity: "sensor.salotto_clima_salotto_potenza", threshold: 14, icon: "wind" },
  { key: "climaEster", name: "Clima Ester", entity: "sensor.clima_ester_power", threshold: 10, icon: "wind" },
  { key: "dehumidifier", name: "Deumidificatore", entity: "sensor.presa_deumidificatore_power", threshold: 3, icon: "droplets" },
  { key: "island", name: "Isola", entity: "sensor.isola_power", threshold: 5, icon: "plug" },
  { key: "washer", name: "Lavatrice Samsung", entity: "sensor.lavatrice_samsung_power", threshold: 15, icon: "washer" },
  { key: "washerDryer", name: "Lavasciuga Samsung", entity: "sensor.lava_asciuga_samsung_power", threshold: 16, icon: "washer" },
  { key: "microwave", name: "Microonde", entity: "sensor.microonde_power", threshold: 2, icon: "zap" },
  { key: "pc", name: "PC", entity: "sensor.pc_power", threshold: 10, icon: "monitor" },
  { key: "hob", name: "Piano Cottura", entity: "sensor.piano_cottura_power_ab", threshold: 5, icon: "flame" },
  { key: "pellet", name: "Stufa Pellet", entity: "sensor.stufa_pellet_power", threshold: 10, icon: "flame" },
  { key: "heater", name: "Stufetta", entity: "sensor.stufetta_power", threshold: 5, icon: "thermometer" },
  { key: "spa", name: "SPA", entity: "sensor.giardino_meter_spa_potenza", threshold: 8, icon: "waves" }
], w = u.reduce((l, t) => ({
  ...l,
  [`${t.key}Entity`]: t.entity,
  [`${t.key}Label`]: t.name,
  [`${t.key}Threshold`]: t.threshold
}), {
  totalEntity: "sensor.inverter_solarman_load_power",
  totalLabel: "Consumo Casa",
  visibilityMode: "active"
}), g = "Consumo Casa", E = "Potenza istantanea", k = "Nessun elettrodomestico attivo", C = "Consumo casa e visualizzazione", S = "Sensore consumo totale", $ = "Potenza istantanea assorbita dalla casa.", f = "Titolo consumo totale", L = "Elettrodomestici visualizzati", z = "Puoi mostrare soltanto i dispositivi sopra la propria soglia oppure tutti.", H = "Solo attivi", A = "Tutti", P = "Sensore di potenza", T = "Nome visualizzato", F = "Soglia di attivazione", O = "Il dispositivo è considerato attivo quando supera questo valore in watt.", D = {
  total: g,
  live: E,
  nothingActive: k,
  generalSettings: C,
  totalEntity: S,
  totalEntityHint: $,
  totalLabel: f,
  visibility: L,
  visibilityHint: z,
  activeOnly: H,
  showAll: A,
  deviceEntity: P,
  deviceLabel: T,
  threshold: F,
  thresholdHint: O
}, I = "Home Consumption", x = "Live power", N = "No active appliances", K = "Home consumption and display", M = "Total consumption sensor", j = "Current power used by the home.", q = "Total consumption title", B = "Displayed appliances", G = "Show only devices above their threshold or show all devices.", R = "Active only", U = "Show all", V = "Power sensor", J = "Displayed name", Q = "Activation threshold", W = "The device is active when its power exceeds this value in watts.", X = {
  total: I,
  live: x,
  nothingActive: N,
  generalSettings: K,
  totalEntity: M,
  totalEntityHint: j,
  totalLabel: q,
  visibility: B,
  visibilityHint: G,
  activeOnly: R,
  showAll: U,
  deviceEntity: V,
  deviceLabel: J,
  threshold: Q,
  thresholdHint: W
}, { EntityField: m, Field: n, NumberField: Y, Pills: Z, Section: v, TextField: p, registerCardTranslations: tt, useCardConfig: et, useT: it } = window.__OIKOS_SDK__;
tt("card-casa-es-consumi", { it: D, en: X });
function ot({ cardId: l }) {
  const { t } = it("card-casa-es-consumi"), [o, r] = et(l, w, { version: 1 }), a = (i, c) => r((s) => ({ ...s, [i]: c })), _ = [
    { value: "active", label: t("activeOnly") },
    { value: "all", label: t("showAll") }
  ];
  return /* @__PURE__ */ d(b, { children: [
    /* @__PURE__ */ d(v, { title: t("generalSettings"), children: [
      /* @__PURE__ */ e(n, { label: t("totalEntity"), hint: t("totalEntityHint"), children: /* @__PURE__ */ e(m, { field: "totalEntity", config: o, setConfig: r, filterDomain: "sensor" }) }),
      /* @__PURE__ */ e(n, { label: t("totalLabel"), children: /* @__PURE__ */ e(p, { value: o.totalLabel, onChange: (i) => a("totalLabel", i) }) }),
      /* @__PURE__ */ e(n, { label: t("visibility"), hint: t("visibilityHint"), children: /* @__PURE__ */ e(Z, { options: _, value: o.visibilityMode, onChange: (i) => a("visibilityMode", i) }) })
    ] }),
    u.map((i) => {
      const c = `${i.key}Entity`, s = `${i.key}Label`, y = `${i.key}Threshold`;
      return /* @__PURE__ */ d(v, { title: o[s] || i.name, children: [
        /* @__PURE__ */ e(n, { label: t("deviceEntity"), children: /* @__PURE__ */ e(m, { field: c, config: o, setConfig: r, filterDomain: "sensor" }) }),
        /* @__PURE__ */ e(n, { label: t("deviceLabel"), children: /* @__PURE__ */ e(p, { value: o[s], onChange: (h) => a(s, h) }) }),
        /* @__PURE__ */ e(n, { label: t("threshold"), hint: t("thresholdHint"), children: /* @__PURE__ */ e(Y, { value: o[y], onChange: (h) => a(y, h), min: 0, max: 5e3, step: 1 }) })
      ] }, i.key);
    })
  ] });
}
export {
  ot as default
};
