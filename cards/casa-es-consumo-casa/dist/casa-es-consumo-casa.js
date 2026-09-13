const { jsx: s, jsxs: r } = window.__OIKOS_SDK__.jsxRuntime, m = "Consumo Casa", h = "Potenza istantanea", p = "Consumo totale della casa", w = "Sensore di potenza", b = "Sensore che misura il consumo totale istantaneo della casa.", y = "Nome visualizzato", _ = "Soglia arancione", v = "Il box diventa arancione sopra questo valore in watt.", f = "Soglia rossa", x = "Il box diventa rosso sopra questo valore in watt.", k = {
  title: m,
  live: h,
  settings: p,
  entity: w,
  entityHint: b,
  label: y,
  warning: _,
  warningHint: v,
  danger: f,
  dangerHint: x
}, H = "Home Consumption", S = "Live power", $ = "Total home consumption", C = "Power sensor", I = "Sensor measuring the home's current total consumption.", T = "Displayed name", N = "Amber threshold", z = "The card turns amber above this watt value.", D = "Red threshold", F = "The card turns red above this watt value.", K = {
  title: H,
  live: S,
  settings: $,
  entity: C,
  entityHint: I,
  label: T,
  warning: N,
  warningHint: z,
  danger: D,
  dangerHint: F
}, { House: O, Zap: W } = window.__OIKOS_SDK__.icons, { registerCardTranslations: A, useCardConfig: L, useDashboard: M, useStyles: j, useT: P } = window.__OIKOS_SDK__;
A("card-casa-es-consumo-casa", { it: k, en: K });
const q = {
  entityId: "sensor.inverter_solarman_load_power",
  label: "Consumo Casa",
  warningThreshold: 3e3,
  dangerThreshold: 5500
};
function B(e, t) {
  const o = Number.parseFloat(e);
  return Number.isFinite(o) ? String(t || "").toLocaleLowerCase() === "kw" ? o * 1e3 : o : null;
}
function E(e) {
  return Number.isFinite(e) ? e >= 1e4 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W` : "—";
}
function R({ cardId: e = "casa-es-consumo-casa" }) {
  const t = j(), { t: o } = P("card-casa-es-consumo-casa"), { getState: c, getAttr: d, openMoreInfo: u } = M(), [n] = L(e, q, { version: 1 }), i = n.entityId ? B(c(n.entityId), d(n.entityId, "unit_of_measurement")) : null, l = Math.max(0, Number(n.warningThreshold) || 3e3), g = Math.max(l, Number(n.dangerThreshold) || 5500), a = Number.isFinite(i) ? i > g ? t.tokens.color.red : i > l ? t.tokens.color.amber : t.tokens.color.blue : t.tokens.color.muted;
  return /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      onClick: () => n.entityId && u(n.entityId),
      style: {
        ...t.card,
        width: "100%",
        minWidth: 0,
        minHeight: 150,
        padding: t.tokens.space.lg,
        display: "flex",
        alignItems: "center",
        color: t.tokens.color.primary,
        cursor: n.entityId ? "pointer" : "default",
        border: `1px solid color-mix(in srgb, ${a} 48%, ${t.tokens.color.border})`,
        background: `radial-gradient(circle at top left, color-mix(in srgb, ${a} 28%, transparent), var(--bg-card))`
      },
      children: /* @__PURE__ */ r("span", { style: { ...t.rowBetween, width: "100%", gap: t.tokens.space.lg }, children: [
        /* @__PURE__ */ r("span", { style: { ...t.row, minWidth: 0, gap: t.tokens.space.md }, children: [
          /* @__PURE__ */ s("span", { style: { ...t.iconBox, color: a }, children: /* @__PURE__ */ s(O, { size: 34 }) }),
          /* @__PURE__ */ r("span", { style: { minWidth: 0, textAlign: "left" }, children: [
            /* @__PURE__ */ s("span", { style: { ...t.title, display: "block" }, children: n.label || o("title") }),
            /* @__PURE__ */ r("span", { style: { ...t.row, ...t.hint, color: a, gap: t.tokens.space.xs }, children: [
              /* @__PURE__ */ s(W, { size: 14 }),
              o("live")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s("strong", { style: { ...t.value, color: a, whiteSpace: "nowrap" }, children: E(i) })
      ] })
    }
  );
}
export {
  R as default
};
