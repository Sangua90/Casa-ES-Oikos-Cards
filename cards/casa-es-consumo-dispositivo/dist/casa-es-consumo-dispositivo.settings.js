const { jsxs: h, jsx: t } = window.__OIKOS_SDK__.jsxRuntime, y = "Seleziona il sensore di potenza nelle impostazioni", u = "Consumo elettrodomestico", v = "Sensore di potenza", b = "Seleziona il sensore dell'elettrodomestico da mostrare.", m = "Nome visualizzato", p = "Se vuoto usa automaticamente il nome dell'entità.", H = "Automatico", g = "Icona", w = "Se vuota usa l'icona dell'entità o una spina.", S = "Soglia di attivazione", $ = "Il dispositivo è attivo quando supera questo valore in watt.", f = "Visualizzazione", z = "Nascondi il box sotto soglia oppure mostralo sempre in grigio.", C = "Solo attivo", O = "Sempre", _ = {
  configure: y,
  settings: u,
  entity: v,
  entityHint: b,
  label: m,
  labelHint: p,
  automatic: H,
  icon: g,
  iconHint: w,
  threshold: S,
  thresholdHint: $,
  visibility: f,
  visibilityHint: z,
  activeOnly: C,
  always: O
}, x = "Select the power sensor in settings", I = "Appliance consumption", A = "Power sensor", D = "Select the appliance power sensor to display.", F = "Displayed name", T = "When empty, the entity name is used automatically.", K = "Automatic", M = "Icon", j = "When empty, the entity icon or a plug is used.", E = "Activation threshold", N = "The device is active when it exceeds this watt value.", P = "Visibility", q = "Hide the card below its threshold or always show it in grey.", V = "Active only", W = "Always", k = {
  configure: x,
  settings: I,
  entity: A,
  entityHint: D,
  label: F,
  labelHint: T,
  automatic: K,
  icon: M,
  iconHint: j,
  threshold: E,
  thresholdHint: N,
  visibility: P,
  visibilityHint: q,
  activeOnly: V,
  always: W
}, { EntityField: L, Field: o, MdiIconPicker: R, NumberField: U, Pills: B, Section: G, TextField: J, registerCardTranslations: Q, useCardConfig: X, useT: Y } = window.__OIKOS_SDK__;
Q("card-casa-es-consumo-dispositivo", { it: _, en: k });
const Z = {
  entityId: "",
  label: "",
  icon: "",
  threshold: 5,
  visibilityMode: "active"
};
function ii({ cardId: a }) {
  const { t: i } = Y("card-casa-es-consumo-dispositivo"), [n, l] = X(a, Z, { version: 1 }), s = (e, r) => l((d) => ({ ...d, [e]: r })), c = [
    { value: "active", label: i("activeOnly") },
    { value: "always", label: i("always") }
  ];
  return /* @__PURE__ */ h(G, { title: i("settings"), children: [
    /* @__PURE__ */ t(o, { label: i("entity"), hint: i("entityHint"), children: /* @__PURE__ */ t(L, { field: "entityId", config: n, setConfig: l, filterDomain: "sensor" }) }),
    /* @__PURE__ */ t(o, { label: i("label"), hint: i("labelHint"), children: /* @__PURE__ */ t(J, { value: n.label, onChange: (e) => s("label", e), placeholder: i("automatic") }) }),
    /* @__PURE__ */ t(o, { label: i("icon"), hint: i("iconHint"), children: /* @__PURE__ */ t(R, { value: n.icon, onChange: (e) => s("icon", e) }) }),
    /* @__PURE__ */ t(o, { label: i("threshold"), hint: i("thresholdHint"), children: /* @__PURE__ */ t(U, { value: n.threshold, onChange: (e) => s("threshold", e), min: 0, max: 5e3, step: 1 }) }),
    /* @__PURE__ */ t(o, { label: i("visibility"), hint: i("visibilityHint"), children: /* @__PURE__ */ t(B, { options: c, value: n.visibilityMode, onChange: (e) => s("visibilityMode", e) }) })
  ] });
}
export {
  ii as default
};
