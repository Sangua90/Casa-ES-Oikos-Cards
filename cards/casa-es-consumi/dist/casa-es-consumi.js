const { jsxs: l, jsx: i } = window.__OIKOS_SDK__.jsxRuntime, v = [
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
], _ = v.reduce((o, t) => ({
  ...o,
  [`${t.key}Entity`]: t.entity,
  [`${t.key}Label`]: t.name,
  [`${t.key}Threshold`]: t.threshold
}), {
  totalEntity: "sensor.inverter_solarman_load_power",
  totalLabel: "Consumo Casa",
  visibilityMode: "active"
}), f = "Consumo Casa", k = "Potenza istantanea", S = "Nessun elettrodomestico attivo", E = "Consumo casa e visualizzazione", $ = "Sensore consumo totale", C = "Potenza istantanea assorbita dalla casa.", x = "Titolo consumo totale", z = "Elettrodomestici visualizzati", A = "Puoi mostrare soltanto i dispositivi sopra la propria soglia oppure tutti.", I = "Solo attivi", L = "Tutti", H = "Sensore di potenza", O = "Nome visualizzato", D = "Soglia di attivazione", N = "Il dispositivo è considerato attivo quando supera questo valore in watt.", P = {
  total: f,
  live: k,
  nothingActive: S,
  generalSettings: E,
  totalEntity: $,
  totalEntityHint: C,
  totalLabel: x,
  visibility: z,
  visibilityHint: A,
  activeOnly: I,
  showAll: L,
  deviceEntity: H,
  deviceLabel: O,
  threshold: D,
  thresholdHint: N
}, T = "Home Consumption", W = "Live power", F = "No active appliances", M = "Home consumption and display", K = "Total consumption sensor", j = "Current power used by the home.", B = "Total consumption title", q = "Displayed appliances", R = "Show only devices above their threshold or show all devices.", G = "Active only", U = "Show all", V = "Power sensor", Z = "Displayed name", J = "Activation threshold", Q = "The device is active when its power exceeds this value in watts.", X = {
  total: T,
  live: W,
  nothingActive: F,
  generalSettings: M,
  totalEntity: K,
  totalEntityHint: j,
  totalLabel: B,
  visibility: q,
  visibilityHint: R,
  activeOnly: G,
  showAll: U,
  deviceEntity: V,
  deviceLabel: Z,
  threshold: J,
  thresholdHint: Q
}, { useMemo: Y } = window.__OIKOS_SDK__.React, { Droplets: tt, Flame: et, House: ot, Monitor: nt, Plug: it, Thermometer: st, WashingMachine: at, Waves: rt, Wind: lt, Zap: b } = window.__OIKOS_SDK__.icons, { registerCardTranslations: ct, useCardConfig: dt, useDashboard: ht, useStyles: mt, useT: pt } = window.__OIKOS_SDK__;
ct("card-casa-es-consumi", { it: P, en: X });
const yt = {
  droplets: tt,
  flame: et,
  monitor: nt,
  plug: it,
  thermometer: st,
  washer: at,
  waves: rt,
  wind: lt,
  zap: b
};
function w(o, t) {
  const r = Number.parseFloat(o);
  return Number.isFinite(r) ? String(t || "").toLocaleLowerCase() === "kw" ? r * 1e3 : r : null;
}
function g(o) {
  return Number.isFinite(o) ? o >= 1e4 ? `${(o / 1e3).toFixed(1)} kW` : `${Math.round(o)} W` : "—";
}
function ut(o, t) {
  return o > 1200 ? t.color.red : o > 500 ? t.color.amber : t.color.blue;
}
function wt(o, t) {
  return Number.isFinite(o) ? o > 5500 ? t.color.red : o > 3e3 ? t.color.amber : t.color.blue : t.color.muted;
}
function gt({ cardId: o = "casa-es-consumi" }) {
  const t = mt(), { t: r } = pt("card-casa-es-consumi"), { getState: d, getAttr: h, openMoreInfo: m } = ht(), [n] = dt(o, _, { version: 1 }), p = n.totalEntity ? w(d(n.totalEntity), h(n.totalEntity, "unit_of_measurement")) : null, c = wt(p, t.tokens), y = Y(() => v.map((e) => {
    const s = n[`${e.key}Entity`], a = s ? w(d(s), h(s, "unit_of_measurement")) : null, u = Math.max(0, Number(n[`${e.key}Threshold`]) || 0);
    return {
      ...e,
      entityId: s,
      label: n[`${e.key}Label`] || e.name,
      value: a,
      threshold: u,
      active: Number.isFinite(a) && a > u
    };
  }).filter((e) => e.entityId && Number.isFinite(e.value) && (n.visibilityMode === "all" || e.active)).sort((e, s) => s.value - e.value), [n, h, d]);
  return /* @__PURE__ */ l("div", { style: { ...t.card, display: "flex", flexDirection: "column", gap: t.tokens.space.md, minWidth: 0 }, children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => n.totalEntity && m(n.totalEntity),
        style: {
          ...t.cardInset,
          width: "100%",
          minWidth: 0,
          padding: t.tokens.space.lg,
          border: `1px solid color-mix(in srgb, ${c} 48%, ${t.tokens.color.border})`,
          background: `radial-gradient(circle at top left, color-mix(in srgb, ${c} 24%, transparent), var(--bg-card))`,
          color: t.tokens.color.primary,
          cursor: n.totalEntity ? "pointer" : "default"
        },
        children: /* @__PURE__ */ l("span", { style: { ...t.rowBetween, width: "100%", gap: t.tokens.space.md }, children: [
          /* @__PURE__ */ l("span", { style: { ...t.row, minWidth: 0, gap: t.tokens.space.md }, children: [
            /* @__PURE__ */ i("span", { style: { ...t.iconBox, color: c }, children: /* @__PURE__ */ i(ot, { size: 30 }) }),
            /* @__PURE__ */ l("span", { style: { minWidth: 0, textAlign: "left" }, children: [
              /* @__PURE__ */ i("span", { style: { ...t.title, display: "block" }, children: n.totalLabel || r("total") }),
              /* @__PURE__ */ i("span", { style: { ...t.hint, color: c }, children: r("live") })
            ] })
          ] }),
          /* @__PURE__ */ i("strong", { style: { ...t.value, color: c, whiteSpace: "nowrap" }, children: g(p) })
        ] })
      }
    ),
    y.length > 0 ? /* @__PURE__ */ i("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: t.tokens.space.sm, minWidth: 0 }, children: y.map((e) => {
      const s = yt[e.icon] || b, a = e.active ? ut(e.value, t.tokens) : t.tokens.color.muted;
      return /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: () => m(e.entityId),
          style: {
            ...t.cardInset,
            minWidth: 0,
            minHeight: 108,
            padding: t.tokens.space.md,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: t.tokens.space.md,
            textAlign: "left",
            color: t.tokens.color.primary,
            cursor: "pointer",
            border: `1px solid color-mix(in srgb, ${a} 42%, ${t.tokens.color.border})`,
            background: `radial-gradient(circle at top left, color-mix(in srgb, ${a} 20%, transparent), var(--bg-card))`
          },
          children: [
            /* @__PURE__ */ l("span", { style: { ...t.rowBetween, width: "100%", gap: t.tokens.space.sm }, children: [
              /* @__PURE__ */ i(s, { size: 24, color: a }),
              /* @__PURE__ */ i("strong", { style: { ...t.title, color: a, whiteSpace: "nowrap" }, children: g(e.value) })
            ] }),
            /* @__PURE__ */ i("span", { style: { ...t.body, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }, children: e.label })
          ]
        },
        e.key
      );
    }) }) : /* @__PURE__ */ i("div", { style: { ...t.cardInset, ...t.body, color: t.tokens.color.muted, textAlign: "center" }, children: r("nothingActive") })
  ] });
}
export {
  gt as default
};
