const { jsxs: c, jsx: e } = window.__OIKOS_SDK__.jsxRuntime, d = "Modalità ospiti", r = "Ospiti presenti", b = "Modalità normale", m = "Attiva modalità ospiti", v = "Disattiva modalità ospiti", u = "Promemoria dopo 4 ore · ripetibile tra 1 ora", p = "Entità non disponibile", g = "Modalità ospiti", _ = "Entità modalità ospiti", h = "Nome personalizzato", $ = "Modalità ospiti", y = {
  title: d,
  active: r,
  inactive: b,
  activate: m,
  deactivate: v,
  reminder: u,
  unavailable: p,
  settings: g,
  entity: _,
  label: h,
  labelPlaceholder: $
}, f = "Guest mode", C = "Guests present", E = "Normal mode", D = "Enable guest mode", O = "Disable guest mode", P = "Reminder after 4 hours · repeat in 1 hour", S = "Entity unavailable", x = "Guest mode", G = "Guest mode entity", w = "Custom name", F = "Guest mode", I = {
  title: f,
  active: C,
  inactive: E,
  activate: D,
  deactivate: O,
  reminder: P,
  unavailable: S,
  settings: x,
  entity: G,
  label: w,
  labelPlaceholder: F
}, { EntityField: K, Field: n, Section: M, TextField: T, registerCardTranslations: j, useCardConfig: z, useT: A } = window.__OIKOS_SDK__;
j("card-casa-es-ospiti", { it: y, en: I });
const N = { entityId: "input_boolean.modalita_ospite", label: "" };
function R({ cardId: o }) {
  const { t } = A("card-casa-es-ospiti"), [i, a] = z(o, N, { version: 1 });
  return /* @__PURE__ */ c(M, { title: t("settings"), children: [
    /* @__PURE__ */ e(n, { label: t("entity"), children: /* @__PURE__ */ e(K, { field: "entityId", config: i, setConfig: a, filterDomain: "input_boolean" }) }),
    /* @__PURE__ */ e(n, { label: t("label"), children: /* @__PURE__ */ e(T, { value: i.label, onChange: (l) => a((s) => ({ ...s, label: l })), placeholder: t("labelPlaceholder") }) })
  ] });
}
export {
  R as default
};
