const { jsxs: c, jsx: e } = window.__OIKOS_SDK__.jsxRuntime, b = "Boiler", d = "Temperatura attuale", h = "Sta scaldando", y = "In temperatura", g = "Spento", u = "Non disponibile", E = "Seleziona il boiler nelle impostazioni.", _ = "Boiler", f = "Entità boiler", $ = "Sensore riscaldamento", m = "Nome personalizzato", S = "Boiler", p = {
  title: b,
  current: d,
  heating: h,
  ready: y,
  off: g,
  unavailable: u,
  noEntity: E,
  settings: _,
  boilerEntity: f,
  heatingEntity: $,
  label: m,
  labelPlaceholder: S
}, C = "Boiler", v = "Current temperature", w = "Heating", B = "At temperature", x = "Off", I = "Unavailable", O = "Select the water heater in settings.", P = "Boiler", T = "Water heater entity", z = "Heating sensor", D = "Custom name", F = "Boiler", K = {
  title: C,
  current: v,
  heating: w,
  ready: B,
  off: x,
  unavailable: I,
  noEntity: O,
  settings: P,
  boilerEntity: T,
  heatingEntity: z,
  label: D,
  labelPlaceholder: F
}, { EntityField: j, Field: a, Section: A, TextField: H, registerCardTranslations: N, useCardConfig: U, useT: L } = window.__OIKOS_SDK__;
N("card-casa-es-boiler", { it: p, en: K });
const R = {
  entityId: "water_heater.ariston_boiler",
  heatingEntity: "binary_sensor.ariston_is_heating",
  label: ""
};
function W({ cardId: s }) {
  const { t } = L("card-casa-es-boiler"), [l, o] = U(s, R, { version: 1 }), r = (n, i) => /* @__PURE__ */ e(j, { field: n, config: l, setConfig: o, filterDomain: i });
  return /* @__PURE__ */ c(A, { title: t("settings"), children: [
    /* @__PURE__ */ e(a, { label: t("boilerEntity"), children: r("entityId", "water_heater") }),
    /* @__PURE__ */ e(a, { label: t("heatingEntity"), children: r("heatingEntity", "binary_sensor") }),
    /* @__PURE__ */ e(a, { label: t("label"), children: /* @__PURE__ */ e(H, { value: l.label, onChange: (n) => o((i) => ({ ...i, label: n })), placeholder: t("labelPlaceholder") }) })
  ] });
}
export {
  W as default
};
