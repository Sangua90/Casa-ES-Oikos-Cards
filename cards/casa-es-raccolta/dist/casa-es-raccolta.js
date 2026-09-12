const { jsxs: c, jsx: a } = window.__OIKOS_SDK__.jsxRuntime, O = "Raccolta Differenziata", M = "Oggi", R = "Domani", W = "Tra {{count}} giorni", K = "Prossima raccolta", j = "Nessuna raccolta prevista", B = "Controlla il calendario o installa il package Home Assistant dalle impostazioni.", E = "Vista limitata al prossimo evento", F = "+{{count}} altre", G = "Calendario e visualizzazione", V = "Calendario rifiuti", Y = "Calendario Home Assistant che contiene le raccolte.", J = "Sensore agenda", P = "Creato automaticamente dal package per leggere più eventi futuri.", U = "Intervallo visualizzato", q = "Layout compatto", Q = "Riduce gli spazi per mostrare più giorni.", X = "Supporto calendario Home Assistant", Z = "Installa il sensore che legge tutti gli eventi futuri da calendar.raccolta_rifiuti.", ee = "3 giorni", te = "7 giorni", oe = "14 giorni", ne = {
  title: O,
  today: M,
  tomorrow: R,
  inDays: W,
  nextCollection: K,
  noCollections: j,
  noCollectionsHint: B,
  limitedMode: E,
  moreCount: F,
  settingsTitle: G,
  calendarLabel: V,
  calendarHint: Y,
  sensorLabel: J,
  sensorHint: P,
  rangeLabel: U,
  compactLabel: q,
  compactHint: Q,
  packageLabel: X,
  packageDescription: Z,
  days3: ee,
  days7: te,
  days14: oe
}, se = "Recycling Collection", ae = "Today", re = "Tomorrow", ce = "In {{count}} days", ie = "Next collection", le = "No collection scheduled", de = "Check the calendar or install the Home Assistant package in settings.", ue = "Limited to the next calendar event", me = "+{{count}} more", pe = "Calendar and display", ge = "Waste calendar", ye = "Home Assistant calendar containing the collections.", fe = "Agenda sensor", he = "Automatically created by the package to read multiple future events.", be = "Displayed range", we = "Compact layout", Ce = "Reduces spacing to show more days.", ke = "Home Assistant calendar support", Ie = "Installs the sensor that reads future events from calendar.raccolta_rifiuti.", $e = "3 days", xe = "7 days", De = "14 days", Le = {
  title: se,
  today: ae,
  tomorrow: re,
  inDays: ce,
  nextCollection: ie,
  noCollections: le,
  noCollectionsHint: de,
  limitedMode: ue,
  moreCount: me,
  settingsTitle: pe,
  calendarLabel: ge,
  calendarHint: ye,
  sensorLabel: fe,
  sensorHint: he,
  rangeLabel: be,
  compactLabel: we,
  compactHint: Ce,
  packageLabel: ke,
  packageDescription: Ie,
  days3: $e,
  days7: xe,
  days14: De
}, { useMemo: _e } = window.__OIKOS_SDK__.React, { CalendarDays: He, CircleDashed: Se, GlassWater: ve, Leaf: Te, Newspaper: Ae, Recycle: $, Trash2: ze } = window.__OIKOS_SDK__.icons, { registerCardTranslations: Ne, useCardConfig: Oe, useDashboard: Me, useStyles: Re, useT: We } = window.__OIKOS_SDK__;
Ne("card-casa-es-raccolta", { it: ne, en: Le });
const Ke = {
  calendarId: "calendar.raccolta_rifiuti",
  sensorId: "sensor.casa_es_raccolta_differenziata",
  days: 7,
  compact: !1
};
function je(o) {
  if (Array.isArray(o)) return o;
  if (typeof o != "string" || !o.trim()) return [];
  try {
    const e = JSON.parse(o);
    return Array.isArray(e) ? e : [];
  } catch {
    return [];
  }
}
function Be(o) {
  if (!o) return null;
  const e = String(o).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (e) return new Date(Number(e[1]), Number(e[2]) - 1, Number(e[3]), 12);
  const n = new Date(o);
  return Number.isNaN(n.getTime()) ? null : n;
}
function L(o) {
  return new Date(o.getFullYear(), o.getMonth(), o.getDate());
}
function Ee(o, e) {
  return Math.round((L(o).getTime() - e.getTime()) / 864e5);
}
function x(o) {
  const e = String(o || "").toLocaleLowerCase("it");
  return e.includes("umido") || e.includes("organico") ? "organic" : e.includes("carta") || e.includes("cartone") ? "paper" : e.includes("vetro") ? "glass" : e.includes("plastica") || e.includes("metall") ? "plastic" : e.includes("sterpag") || e.includes("verde") || e.includes("sfalc") ? "green" : e.includes("indiffer") || e.includes("secco") ? "general" : "other";
}
function D(o, e) {
  const n = {
    organic: { Icon: $, color: e.color.amber },
    paper: { Icon: Ae, color: e.color.blue },
    glass: { Icon: ve, color: e.color.green },
    plastic: { Icon: $, color: e.color.amber },
    green: { Icon: Te, color: e.color.green },
    general: { Icon: ze, color: e.color.muted },
    other: { Icon: Se, color: e.color.purple }
  };
  return n[o] || n.other;
}
function Fe({ cardId: o = "casa-es-raccolta" }) {
  var I;
  const e = Re(), { t: n } = We("card-casa-es-raccolta"), { getState: _, getAttr: b, openMoreInfo: H } = Me(), [r] = Oe(o, Ke, { version: 1 }), S = r.sensorId ? _(r.sensorId) : null, k = r.sensorId ? b(r.sensorId, "events") : null, g = r.calendarId ? b(r.calendarId, "message") : null, y = r.calendarId ? b(r.calendarId, "start_time") : null, i = _e(() => {
    const s = L(/* @__PURE__ */ new Date()), d = Number(r.days) || 7, u = je(k), w = (u.length ? u : g && y ? [{ summary: g, start: y }] : []).map((t) => ({
      summary: t.summary || t.message || "",
      start: Be(t.start || t.start_time)
    })).filter((t) => t.summary && t.start).map((t) => ({ ...t, offset: Ee(t.start, s) })).filter((t) => t.offset >= 0 && t.offset < d).sort((t, p) => t.start.getTime() - p.start.getTime() || t.summary.localeCompare(p.summary)), C = [];
    for (const t of w) {
      const p = `${t.start.getFullYear()}-${t.start.getMonth()}-${t.start.getDate()}`;
      let h = C.find((N) => N.key === p);
      h || (h = { key: p, date: t.start, offset: t.offset, events: [] }, C.push(h)), h.events.push(t);
    }
    return { groups: C, limited: !u.length && !!(g && y) };
  }, [y, g, r.days, k, S]), v = (s) => s.offset === 0 ? n("today") : s.offset === 1 ? n("tomorrow") : s.date.toLocaleDateString(void 0, { weekday: "short", day: "numeric", month: "short" }), T = (s) => s === 0 ? n("today") : s === 1 ? n("tomorrow") : n("inDays", { count: s }), f = (I = i.groups[0]) == null ? void 0 : I.events[0], l = D(x(f == null ? void 0 : f.summary), e.tokens), A = l.Icon, z = r.compact ? e.tokens.space.sm : e.tokens.space.md;
  return /* @__PURE__ */ c(
    "div",
    {
      style: {
        ...e.card,
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: z
      },
      children: [
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => r.calendarId && H(r.calendarId),
            style: { ...e.iconButton, ...e.rowBetween, width: "100%", minWidth: 0, color: e.tokens.color.primary },
            children: [
              /* @__PURE__ */ c("span", { style: { ...e.row, minWidth: 0 }, children: [
                /* @__PURE__ */ a(He, { size: 16, color: e.tokens.color.green }),
                /* @__PURE__ */ a("span", { style: { ...e.title, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: n("title") })
              ] }),
              i.groups.length > 0 && /* @__PURE__ */ a("span", { style: e.badgeGreen, children: T(i.groups[0].offset) })
            ]
          }
        ),
        f ? /* @__PURE__ */ c(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: e.tokens.space.md,
              padding: e.tokens.space.md,
              borderRadius: e.tokens.radius.md,
              background: `color-mix(in srgb, ${l.color} 12%, var(--bg-card))`,
              border: `1px solid color-mix(in srgb, ${l.color} 35%, ${e.tokens.color.border})`
            },
            children: [
              /* @__PURE__ */ a(
                "span",
                {
                  style: {
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    borderRadius: e.tokens.radius.md,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: l.color,
                    background: `color-mix(in srgb, ${l.color} 14%, transparent)`
                  },
                  children: /* @__PURE__ */ a(A, { size: 24 })
                }
              ),
              /* @__PURE__ */ c("span", { style: { ...e.grow, minWidth: 0 }, children: [
                /* @__PURE__ */ a("span", { style: { ...e.label, display: "block", marginBottom: e.tokens.space.xs, color: l.color }, children: n("nextCollection") }),
                /* @__PURE__ */ a("span", { style: { ...e.title, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: i.groups[0].events.map((s) => s.summary).join(" · ") })
              ] })
            ]
          }
        ) : /* @__PURE__ */ c("div", { style: { ...e.colTight, color: e.tokens.color.muted }, children: [
          /* @__PURE__ */ a("span", { style: e.title, children: n("noCollections") }),
          /* @__PURE__ */ a("span", { style: e.hint, children: n("noCollectionsHint") })
        ] }),
        i.groups.length > 0 && /* @__PURE__ */ a("div", { style: { display: "flex", flexDirection: "column", gap: e.tokens.space.xs }, children: i.groups.map((s) => /* @__PURE__ */ c("div", { style: { ...e.rowBetween, gap: e.tokens.space.sm, minWidth: 0 }, children: [
          /* @__PURE__ */ a("span", { style: { ...e.hint, minWidth: 72, color: s.offset < 2 ? e.tokens.color.primary : e.tokens.color.muted }, children: v(s) }),
          /* @__PURE__ */ a("span", { style: { ...e.row, justifyContent: "flex-end", flexWrap: "wrap", minWidth: 0 }, children: s.events.map((d, u) => {
            const m = D(x(d.summary), e.tokens), w = m.Icon;
            return /* @__PURE__ */ c(
              "span",
              {
                style: {
                  ...e.badgeGreen,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: e.tokens.space.xs,
                  color: m.color,
                  background: `color-mix(in srgb, ${m.color} 11%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${m.color} 28%, transparent)`
                },
                children: [
                  /* @__PURE__ */ a(w, { size: 12 }),
                  d.summary
                ]
              },
              `${d.summary}-${u}`
            );
          }) })
        ] }, s.key)) }),
        i.limited && /* @__PURE__ */ a("span", { style: { ...e.hint, color: e.tokens.color.amber }, children: n("limitedMode") })
      ]
    }
  );
}
export {
  Fe as default
};
