const { jsx: n, jsxs: l } = window.__OIKOS_SDK__.jsxRuntime, _ = "Boiler", E = "Temperatura attuale", $ = "Sta scaldando", k = "In temperatura", v = "Spento", w = "Non disponibile", I = "Seleziona il boiler nelle impostazioni.", S = "Boiler", x = "Entità boiler", B = "Sensore riscaldamento", C = "Nome personalizzato", z = "Boiler", O = {
  title: _,
  current: E,
  heating: $,
  ready: k,
  off: v,
  unavailable: w,
  noEntity: I,
  settings: S,
  boilerEntity: x,
  heatingEntity: B,
  label: C,
  labelPlaceholder: z
}, D = "Boiler", K = "Current temperature", F = "Heating", N = "At temperature", T = "Off", A = "Unavailable", P = "Select the water heater in settings.", j = "Boiler", H = "Water heater entity", U = "Heating sensor", W = "Custom name", L = "Boiler", M = {
  title: D,
  current: K,
  heating: F,
  ready: N,
  off: T,
  unavailable: A,
  noEntity: P,
  settings: j,
  boilerEntity: H,
  heatingEntity: U,
  label: W,
  labelPlaceholder: L
}, { Flame: b, Thermometer: R } = window.__OIKOS_SDK__.icons, { registerCardTranslations: q, useCardConfig: G, useDashboard: J, useStyles: Q, useT: V } = window.__OIKOS_SDK__;
q("card-casa-es-boiler", { it: O, en: M });
const X = {
  entityId: "water_heater.ariston_boiler",
  heatingEntity: "binary_sensor.ariston_is_heating",
  label: ""
}, Y = (a) => {
  const t = Number.parseFloat(a);
  return Number.isFinite(t) ? t : null;
};
function Z({ cardId: a = "casa-es-boiler" }) {
  const t = Q(), { t: o } = V("card-casa-es-boiler"), { getState: c, getAttr: d, openMoreInfo: h } = J(), [e] = G(a, X, { version: 1 }), i = e.entityId ? c(e.entityId) : null, u = e.entityId ? Y(d(e.entityId, "current_temperature")) : null, g = e.heatingEntity ? c(e.heatingEntity) : null, m = e.entityId ? d(e.entityId, "friendly_name") : null;
  if (!e.entityId)
    return /* @__PURE__ */ n("div", { style: { ...t.card, color: t.tokens.color.muted }, children: o("noEntity") });
  const y = !i || i === "unknown" || i === "unavailable", s = g === "on" || i === "heat", r = y ? t.tokens.color.muted : s ? t.tokens.color.amber : t.tokens.color.blue, p = o(y ? "unavailable" : i === "off" ? "off" : s ? "heating" : "ready"), f = e.label || m || o("title");
  return /* @__PURE__ */ l("div", { style: {
    ...t.card,
    display: "flex",
    flexDirection: "column",
    gap: t.tokens.space.lg,
    background: `color-mix(in srgb, ${r} 8%, var(--bg-card))`,
    borderColor: `color-mix(in srgb, ${r} 45%, ${t.tokens.color.border})`
  }, children: [
    /* @__PURE__ */ l("div", { style: t.rowBetween, children: [
      /* @__PURE__ */ l("button", { type: "button", onClick: () => h(e.entityId), style: { ...t.iconButton, ...t.row, gap: t.tokens.space.md, color: t.tokens.color.primary }, children: [
        /* @__PURE__ */ n("span", { style: { ...t.iconBox, color: r }, children: /* @__PURE__ */ n(b, { size: 25 }) }),
        /* @__PURE__ */ l("span", { style: { minWidth: 0, textAlign: "left" }, children: [
          /* @__PURE__ */ n("span", { style: { ...t.title, display: "block" }, children: f }),
          /* @__PURE__ */ n("span", { style: { ...t.hint, color: r }, children: p })
        ] })
      ] }),
      s && /* @__PURE__ */ n(b, { size: 22, color: t.tokens.color.amber })
    ] }),
    /* @__PURE__ */ l("div", { style: { ...t.cardInset, ...t.rowBetween }, children: [
      /* @__PURE__ */ l("span", { style: { ...t.row, gap: t.tokens.space.sm, color: t.tokens.color.muted }, children: [
        /* @__PURE__ */ n(R, { size: 18 }),
        o("current")
      ] }),
      /* @__PURE__ */ n("strong", { style: { ...t.value, color: r }, children: u === null ? "—" : `${u.toFixed(1)} °C` })
    ] })
  ] });
}
export {
  Z as default
};
