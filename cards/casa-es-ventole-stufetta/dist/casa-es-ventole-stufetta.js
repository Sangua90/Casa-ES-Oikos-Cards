const { jsx: a, jsxs: d } = window.__OIKOS_SDK__.jsxRuntime, H = "Configura un'entità switch nelle impostazioni della card", L = "Ventola", $ = "Stufetta", x = "Accesa", _ = "Spenta", I = "Non disponibile", T = "Stato sconosciuto", U = "Accendi", C = "Spegni", F = "Dispositivo", E = "Entità", D = "Seleziona la ventola o la stufetta da controllare.", K = "Tipo", P = "Imposta icona e colore della card.", z = "Ventola", A = "Stufetta", j = "Nome personalizzato", V = "Lascia vuoto per usare il nome di Home Assistant.", B = "Es. Ventola P1", R = {
  noEntity: H,
  defaultFanLabel: L,
  defaultHeaterLabel: $,
  stateOn: x,
  stateOff: _,
  stateUnavailable: I,
  stateUnknown: T,
  turnOn: U,
  turnOff: C,
  settingsTitle: F,
  entityLabel: E,
  entityHint: D,
  typeLabel: K,
  typeHint: P,
  typeFan: z,
  typeHeater: A,
  labelLabel: j,
  labelHint: V,
  labelPlaceholder: B
}, W = "Configure a switch entity in the card settings", N = "Fan", G = "Heater", M = "On", q = "Off", J = "Unavailable", Q = "Unknown state", X = "Turn on", Y = "Turn off", Z = "Device", tt = "Entity", et = "Select the fan or heater to control.", nt = "Type", at = "Sets the card icon and active color.", ot = "Fan", st = "Heater", lt = "Custom name", it = "Leave empty to use the Home Assistant name.", rt = "E.g. Upstairs fan", ct = {
  noEntity: W,
  defaultFanLabel: N,
  defaultHeaterLabel: G,
  stateOn: M,
  stateOff: q,
  stateUnavailable: J,
  stateUnknown: Q,
  turnOn: X,
  turnOff: Y,
  settingsTitle: Z,
  entityLabel: tt,
  entityHint: et,
  typeLabel: nt,
  typeHint: at,
  typeFan: ot,
  typeHeater: st,
  labelLabel: lt,
  labelHint: it,
  labelPlaceholder: rt
}, { useState: dt } = window.__OIKOS_SDK__.React, { Fan: bt, Heater: ut, Loader2: yt, Power: ft } = window.__OIKOS_SDK__.icons, { registerCardTranslations: pt, useCardConfig: ht, useDashboard: mt, useStyles: gt, useT: wt } = window.__OIKOS_SDK__;
pt("card-casa-es-ventole-stufetta", { it: R, en: ct });
const vt = {
  entityId: "",
  label: "",
  deviceType: "fan"
};
function Ot({ cardId: y = "casa-es-ventole-stufetta" }) {
  const t = gt(), { t: i } = wt("card-casa-es-ventole-stufetta"), { getState: f, getAttr: p, callService: h, openMoreInfo: m } = mt(), [n] = ht(y, vt, { version: 1 }), [r, u] = dt(!1), c = n.entityId ? f(n.entityId) : null, g = n.entityId ? p(n.entityId, "friendly_name") : null;
  if (!n.entityId)
    return /* @__PURE__ */ a("div", { style: { ...t.card, color: t.tokens.color.muted, ...t.tokens.font.hint, fontStyle: "italic" }, children: i("noEntity") });
  const e = c === "on", o = c === "unavailable" || c === "unknown" || c == null, b = n.deviceType === "heater", w = b ? ut : bt, s = b ? t.tokens.color.amber : t.tokens.color.blue, l = o ? t.tokens.color.muted : e ? s : t.tokens.color.muted, v = n.label || g || i(b ? "defaultHeaterLabel" : "defaultFanLabel"), O = i(o ? c === "unavailable" ? "stateUnavailable" : "stateUnknown" : e ? "stateOn" : "stateOff"), k = async () => {
    if (!(r || o)) {
      u(!0);
      try {
        await Promise.resolve(h("switch", e ? "turn_off" : "turn_on", n.entityId)).catch((S) => console.error("[VentoleStufetta]", S));
      } finally {
        window.setTimeout(() => u(!1), 450);
      }
    }
  };
  return /* @__PURE__ */ d(
    "div",
    {
      style: {
        ...t.card,
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: t.tokens.space.lg,
        background: e ? `color-mix(in srgb, ${s} 9%, var(--bg-card))` : "var(--bg-card)",
        borderColor: e ? `color-mix(in srgb, ${s} 48%, ${t.tokens.color.border})` : t.tokens.color.border,
        boxShadow: e ? `0 0 0 1px color-mix(in srgb, ${s} 16%, transparent)` : void 0,
        transition: "background 180ms ease, border-color 180ms ease, box-shadow 180ms ease"
      },
      children: [
        /* @__PURE__ */ d("div", { style: t.rowBetween, children: [
          /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => m(n.entityId),
              style: {
                ...t.iconButton,
                display: "flex",
                alignItems: "center",
                gap: t.tokens.space.md,
                minWidth: 0,
                color: t.tokens.color.primary,
                textAlign: "left"
              },
              children: [
                /* @__PURE__ */ a(
                  "span",
                  {
                    style: {
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: t.tokens.radius.md,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: l,
                      background: `color-mix(in srgb, ${l} 13%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${l} 35%, transparent)`
                    },
                    children: /* @__PURE__ */ a(
                      w,
                      {
                        size: 26,
                        style: e && !b ? { animation: "spin 2.4s linear infinite" } : void 0
                      }
                    )
                  }
                ),
                /* @__PURE__ */ d("span", { style: { ...t.grow, minWidth: 0 }, children: [
                  /* @__PURE__ */ a(
                    "span",
                    {
                      style: {
                        ...t.title,
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      children: v
                    }
                  ),
                  /* @__PURE__ */ a("span", { style: { ...t.label, display: "block", marginBottom: 0, marginTop: t.tokens.space.xs, color: l }, children: O })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ a(
            "span",
            {
              "aria-hidden": "true",
              style: {
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: "50%",
                background: l,
                boxShadow: e ? `0 0 12px ${l}` : void 0,
                opacity: o ? 0.45 : 1
              }
            }
          )
        ] }),
        /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: k,
            disabled: r || o,
            style: {
              ...e ? t.buttonGhost : t.buttonPrimary,
              width: "100%",
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: t.tokens.space.sm,
              cursor: r || o ? "not-allowed" : "pointer",
              opacity: r || o ? 0.5 : 1,
              color: e ? s : void 0,
              borderColor: e ? s : void 0
            },
            children: [
              r ? /* @__PURE__ */ a(yt, { size: 16, style: { animation: "spin 1.2s linear infinite" } }) : /* @__PURE__ */ a(ft, { size: 16 }),
              /* @__PURE__ */ a("span", { children: i(e ? "turnOff" : "turnOn") })
            ]
          }
        )
      ]
    }
  );
}
export {
  Ot as default
};
