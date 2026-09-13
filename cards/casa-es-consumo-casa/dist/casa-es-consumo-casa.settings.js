const { jsxs: g, jsx: e } = window.__OIKOS_SDK__.jsxRuntime, h = "Consumo Casa", u = "Potenza istantanea", m = "Consumo totale della casa", w = "Sensore di potenza", b = "Sensore che misura il consumo totale istantaneo della casa.", v = "Nome visualizzato", C = "Soglia arancione", H = "Il box diventa arancione sopra questo valore in watt.", y = "Soglia rossa", T = "Il box diventa rosso sopra questo valore in watt.", _ = {
  title: h,
  live: u,
  settings: m,
  entity: w,
  entityHint: b,
  label: v,
  warning: C,
  warningHint: H,
  danger: y,
  dangerHint: T
}, p = "Home Consumption", S = "Live power", $ = "Total home consumption", x = "Power sensor", f = "Sensor measuring the home's current total consumption.", I = "Displayed name", D = "Amber threshold", F = "The card turns amber above this watt value.", z = "Red threshold", K = "The card turns red above this watt value.", O = {
  title: p,
  live: S,
  settings: $,
  entity: x,
  entityHint: f,
  label: I,
  warning: D,
  warningHint: F,
  danger: z,
  dangerHint: K
}, { EntityField: j, Field: s, NumberField: r, Section: E, TextField: q, registerCardTranslations: A, useCardConfig: L, useT: N } = window.__OIKOS_SDK__;
A("card-casa-es-consumo-casa", { it: _, en: O });
const P = {
  entityId: "sensor.inverter_solarman_load_power",
  label: "Consumo Casa",
  warningThreshold: 3e3,
  dangerThreshold: 5500
};
function R({ cardId: l }) {
  const { t: n } = N("card-casa-es-consumo-casa"), [a, i] = L(l, P, { version: 1 }), o = (t, c) => i((d) => ({ ...d, [t]: c }));
  return /* @__PURE__ */ g(E, { title: n("settings"), children: [
    /* @__PURE__ */ e(s, { label: n("entity"), hint: n("entityHint"), children: /* @__PURE__ */ e(j, { field: "entityId", config: a, setConfig: i, filterDomain: "sensor" }) }),
    /* @__PURE__ */ e(s, { label: n("label"), children: /* @__PURE__ */ e(q, { value: a.label, onChange: (t) => o("label", t) }) }),
    /* @__PURE__ */ e(s, { label: n("warning"), hint: n("warningHint"), children: /* @__PURE__ */ e(r, { value: a.warningThreshold, onChange: (t) => o("warningThreshold", t), min: 0, max: 2e4, step: 100 }) }),
    /* @__PURE__ */ e(s, { label: n("danger"), hint: n("dangerHint"), children: /* @__PURE__ */ e(r, { value: a.dangerThreshold, onChange: (t) => o("dangerThreshold", t), min: 0, max: 2e4, step: 100 }) })
  ] });
}
export {
  R as default
};
