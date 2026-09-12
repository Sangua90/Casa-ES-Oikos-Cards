const { jsxs: m, jsx: o } = window.__OIKOS_SDK__.jsxRuntime, u = "Batterie dispositivi", b = "Tutte le batterie sono a posto", x = "1 batteria scarica", g = "{count} batterie scariche", w = "Soglia", S = "Nessun sensore batteria trovato", v = "Altre {count}", $ = "Controllo batterie", p = "Soglia batteria scarica", C = "Mostra le batterie con percentuale uguale o inferiore a questo valore.", y = "Numero massimo mostrato", H = "Parole da escludere", I = "Separate da virgola. Per esempio: inverter, solarman, accumulo.", _ = "Nome personalizzato", f = "Batterie dispositivi", L = {
  title: u,
  allGood: b,
  lowSingle: x,
  lowMany: g,
  threshold: w,
  noSensors: S,
  more: v,
  settings: $,
  thresholdLabel: p,
  thresholdHint: C,
  maxItems: y,
  exclude: H,
  excludeHint: I,
  label: _,
  labelPlaceholder: f
}, P = "Device batteries", M = "All batteries are OK", T = "1 low battery", D = "{count} low batteries", F = "Threshold", K = "No battery sensors found", N = "{count} more", O = "Battery check", k = "Low battery threshold", B = "Show batteries at or below this percentage.", G = "Maximum items shown", j = "Excluded words", A = "Comma-separated. For example: inverter, solarman, storage.", E = "Custom name", z = "Device batteries", q = {
  title: P,
  allGood: M,
  lowSingle: T,
  lowMany: D,
  threshold: F,
  noSensors: K,
  more: N,
  settings: O,
  thresholdLabel: k,
  thresholdHint: B,
  maxItems: G,
  exclude: j,
  excludeHint: A,
  label: E,
  labelPlaceholder: z
}, { Field: a, NumberField: n, Section: R, TextField: r, registerCardTranslations: U, useCardConfig: J, useT: Q } = window.__OIKOS_SDK__;
U("card-casa-es-battery-check", { it: L, en: q });
const V = {
  threshold: 25,
  maxItems: 6,
  exclude: "inverter,solarman,accumulo,solar battery",
  label: ""
};
function W({ cardId: c }) {
  const { t } = Q("card-casa-es-battery-check"), [l, i] = J(c, V, { version: 2 }), s = (e, d) => i((h) => ({ ...h, [e]: d }));
  return /* @__PURE__ */ m(R, { title: t("settings"), children: [
    /* @__PURE__ */ o(a, { label: t("thresholdLabel"), hint: t("thresholdHint"), children: /* @__PURE__ */ o(n, { value: l.threshold, onChange: (e) => s("threshold", e), min: 1, max: 100, step: 1 }) }),
    /* @__PURE__ */ o(a, { label: t("maxItems"), children: /* @__PURE__ */ o(n, { value: l.maxItems, onChange: (e) => s("maxItems", e), min: 1, max: 20, step: 1 }) }),
    /* @__PURE__ */ o(a, { label: t("exclude"), hint: t("excludeHint"), children: /* @__PURE__ */ o(r, { value: l.exclude, onChange: (e) => s("exclude", e) }) }),
    /* @__PURE__ */ o(a, { label: t("label"), children: /* @__PURE__ */ o(r, { value: l.label, onChange: (e) => s("label", e), placeholder: t("labelPlaceholder") }) })
  ] });
}
export {
  W as default
};
