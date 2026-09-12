const { jsx: n, jsxs: o, Fragment: P } = window.__OIKOS_SDK__.jsxRuntime, K = "Portone Garage", E = "Configura un'entità cover nelle impostazioni della card.", G = "Apri", j = "Stop", W = "Chiudi", R = "Aperto", B = "Chiuso", M = "In apertura", N = "In chiusura", F = "Non disponibile", q = "Stato sconosciuto", J = "Aprire il portone?", Q = "Conferma l'apertura del portone garage.", V = "Chiudere il portone?", X = "Controlla che il passaggio sia libero prima di chiudere.", Y = "Annulla", Z = "Conferma", ee = "Configurazione", ne = "Entità portone", te = "Seleziona un'entità cover.*", oe = "Nome card", ie = "Lascia vuoto per usare il nome dell'entità", se = "Portone Garage", le = "Sicurezza", re = "Conferma prima di aprire", ae = "Evita aperture accidentali", ce = "Conferma prima di chiudere", de = "Consente di verificare che il passaggio sia libero", pe = {
  defaultLabel: K,
  noEntity: E,
  open: G,
  stop: j,
  close: W,
  stateOpen: R,
  stateClosed: B,
  stateOpening: M,
  stateClosing: N,
  stateUnavailable: F,
  stateUnknown: q,
  confirmOpenTitle: J,
  confirmOpenText: Q,
  confirmCloseTitle: V,
  confirmCloseText: X,
  cancel: Y,
  confirm: Z,
  settingsTitle: ee,
  entityLabel: ne,
  entityHint: te,
  labelLabel: oe,
  labelHint: ie,
  labelPlaceholder: se,
  safetyTitle: le,
  confirmOpenSetting: re,
  confirmOpenHint: ae,
  confirmCloseSetting: ce,
  confirmCloseHint: de
}, ge = "Garage Door", fe = "Configure a cover entity in the card settings.", me = "Open", ue = "Stop", ye = "Close", be = "Open", Ce = "Closed", he = "Opening", Oe = "Closing", ke = "Unavailable", xe = "Unknown state", we = "Open the garage door?", ve = "Confirm opening the garage door.", Se = "Close the garage door?", Te = "Check that the passage is clear before closing.", $e = "Cancel", _e = "Confirm", Ie = "Configuration", Le = "Garage door entity", Ae = "Select a cover.* entity", He = "Card name", Ue = "Leave empty to use the entity name", ze = "Garage Door", De = "Safety", Pe = "Confirm before opening", Ke = "Prevents accidental opening", Ee = "Confirm before closing", Ge = "Lets you check that the passage is clear", je = {
  defaultLabel: ge,
  noEntity: fe,
  open: me,
  stop: ue,
  close: ye,
  stateOpen: be,
  stateClosed: Ce,
  stateOpening: he,
  stateClosing: Oe,
  stateUnavailable: ke,
  stateUnknown: xe,
  confirmOpenTitle: we,
  confirmOpenText: ve,
  confirmCloseTitle: Se,
  confirmCloseText: Te,
  cancel: $e,
  confirm: _e,
  settingsTitle: Ie,
  entityLabel: Le,
  entityHint: Ae,
  labelLabel: He,
  labelHint: Ue,
  labelPlaceholder: ze,
  safetyTitle: De,
  confirmOpenSetting: Pe,
  confirmOpenHint: Ke,
  confirmCloseSetting: Ee,
  confirmCloseHint: Ge
}, { useState: w } = window.__OIKOS_SDK__.React, { createPortal: We } = window.__OIKOS_SDK__.ReactDOM, { ArrowDown: Re, ArrowUp: Be, DoorClosed: Me, DoorOpen: Ne, Loader2: C, Octagon: Fe, TriangleAlert: qe } = window.__OIKOS_SDK__.icons, { getOverlayRoot: Je, registerCardTranslations: Qe, useCardConfig: Ve, useDashboard: Xe, useStyles: Ye, useT: Ze } = window.__OIKOS_SDK__;
Qe("card-casa-es-garage", { it: pe, en: je });
const en = {
  entityId: "cover.portone_garage",
  label: "",
  confirmOpen: !0,
  confirmClose: !0
};
function nn({ cardId: v = "casa-es-garage" }) {
  const e = Ye(), { t: s } = Ze("card-casa-es-garage"), { getState: S, getAttr: T, callService: $, openMoreInfo: _ } = Xe(), [l] = Ve(v, en, { version: 1 }), [r, k] = w(""), [f, m] = w(""), I = l.entityId ? S(l.entityId) : null, L = l.entityId ? T(l.entityId, "friendly_name") : null;
  if (!l.entityId)
    return /* @__PURE__ */ n("div", { style: { ...e.card, color: e.tokens.color.muted, ...e.tokens.font.hint, fontStyle: "italic" }, children: s("noEntity") });
  const c = I || "unknown", u = c === "open", p = c === "closed", y = c === "opening", b = c === "closing", g = y || b, a = c === "unavailable" || c === "unknown", A = l.label || L || s("defaultLabel"), H = {
    open: "stateOpen",
    closed: "stateClosed",
    opening: "stateOpening",
    closing: "stateClosing",
    unavailable: "stateUnavailable",
    unknown: "stateUnknown"
  }[c] || "stateUnknown", i = u ? e.tokens.color.red : p ? e.tokens.color.green : g ? e.tokens.color.amber : e.tokens.color.muted, h = async (t) => {
    if (r || a) return;
    const d = {
      open: "open_cover",
      stop: "stop_cover",
      close: "close_cover"
    }[t];
    if (d) {
      m(""), k(t);
      try {
        await Promise.resolve($("cover", d, l.entityId)).catch((D) => console.error("[PortoneGarage]", D));
      } finally {
        window.setTimeout(() => k(""), 450);
      }
    }
  }, x = (t) => {
    if (t === "open" && l.confirmOpen || t === "close" && l.confirmClose) {
      m(t);
      return;
    }
    h(t);
  }, O = (t, d) => ({
    ...e.buttonGhost,
    width: "100%",
    minWidth: 0,
    opacity: d ? 0.45 : 1,
    cursor: d ? "not-allowed" : "pointer",
    color: t ? i : e.tokens.color.primary,
    borderColor: t ? i : e.tokens.color.border,
    background: t ? `color-mix(in srgb, ${i} 12%, transparent)` : void 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: e.tokens.space.xs
  }), U = f ? We(
    /* @__PURE__ */ n(
      "div",
      {
        onClick: () => m(""),
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 99996,
          background: "var(--overlay-scrim)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: e.tokens.space.xl,
          pointerEvents: "auto"
        },
        children: /* @__PURE__ */ o(
          "div",
          {
            onClick: (t) => t.stopPropagation(),
            style: {
              ...e.card,
              width: "100%",
              maxWidth: 420,
              display: "flex",
              flexDirection: "column",
              gap: e.tokens.space.lg
            },
            children: [
              /* @__PURE__ */ o("div", { style: { ...e.row, alignItems: "flex-start" }, children: [
                /* @__PURE__ */ n(qe, { size: 22, color: e.tokens.color.amber }),
                /* @__PURE__ */ o("div", { style: { ...e.grow, minWidth: 0 }, children: [
                  /* @__PURE__ */ n("div", { style: e.title, children: s(f === "open" ? "confirmOpenTitle" : "confirmCloseTitle") }),
                  /* @__PURE__ */ n("div", { style: { ...e.body, color: e.tokens.color.muted, marginTop: e.tokens.space.xs }, children: s(f === "open" ? "confirmOpenText" : "confirmCloseText") })
                ] })
              ] }),
              /* @__PURE__ */ o("div", { style: { ...e.row, justifyContent: "flex-end", flexWrap: "wrap" }, children: [
                /* @__PURE__ */ n("button", { style: e.buttonGhost, onClick: () => m(""), children: s("cancel") }),
                /* @__PURE__ */ n("button", { style: e.buttonPrimary, onClick: () => h(f), children: s("confirm") })
              ] })
            ]
          }
        )
      }
    ),
    Je()
  ) : null, z = p ? Me : Ne;
  return /* @__PURE__ */ o(P, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        style: {
          ...e.card,
          width: "100%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: e.tokens.space.lg,
          background: `color-mix(in srgb, ${i} 8%, var(--bg-card))`,
          borderColor: `color-mix(in srgb, ${i} 48%, ${e.tokens.color.border})`,
          boxShadow: `0 0 0 1px color-mix(in srgb, ${i} 16%, transparent)`
        },
        children: [
          /* @__PURE__ */ o("div", { style: e.rowBetween, children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => _(l.entityId),
                style: {
                  ...e.iconButton,
                  display: "flex",
                  alignItems: "center",
                  gap: e.tokens.space.md,
                  minWidth: 0,
                  color: e.tokens.color.primary,
                  textAlign: "left"
                },
                children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      style: {
                        width: 48,
                        height: 48,
                        flexShrink: 0,
                        borderRadius: e.tokens.radius.md,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: i,
                        background: `color-mix(in srgb, ${i} 13%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${i} 35%, transparent)`
                      },
                      children: g ? /* @__PURE__ */ n(C, { size: 26, style: { animation: "spin 1.2s linear infinite" } }) : /* @__PURE__ */ n(z, { size: 26 })
                    }
                  ),
                  /* @__PURE__ */ o("span", { style: { ...e.grow, minWidth: 0 }, children: [
                    /* @__PURE__ */ n(
                      "span",
                      {
                        style: {
                          ...e.title,
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        },
                        children: A
                      }
                    ),
                    /* @__PURE__ */ n("span", { style: { ...e.label, display: "block", marginBottom: 0, marginTop: e.tokens.space.xs, color: i }, children: s(H) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ n(
              "span",
              {
                "aria-hidden": "true",
                style: {
                  width: 12,
                  height: 12,
                  flexShrink: 0,
                  borderRadius: "50%",
                  background: i,
                  boxShadow: `0 0 12px ${i}`,
                  opacity: a ? 0.45 : 1
                }
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: e.tokens.space.sm }, children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => x("open"),
                disabled: r !== "" || a || u || y,
                style: O(u || y, r !== "" || a || u || y),
                children: [
                  r === "open" ? /* @__PURE__ */ n(C, { size: 16 }) : /* @__PURE__ */ n(Be, { size: 16 }),
                  /* @__PURE__ */ n("span", { children: s("open") })
                ]
              }
            ),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => h("stop"),
                disabled: r !== "" || a || !g,
                style: O(g, r !== "" || a || !g),
                children: [
                  r === "stop" ? /* @__PURE__ */ n(C, { size: 16 }) : /* @__PURE__ */ n(Fe, { size: 16 }),
                  /* @__PURE__ */ n("span", { children: s("stop") })
                ]
              }
            ),
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => x("close"),
                disabled: r !== "" || a || p || b,
                style: O(p || b, r !== "" || a || p || b),
                children: [
                  r === "close" ? /* @__PURE__ */ n(C, { size: 16 }) : /* @__PURE__ */ n(Re, { size: 16 }),
                  /* @__PURE__ */ n("span", { children: s("close") })
                ]
              }
            )
          ] })
        ]
      }
    ),
    U
  ] });
}
export {
  nn as default
};
