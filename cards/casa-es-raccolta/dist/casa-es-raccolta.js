const { jsxs: u, jsx: o } = window.__OIKOS_SDK__.jsxRuntime, L = "Raccolta Differenziata", v = "Questa sera", H = "Da esporre questa sera", A = "Nessun rifiuto da esporre questa sera", W = "Prossimi ritiri", N = "Nessuna raccolta prevista", O = "Controlla il calendario o installa il package Home Assistant dalle impostazioni.", M = "Vista limitata al prossimo evento", z = "Calendario e visualizzazione", K = "Calendario rifiuti", R = "Calendario Home Assistant che contiene le raccolte.", j = "Sensore agenda", E = "Creato automaticamente dal package per leggere più eventi futuri.", B = "Supporto calendario Home Assistant", F = "Installa il sensore che legge tutti gli eventi futuri da calendar.raccolta_rifiuti.", G = {
  title: L,
  tonight: v,
  exposeTonight: H,
  nothingTonight: A,
  upcomingCollections: W,
  noCollections: N,
  noCollectionsHint: O,
  limitedMode: M,
  settingsTitle: z,
  calendarLabel: K,
  calendarHint: R,
  sensorLabel: j,
  sensorHint: E,
  packageLabel: B,
  packageDescription: F
}, q = "Recycling Collection", P = "Tonight", U = "Put out tonight", V = "Nothing to put out tonight", Y = "Upcoming collections", J = "No collection scheduled", Q = "Check the calendar or install the Home Assistant package in settings.", X = "Limited to the next calendar event", Z = "Calendar and display", ee = "Waste calendar", te = "Home Assistant calendar containing the collections.", ne = "Agenda sensor", oe = "Automatically created by the package to read multiple future events.", se = "Home Assistant calendar support", ae = "Installs the sensor that reads future events from calendar.raccolta_rifiuti.", re = {
  title: q,
  tonight: P,
  exposeTonight: U,
  nothingTonight: V,
  upcomingCollections: Y,
  noCollections: J,
  noCollectionsHint: Q,
  limitedMode: X,
  settingsTitle: Z,
  calendarLabel: ee,
  calendarHint: te,
  sensorLabel: ne,
  sensorHint: oe,
  packageLabel: se,
  packageDescription: ae
}, { useMemo: ie } = window.__OIKOS_SDK__.React, { CalendarDays: le, CircleDashed: ce, GlassWater: de, Leaf: ue, Newspaper: me, Recycle: k, Trash2: pe } = window.__OIKOS_SDK__.icons, { registerCardTranslations: ge, useCardConfig: he, useDashboard: fe, useStyles: ye, useT: be } = window.__OIKOS_SDK__;
ge("card-casa-es-raccolta", { it: G, en: re });
const we = {
  calendarId: "calendar.raccolta_rifiuti",
  sensorId: "sensor.casa_es_raccolta_differenziata"
};
function ke(n) {
  if (Array.isArray(n)) return n;
  if (typeof n != "string" || !n.trim()) return [];
  try {
    const e = JSON.parse(n);
    return Array.isArray(e) ? e : [];
  } catch {
    return [];
  }
}
function Ce(n) {
  if (!n) return null;
  const e = String(n).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (e) return new Date(Number(e[1]), Number(e[2]) - 1, Number(e[3]), 12);
  const s = new Date(n);
  return Number.isNaN(s.getTime()) ? null : s;
}
function T(n) {
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function xe(n, e) {
  return Math.round((T(n).getTime() - e.getTime()) / 864e5);
}
function C(n) {
  const e = String(n || "").toLocaleLowerCase("it");
  return e.includes("umido") || e.includes("organico") ? "organic" : e.includes("carta") || e.includes("cartone") ? "paper" : e.includes("vetro") ? "glass" : e.includes("plastica") || e.includes("metall") ? "plastic" : e.includes("sterpag") || e.includes("verde") || e.includes("sfalc") ? "green" : e.includes("indiffer") || e.includes("secco") ? "general" : "other";
}
function x(n, e) {
  const s = {
    organic: { Icon: k, color: e.color.amber },
    paper: { Icon: me, color: e.color.blue },
    glass: { Icon: de, color: e.color.green },
    plastic: { Icon: k, color: e.color.amber },
    green: { Icon: ue, color: e.color.green },
    general: { Icon: pe, color: e.color.muted },
    other: { Icon: ce, color: e.color.purple }
  };
  return s[n] || s.other;
}
function Te({ cardId: n = "casa-es-raccolta" }) {
  const e = ye(), { t: s } = be("card-casa-es-raccolta"), { getState: I, getAttr: y, openMoreInfo: $ } = fe(), [r] = he(n, we, { version: 1 }), _ = r.sensorId ? I(r.sensorId) : null, w = r.sensorId ? y(r.sensorId, "events") : null, g = r.calendarId ? y(r.calendarId, "message") : null, h = r.calendarId ? y(r.calendarId, "start_time") : null, d = ie(() => {
    const a = T(/* @__PURE__ */ new Date()), i = ke(w), c = (i.length ? i : g && h ? [{ summary: g, start: h }] : []).map((t) => ({
      summary: String(t.summary || t.message || "").trim(),
      start: Ce(t.start || t.start_time)
    })).filter((t) => t.summary && t.start).map((t) => ({ ...t, offset: xe(t.start, a) })).filter((t) => t.offset >= 1 && t.offset <= 15).sort((t, m) => t.start.getTime() - m.start.getTime() || t.summary.localeCompare(m.summary)), f = [];
    for (const t of c) {
      const m = `${t.start.getFullYear()}-${t.start.getMonth()}-${t.start.getDate()}`;
      let p = f.find((b) => b.key === m);
      p || (p = { key: m, date: t.start, offset: t.offset, events: [] }, f.push(p));
      const S = t.summary.toLocaleLowerCase("it");
      p.events.some((b) => b.summary.toLocaleLowerCase("it") === S) || p.events.push(t);
    }
    return {
      tonight: f.find((t) => t.offset === 1) || null,
      upcoming: f.filter((t) => t.offset > 1).slice(0, 3),
      limited: !i.length && !!(g && h)
    };
  }, [h, g, w, _]), D = (a) => a.toLocaleDateString(void 0, {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
  return /* @__PURE__ */ u(
    "div",
    {
      style: {
        ...e.card,
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: e.tokens.space.md
      },
      children: [
        /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: () => r.calendarId && $(r.calendarId),
            style: { ...e.iconButton, ...e.rowBetween, width: "100%", minWidth: 0, color: e.tokens.color.primary },
            children: [
              /* @__PURE__ */ u("span", { style: { ...e.row, minWidth: 0 }, children: [
                /* @__PURE__ */ o(le, { size: 16, color: e.tokens.color.green }),
                /* @__PURE__ */ o("span", { style: { ...e.title, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: s("title") })
              ] }),
              d.tonight && /* @__PURE__ */ o("span", { style: e.badgeGreen, children: s("tonight") })
            ]
          }
        ),
        /* @__PURE__ */ u(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: e.tokens.space.md,
              padding: e.tokens.space.md,
              borderRadius: e.tokens.radius.lg,
              background: "var(--bg-card)",
              border: `1px solid ${e.tokens.color.border}`,
              minWidth: 0
            },
            children: [
              /* @__PURE__ */ o("span", { style: e.label, children: s("exposeTonight") }),
              d.tonight ? /* @__PURE__ */ o(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))",
                    gap: e.tokens.space.sm,
                    minWidth: 0
                  },
                  children: d.tonight.events.map((a, i) => {
                    const l = x(C(a.summary), e.tokens), c = l.Icon;
                    return /* @__PURE__ */ u(
                      "div",
                      {
                        style: {
                          ...e.row,
                          minWidth: 0,
                          padding: e.tokens.space.md,
                          borderRadius: e.tokens.radius.md,
                          color: l.color,
                          background: `color-mix(in srgb, ${l.color} 12%, transparent)`
                        },
                        children: [
                          /* @__PURE__ */ o(
                            "span",
                            {
                              style: {
                                width: 40,
                                height: 40,
                                flexShrink: 0,
                                borderRadius: e.tokens.radius.md,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `color-mix(in srgb, ${l.color} 14%, transparent)`
                              },
                              children: /* @__PURE__ */ o(c, { size: 22 })
                            }
                          ),
                          /* @__PURE__ */ o("span", { style: { ...e.title, color: l.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: a.summary })
                        ]
                      },
                      `${a.summary}-${i}`
                    );
                  })
                }
              ) : /* @__PURE__ */ o("span", { style: { ...e.body, color: e.tokens.color.muted }, children: s("nothingTonight") }),
              d.upcoming.length > 0 && /* @__PURE__ */ o(
                "div",
                {
                  "aria-label": s("upcomingCollections"),
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(104px, 1fr))",
                    gap: e.tokens.space.sm,
                    paddingTop: e.tokens.space.md,
                    borderTop: `1px solid ${e.tokens.color.border}`,
                    minWidth: 0
                  },
                  children: d.upcoming.map((a) => /* @__PURE__ */ u("div", { style: { ...e.colTight, minWidth: 0 }, children: [
                    /* @__PURE__ */ o("span", { style: { ...e.hint, textTransform: "capitalize" }, children: D(a.date) }),
                    /* @__PURE__ */ o("span", { style: { ...e.row, flexWrap: "wrap", gap: e.tokens.space.xs, minWidth: 0 }, children: a.events.map((i, l) => {
                      const c = x(C(i.summary), e.tokens);
                      return /* @__PURE__ */ o(
                        "span",
                        {
                          style: {
                            ...e.badgeGreen,
                            color: c.color,
                            background: `color-mix(in srgb, ${c.color} 12%, transparent)`,
                            border: `1px solid color-mix(in srgb, ${c.color} 28%, transparent)`,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "100%"
                          },
                          children: i.summary
                        },
                        `${i.summary}-${l}`
                      );
                    }) })
                  ] }, a.key))
                }
              )
            ]
          }
        ),
        d.limited && /* @__PURE__ */ o("span", { style: { ...e.hint, color: e.tokens.color.amber }, children: s("limitedMode") })
      ]
    }
  );
}
export {
  Te as default
};
