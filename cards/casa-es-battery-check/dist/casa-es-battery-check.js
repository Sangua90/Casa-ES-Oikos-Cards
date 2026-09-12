const { jsxs: n, jsx: s } = window.__OIKOS_SDK__.jsxRuntime, B = "Batterie dispositivi", I = "Tutte le batterie sono a posto", L = "1 batteria scarica", O = "{count} batterie scariche", D = "Soglia", K = "Nessun sensore batteria trovato", H = "Altre {count}", N = "Controllo batterie", A = "Soglia batteria scarica", P = "Mostra le batterie con percentuale uguale o inferiore a questo valore.", T = "Numero massimo mostrato", z = "Parole da escludere", E = "Separate da virgola. Per esempio: inverter, solarman, accumulo.", G = "Nome personalizzato", j = "Batterie dispositivi", F = {
  title: B,
  allGood: I,
  lowSingle: L,
  lowMany: O,
  threshold: D,
  noSensors: K,
  more: H,
  settings: N,
  thresholdLabel: A,
  thresholdHint: P,
  maxItems: T,
  exclude: z,
  excludeHint: E,
  label: G,
  labelPlaceholder: j
}, R = "Device batteries", q = "All batteries are OK", U = "1 low battery", W = "{count} low batteries", J = "Threshold", Q = "No battery sensors found", V = "{count} more", X = "Battery check", Y = "Low battery threshold", Z = "Show batteries at or below this percentage.", ee = "Maximum items shown", te = "Excluded words", oe = "Comma-separated. For example: inverter, solarman, storage.", se = "Custom name", le = "Device batteries", re = {
  title: R,
  allGood: q,
  lowSingle: U,
  lowMany: W,
  threshold: J,
  noSensors: Q,
  more: V,
  settings: X,
  thresholdLabel: Y,
  thresholdHint: Z,
  maxItems: ee,
  exclude: te,
  excludeHint: oe,
  label: se,
  labelPlaceholder: le
}, { useMemo: ne } = window.__OIKOS_SDK__.React, { Battery: ae, BatteryLow: ce, CheckCircle2: ie } = window.__OIKOS_SDK__.icons, { registerCardTranslations: de, useCardConfig: he, useDashboard: ue, useStyles: me, useT: be } = window.__OIKOS_SDK__;
de("card-casa-es-battery-check", { it: F, en: re });
const ge = {
  threshold: 25,
  maxItems: 6,
  exclude: "inverter,solarman,accumulo,solar battery",
  label: ""
};
function pe({ cardId: y = "casa-es-battery-check" }) {
  const e = me(), { t: r } = be("card-casa-es-battery-check"), { haStates: g, openMoreInfo: v } = ue(), [a] = he(y, ge, { version: 2 }), p = ne(() => {
    const o = String(a.exclude || "").toLowerCase().split(",").map((t) => t.trim()).filter(Boolean);
    return Object.entries(g || {}).map(([t, l]) => {
      const m = (l == null ? void 0 : l.attributes) || {}, b = m.friendly_name || t, $ = Number.parseFloat(l == null ? void 0 : l.state), k = String(m.unit_of_measurement || ""), f = m.device_class === "battery" || k === "%" && /battery|batteria/i.test(`${t} ${b}`), C = o.some((M) => `${t} ${b}`.toLowerCase().includes(M));
      return { entityId: t, name: b, value: $, isBattery: f, excludedEntity: C };
    }).filter((t) => t.isBattery && !t.excludedEntity && Number.isFinite(t.value)).sort((t, l) => t.value - l.value);
  }, [g, a.exclude]), w = Math.max(1, Math.min(100, Number(a.threshold) || 25)), c = p.filter((o) => o.value <= w), d = c.slice(0, Math.max(1, Number(a.maxItems) || 6)), x = Math.max(0, c.length - d.length), h = c.length > 0, u = p.length > 0, i = h ? e.tokens.color.red : u ? e.tokens.color.green : e.tokens.color.muted, S = a.label || r("title"), _ = u ? h ? c.length === 1 ? r("lowSingle") : r("lowMany").replace("{count}", c.length) : r("allGood") : r("noSensors");
  return /* @__PURE__ */ n("div", { style: {
    ...e.card,
    display: "flex",
    flexDirection: "column",
    gap: e.tokens.space.lg,
    background: `color-mix(in srgb, ${i} 8%, var(--bg-card))`,
    borderColor: `color-mix(in srgb, ${i} 45%, ${e.tokens.color.border})`
  }, children: [
    /* @__PURE__ */ n("div", { style: e.rowBetween, children: [
      /* @__PURE__ */ n("div", { style: { ...e.row, gap: e.tokens.space.md }, children: [
        /* @__PURE__ */ s("span", { style: { color: i }, children: h ? /* @__PURE__ */ s(ce, { size: 28 }) : u ? /* @__PURE__ */ s(ie, { size: 28 }) : /* @__PURE__ */ s(ae, { size: 28 }) }),
        /* @__PURE__ */ n("div", { children: [
          /* @__PURE__ */ s("div", { style: e.title, children: S }),
          /* @__PURE__ */ s("div", { style: { ...e.body, color: i }, children: _ })
        ] })
      ] }),
      /* @__PURE__ */ n("span", { style: { ...e.hint, color: e.tokens.color.muted }, children: [
        r("threshold"),
        " ≤ ",
        w,
        "%"
      ] })
    ] }),
    d.length > 0 && /* @__PURE__ */ s("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: e.tokens.space.sm }, children: d.map((o) => {
      const t = o.value <= 10 ? e.tokens.color.red : e.tokens.color.amber;
      return /* @__PURE__ */ n("button", { type: "button", onClick: () => v(o.entityId), style: { ...e.cardInset, ...e.rowBetween, cursor: "pointer", color: e.tokens.color.primary, textAlign: "left" }, children: [
        /* @__PURE__ */ s("span", { style: { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: o.name }),
        /* @__PURE__ */ n("strong", { style: { color: t, marginLeft: e.tokens.space.sm }, children: [
          Math.round(o.value),
          "%"
        ] })
      ] }, o.entityId);
    }) }),
    x > 0 && /* @__PURE__ */ s("div", { style: { ...e.hint, color: e.tokens.color.muted, textAlign: "center" }, children: r("more").replace("{count}", x) })
  ] });
}
export {
  pe as default
};
