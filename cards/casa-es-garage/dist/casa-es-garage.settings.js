const { jsxs: a, Fragment: C, jsx: n } = window.__OIKOS_SDK__.jsxRuntime, d = "Portone Garage", b = "Configura un'entità cover nelle impostazioni della card.", h = "Apri", u = "Stop", O = "Chiudi", T = "Aperto", y = "Chiuso", $ = "In apertura", S = "In chiusura", v = "Non disponibile", H = "Stato sconosciuto", L = "Aprire il portone?", x = "Conferma l'apertura del portone garage.", U = "Chiudere il portone?", _ = "Controlla che il passaggio sia libero prima di chiudere.", w = "Annulla", E = "Conferma", P = "Configurazione", k = "Entità portone", D = "Seleziona un'entità cover.*", G = "Nome card", I = "Lascia vuoto per usare il nome dell'entità", z = "Portone Garage", A = "Sicurezza", F = "Conferma prima di aprire", K = "Evita aperture accidentali", j = "Conferma prima di chiudere", N = "Consente di verificare che il passaggio sia libero", R = {
  defaultLabel: d,
  noEntity: b,
  open: h,
  stop: u,
  close: O,
  stateOpen: T,
  stateClosed: y,
  stateOpening: $,
  stateClosing: S,
  stateUnavailable: v,
  stateUnknown: H,
  confirmOpenTitle: L,
  confirmOpenText: x,
  confirmCloseTitle: U,
  confirmCloseText: _,
  cancel: w,
  confirm: E,
  settingsTitle: P,
  entityLabel: k,
  entityHint: D,
  labelLabel: G,
  labelHint: I,
  labelPlaceholder: z,
  safetyTitle: A,
  confirmOpenSetting: F,
  confirmOpenHint: K,
  confirmCloseSetting: j,
  confirmCloseHint: N
}, q = "Garage Door", B = "Configure a cover entity in the card settings.", J = "Open", M = "Stop", Q = "Close", V = "Open", W = "Closed", X = "Opening", Y = "Closing", Z = "Unavailable", ee = "Unknown state", ne = "Open the garage door?", te = "Confirm opening the garage door.", oe = "Close the garage door?", ie = "Check that the passage is clear before closing.", ae = "Cancel", se = "Confirm", le = "Configuration", ce = "Garage door entity", re = "Select a cover.* entity", fe = "Card name", ge = "Leave empty to use the entity name", pe = "Garage Door", me = "Safety", Ce = "Confirm before opening", de = "Prevents accidental opening", be = "Confirm before closing", he = "Lets you check that the passage is clear", ue = {
  defaultLabel: q,
  noEntity: B,
  open: J,
  stop: M,
  close: Q,
  stateOpen: V,
  stateClosed: W,
  stateOpening: X,
  stateClosing: Y,
  stateUnavailable: Z,
  stateUnknown: ee,
  confirmOpenTitle: ne,
  confirmOpenText: te,
  confirmCloseTitle: oe,
  confirmCloseText: ie,
  cancel: ae,
  confirm: se,
  settingsTitle: le,
  entityLabel: ce,
  entityHint: re,
  labelLabel: fe,
  labelHint: ge,
  labelPlaceholder: pe,
  safetyTitle: me,
  confirmOpenSetting: Ce,
  confirmOpenHint: de,
  confirmCloseSetting: be,
  confirmCloseHint: he
}, { EntityField: Oe, Field: l, Section: c, SettingsRow: r, TextField: Te, Toggle: f, registerCardTranslations: ye, useCardConfig: $e, useT: Se } = window.__OIKOS_SDK__;
ye("card-casa-es-garage", { it: R, en: ue });
const ve = {
  entityId: "cover.portone_garage",
  label: "",
  confirmOpen: !0,
  confirmClose: !0
};
function He({ cardId: g }) {
  const { t: e } = Se("card-casa-es-garage"), [o, s] = $e(g, ve, { version: 1 }), i = (t, p) => s((m) => ({ ...m, [t]: p }));
  return /* @__PURE__ */ a(C, { children: [
    /* @__PURE__ */ a(c, { title: e("settingsTitle"), children: [
      /* @__PURE__ */ n(l, { label: e("entityLabel"), hint: e("entityHint"), children: /* @__PURE__ */ n(
        Oe,
        {
          field: "entityId",
          config: o,
          setConfig: s,
          filterDomain: "cover"
        }
      ) }),
      /* @__PURE__ */ n(l, { label: e("labelLabel"), hint: e("labelHint"), children: /* @__PURE__ */ n(
        Te,
        {
          value: o.label,
          onChange: (t) => i("label", t),
          placeholder: e("labelPlaceholder")
        }
      ) })
    ] }),
    /* @__PURE__ */ a(c, { title: e("safetyTitle"), children: [
      /* @__PURE__ */ n(r, { label: e("confirmOpenSetting"), hint: e("confirmOpenHint"), children: /* @__PURE__ */ n(f, { value: o.confirmOpen, onChange: (t) => i("confirmOpen", t) }) }),
      /* @__PURE__ */ n(r, { label: e("confirmCloseSetting"), hint: e("confirmCloseHint"), children: /* @__PURE__ */ n(f, { value: o.confirmClose, onChange: (t) => i("confirmClose", t) }) })
    ] })
  ] });
}
export {
  He as default
};
