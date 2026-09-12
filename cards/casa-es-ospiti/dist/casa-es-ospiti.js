const { jsxs: c, jsx: e } = window.__OIKOS_SDK__.jsxRuntime, g = "Modalità ospiti", h = "Ospiti presenti", _ = "Modalità normale", f = "Attiva modalità ospiti", k = "Disattiva modalità ospiti", $ = "Promemoria dopo 4 ore · ripetibile tra 1 ora", w = "Entità non disponibile", I = "Modalità ospiti", x = "Entità modalità ospiti", S = "Nome personalizzato", C = "Modalità ospiti", D = {
  title: g,
  active: h,
  inactive: _,
  activate: f,
  deactivate: k,
  reminder: $,
  unavailable: w,
  settings: I,
  entity: x,
  label: S,
  labelPlaceholder: C
}, O = "Guest mode", E = "Guests present", G = "Normal mode", K = "Enable guest mode", P = "Disable guest mode", z = "Reminder after 4 hours · repeat in 1 hour", M = "Entity unavailable", A = "Guest mode", B = "Guest mode entity", j = "Custom name", N = "Guest mode", R = {
  title: O,
  active: E,
  inactive: G,
  activate: K,
  deactivate: P,
  reminder: z,
  unavailable: M,
  settings: A,
  entity: B,
  label: j,
  labelPlaceholder: N
}, { BellRing: T, House: U, Users: F } = window.__OIKOS_SDK__.icons, { registerCardTranslations: H, useCardConfig: L, useDashboard: W, useStyles: q, useT: J } = window.__OIKOS_SDK__;
H("card-casa-es-ospiti", { it: D, en: R });
const Q = { entityId: "input_boolean.modalita_ospite", label: "" };
function V({ cardId: r = "casa-es-ospiti" }) {
  const t = q(), { t: n } = J("card-casa-es-ospiti"), { getState: d, getAttr: u, callService: b, openMoreInfo: p } = W(), [o] = L(r, Q, { version: 1 }), s = o.entityId ? d(o.entityId) : null, m = o.entityId ? u(o.entityId, "friendly_name") : null, i = s === "on", a = !s || s === "unknown" || s === "unavailable", l = a ? t.tokens.color.muted : i ? t.tokens.color.green : t.tokens.color.blue, v = o.label || m || n("title"), y = () => {
    a || b("input_boolean", i ? "turn_off" : "turn_on", o.entityId);
  };
  return /* @__PURE__ */ c("div", { style: {
    ...t.card,
    display: "flex",
    flexDirection: "column",
    gap: t.tokens.space.lg,
    background: `color-mix(in srgb, ${l} 8%, var(--bg-card))`,
    borderColor: `color-mix(in srgb, ${l} 45%, ${t.tokens.color.border})`
  }, children: [
    /* @__PURE__ */ e("div", { style: t.rowBetween, children: /* @__PURE__ */ c("button", { type: "button", onClick: () => p(o.entityId), style: { ...t.iconButton, ...t.row, gap: t.tokens.space.md, color: t.tokens.color.primary }, children: [
      /* @__PURE__ */ e("span", { style: { ...t.iconBox, color: l }, children: i ? /* @__PURE__ */ e(F, { size: 25 }) : /* @__PURE__ */ e(U, { size: 25 }) }),
      /* @__PURE__ */ c("span", { style: { minWidth: 0, textAlign: "left" }, children: [
        /* @__PURE__ */ e("span", { style: { ...t.title, display: "block" }, children: v }),
        /* @__PURE__ */ e("span", { style: { ...t.body, color: l }, children: n(a ? "unavailable" : i ? "active" : "inactive") })
      ] })
    ] }) }),
    /* @__PURE__ */ c("div", { style: { ...t.cardInset, ...t.row, color: t.tokens.color.muted, gap: t.tokens.space.sm }, children: [
      /* @__PURE__ */ e(T, { size: 16 }),
      /* @__PURE__ */ e("span", { style: t.hint, children: n("reminder") })
    ] }),
    /* @__PURE__ */ e("button", { type: "button", onClick: y, disabled: a, style: {
      ...i ? t.buttonGhost : t.buttonPrimary,
      width: "100%",
      opacity: a ? 0.45 : 1
    }, children: n(i ? "deactivate" : "activate") })
  ] });
}
export {
  V as default
};
