const { jsx: a, jsxs: r } = window.__OIKOS_SDK__.jsxRuntime, p = "Seleziona il sensore di potenza nelle impostazioni", b = "Consumo elettrodomestico", v = "Sensore di potenza", g = "Seleziona il sensore dell'elettrodomestico da mostrare.", w = "Nome visualizzato", f = "Se vuoto usa automaticamente il nome dell'entità.", H = "Automatico", $ = "Icona", S = "Se vuota usa l'icona dell'entità o una spina.", x = "Soglia di attivazione", I = "Il dispositivo è attivo quando supera questo valore in watt.", k = "Visualizzazione", _ = "Nascondi il box sotto soglia oppure mostralo sempre in grigio.", z = "Solo attivo", A = "Sempre", C = {
  configure: p,
  settings: b,
  entity: v,
  entityHint: g,
  label: w,
  labelHint: f,
  automatic: H,
  icon: $,
  iconHint: S,
  threshold: x,
  thresholdHint: I,
  visibility: k,
  visibilityHint: _,
  activeOnly: z,
  always: A
}, O = "Select the power sensor in settings", D = "Appliance consumption", N = "Power sensor", F = "Select the appliance power sensor to display.", M = "Displayed name", W = "When empty, the entity name is used automatically.", j = "Automatic", K = "Icon", T = "When empty, the entity icon or a plug is used.", L = "Activation threshold", q = "The device is active when it exceeds this watt value.", E = "Visibility", P = "Hide the card below its threshold or always show it in grey.", V = "Active only", B = "Always", R = {
  configure: O,
  settings: D,
  entity: N,
  entityHint: F,
  label: M,
  labelHint: W,
  automatic: j,
  icon: K,
  iconHint: T,
  threshold: L,
  thresholdHint: q,
  visibility: E,
  visibilityHint: P,
  activeOnly: V,
  always: B
}, { MdiIcon: U, registerCardTranslations: G, useCardConfig: J, useDashboard: Q, useStyles: X, useT: Y } = window.__OIKOS_SDK__;
G("card-casa-es-consumo-dispositivo", { it: C, en: R });
const Z = {
  entityId: "",
  label: "",
  icon: "",
  threshold: 5,
  visibilityMode: "active"
};
function tt(e, t) {
  const o = Number.parseFloat(e);
  return Number.isFinite(o) ? String(t || "").toLocaleLowerCase() === "kw" ? o * 1e3 : o : null;
}
function it(e) {
  return Number.isFinite(e) ? e >= 1e4 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W` : "—";
}
function et({ cardId: e = "casa-es-consumo-dispositivo" }) {
  const t = X(), { t: o } = Y("card-casa-es-consumo-dispositivo"), { getState: d, getAttr: c, openMoreInfo: u } = Q(), [i] = J(e, Z, { version: 1 });
  if (!i.entityId)
    return /* @__PURE__ */ a("div", { style: { ...t.card, ...t.body, color: t.tokens.color.muted, textAlign: "center" }, children: o("configure") });
  const n = tt(d(i.entityId), c(i.entityId, "unit_of_measurement")), y = Math.max(0, Number(i.threshold) || 0), l = Number.isFinite(n) && n > y;
  if (i.visibilityMode === "active" && !l) return null;
  const s = l ? n > 1200 ? t.tokens.color.red : n > 500 ? t.tokens.color.amber : t.tokens.color.blue : t.tokens.color.muted, h = i.label || c(i.entityId, "friendly_name") || i.entityId, m = i.icon || c(i.entityId, "icon") || "mdi:power-plug";
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: () => u(i.entityId),
      style: {
        ...t.card,
        width: "100%",
        minWidth: 0,
        minHeight: 120,
        padding: t.tokens.space.lg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: t.tokens.space.md,
        textAlign: "left",
        color: t.tokens.color.primary,
        cursor: "pointer",
        border: `1px solid color-mix(in srgb, ${s} 46%, ${t.tokens.color.border})`,
        background: `radial-gradient(circle at top left, color-mix(in srgb, ${s} 26%, transparent), var(--bg-card))`
      },
      children: [
        /* @__PURE__ */ r("span", { style: { ...t.rowBetween, width: "100%", gap: t.tokens.space.sm }, children: [
          /* @__PURE__ */ a(U, { name: m, size: 34, color: s }),
          /* @__PURE__ */ a("strong", { style: { ...t.value, color: s, whiteSpace: "nowrap" }, children: it(n) })
        ] }),
        /* @__PURE__ */ a("span", { style: { ...t.title, width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: h })
      ]
    }
  );
}
export {
  et as default
};
