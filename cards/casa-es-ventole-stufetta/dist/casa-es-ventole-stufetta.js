const { jsx: o, jsxs: r } = window.__OIKOS_SDK__.jsxRuntime, U = "Configura l'entità switch della ventola", z = "Configura gli script Accendi e Spegni della stufetta", D = "Ventola", P = "Stufetta", B = "Accesa", K = "Spenta", j = "Non disponibile", V = "Stato sconosciuto", W = "Accendi", N = "Spegni", R = "Dispositivo", G = "Entità", q = "Seleziona la ventola o la stufetta da controllare.", M = "Tipo", J = "Imposta icona e colore della card.", Q = "Ventola", X = "Stufetta", Y = "Nome personalizzato", Z = "Lascia vuoto per usare il nome di Home Assistant.", tt = "Es. Ventola P1", et = "Script Accendi", nt = "Script Home Assistant che accende la stufetta.", at = "Script Spegni", ot = "Script Home Assistant che spegne la stufetta.", st = "Entità stato reale (facoltativa)", it = "Seleziona l'entità che vale on quando la stufetta è accesa. Se la lasci vuota, la card ricorda l'ultimo comando.", rt = {
  noFanEntity: U,
  noHeaterScripts: z,
  defaultFanLabel: D,
  defaultHeaterLabel: P,
  stateOn: B,
  stateOff: K,
  stateUnavailable: j,
  stateUnknown: V,
  turnOn: W,
  turnOff: N,
  settingsTitle: R,
  entityLabel: G,
  entityHint: q,
  typeLabel: M,
  typeHint: J,
  typeFan: Q,
  typeHeater: X,
  labelLabel: Y,
  labelHint: Z,
  labelPlaceholder: tt,
  heaterOnScriptLabel: et,
  heaterOnScriptHint: nt,
  heaterOffScriptLabel: at,
  heaterOffScriptHint: ot,
  heaterStateLabel: st,
  heaterStateHint: it
}, lt = "Configure the fan switch entity", ct = "Configure the heater On and Off scripts", dt = "Fan", ft = "Heater", ut = "On", pt = "Off", ht = "Unavailable", bt = "Unknown state", yt = "Turn on", St = "Turn off", mt = "Device", Ot = "Entity", gt = "Select the fan or heater to control.", Ht = "Type", vt = "Sets the card icon and active color.", wt = "Fan", kt = "Heater", Lt = "Custom name", $t = "Leave empty to use the Home Assistant name.", xt = "E.g. Upstairs fan", _t = "Turn-on script", Ct = "Home Assistant script that turns the heater on.", It = "Turn-off script", Tt = "Home Assistant script that turns the heater off.", Et = "Live state entity (optional)", Ft = "Select the entity that is on while the heater is running. If left empty, the card remembers the last command.", At = {
  noFanEntity: lt,
  noHeaterScripts: ct,
  defaultFanLabel: dt,
  defaultHeaterLabel: ft,
  stateOn: ut,
  stateOff: pt,
  stateUnavailable: ht,
  stateUnknown: bt,
  turnOn: yt,
  turnOff: St,
  settingsTitle: mt,
  entityLabel: Ot,
  entityHint: gt,
  typeLabel: Ht,
  typeHint: vt,
  typeFan: wt,
  typeHeater: kt,
  labelLabel: Lt,
  labelHint: $t,
  labelPlaceholder: xt,
  heaterOnScriptLabel: _t,
  heaterOnScriptHint: Ct,
  heaterOffScriptLabel: It,
  heaterOffScriptHint: Tt,
  heaterStateLabel: Et,
  heaterStateHint: Ft
}, { useState: Ut } = window.__OIKOS_SDK__.React, { Fan: zt, Heater: Dt, Loader2: H, Power: b } = window.__OIKOS_SDK__.icons, { registerCardTranslations: Pt, useCardConfig: Bt, useDashboard: Kt, useStyles: jt, useT: Vt } = window.__OIKOS_SDK__;
Pt("card-casa-es-ventole-stufetta", { it: rt, en: At });
const Wt = {
  entityId: "",
  label: "",
  deviceType: "fan",
  heaterOnScript: "",
  heaterOffScript: "",
  heaterStateEntity: "",
  heaterAssumedOn: !1
}, Nt = ["on", "true", "home", "heat", "heating", "active", "running"];
function Gt({ cardId: v = "casa-es-ventole-stufetta" }) {
  const t = jt(), { t: l } = Vt("card-casa-es-ventole-stufetta"), { getState: y, getAttr: w, callService: S, openMoreInfo: k } = Kt(), [e, L] = Bt(v, Wt, { version: 2 }), [s, p] = Ut(!1), n = e.deviceType === "heater", u = e.entityId ? y(e.entityId) : null, $ = e.heaterStateEntity ? y(e.heaterStateEntity) : null, x = !n && e.entityId ? w(e.entityId, "friendly_name") : null, m = String($ ?? "").toLowerCase(), _ = !!e.heaterStateEntity && !["", "unknown", "unavailable"].includes(m), a = n ? _ ? Nt.includes(m) : !!e.heaterAssumedOn : u === "on", c = !n && (u === "unavailable" || u === "unknown" || u == null);
  if (!(n ? !!(e.heaterOnScript && e.heaterOffScript) : !!e.entityId))
    return /* @__PURE__ */ o("div", { style: { ...t.card, color: t.tokens.color.muted, ...t.tokens.font.hint, fontStyle: "italic" }, children: l(n ? "noHeaterScripts" : "noFanEntity") });
  const C = n ? Dt : zt, I = n ? a ? t.tokens.color.green : t.tokens.color.red : a ? t.tokens.color.blue : t.tokens.color.muted, i = c ? t.tokens.color.muted : I, T = e.label || x || l(n ? "defaultHeaterLabel" : "defaultFanLabel"), E = l(c ? u === "unavailable" ? "stateUnavailable" : "stateUnknown" : a ? "stateOn" : "stateOff"), F = n ? e.heaterStateEntity || e.heaterOnScript : e.entityId, A = async () => {
    if (!(s || c)) {
      p(!0);
      try {
        await Promise.resolve(S("switch", a ? "turn_off" : "turn_on", e.entityId));
      } catch (d) {
        console.error("[VentoleStufetta]", d);
      } finally {
        window.setTimeout(() => p(!1), 450);
      }
    }
  }, O = async (d) => {
    if (s) return;
    const f = d ? e.heaterOnScript : e.heaterOffScript;
    if (f) {
      p(!0);
      try {
        await Promise.resolve(S("script", "turn_on", f)), L((h) => ({ ...h, heaterAssumedOn: d }));
      } catch (h) {
        console.error("[VentoleStufetta]", h);
      } finally {
        window.setTimeout(() => p(!1), 450);
      }
    }
  }, g = (d, f) => ({
    ...t.buttonGhost,
    width: "100%",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: t.tokens.space.sm,
    cursor: s ? "not-allowed" : "pointer",
    opacity: s ? 0.5 : 1,
    color: f,
    borderColor: d ? f : t.tokens.color.border,
    background: d ? `color-mix(in srgb, ${f} 13%, transparent)` : void 0
  });
  return /* @__PURE__ */ r(
    "div",
    {
      style: {
        ...t.card,
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        gap: t.tokens.space.lg,
        background: `color-mix(in srgb, ${i} ${n ? 14 : a ? 9 : 4}%, var(--bg-card))`,
        borderColor: `color-mix(in srgb, ${i} ${n ? 64 : a ? 48 : 24}%, ${t.tokens.color.border})`,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${i} ${n ? 20 : a ? 16 : 5}%, transparent)`,
        transition: "background 180ms ease, border-color 180ms ease, box-shadow 180ms ease"
      },
      children: [
        /* @__PURE__ */ r("div", { style: t.rowBetween, children: [
          /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              onClick: () => k(F),
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
                /* @__PURE__ */ o(
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
                      color: i,
                      background: `color-mix(in srgb, ${i} 13%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${i} 35%, transparent)`
                    },
                    children: /* @__PURE__ */ o(C, { size: 26, style: a && !n ? { animation: "spin 2.4s linear infinite" } : void 0 })
                  }
                ),
                /* @__PURE__ */ r("span", { style: { ...t.grow, minWidth: 0 }, children: [
                  /* @__PURE__ */ o("span", { style: { ...t.title, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: T }),
                  /* @__PURE__ */ o("span", { style: { ...t.label, display: "block", marginBottom: 0, marginTop: t.tokens.space.xs, color: i }, children: E })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o(
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
                opacity: c ? 0.45 : 1
              }
            }
          )
        ] }),
        n ? /* @__PURE__ */ r("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: t.tokens.space.sm }, children: [
          /* @__PURE__ */ r("button", { type: "button", onClick: () => O(!0), disabled: s, style: g(a, t.tokens.color.green), children: [
            s ? /* @__PURE__ */ o(H, { size: 16, style: { animation: "spin 1.2s linear infinite" } }) : /* @__PURE__ */ o(b, { size: 16 }),
            /* @__PURE__ */ o("span", { children: l("turnOn") })
          ] }),
          /* @__PURE__ */ r("button", { type: "button", onClick: () => O(!1), disabled: s, style: g(!a, t.tokens.color.red), children: [
            /* @__PURE__ */ o(b, { size: 16 }),
            /* @__PURE__ */ o("span", { children: l("turnOff") })
          ] })
        ] }) : /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            onClick: A,
            disabled: s || c,
            style: {
              ...a ? t.buttonGhost : t.buttonPrimary,
              width: "100%",
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: t.tokens.space.sm,
              cursor: s || c ? "not-allowed" : "pointer",
              opacity: s || c ? 0.5 : 1,
              color: a ? t.tokens.color.blue : void 0,
              borderColor: a ? t.tokens.color.blue : void 0
            },
            children: [
              s ? /* @__PURE__ */ o(H, { size: 16, style: { animation: "spin 1.2s linear infinite" } }) : /* @__PURE__ */ o(b, { size: 16 }),
              /* @__PURE__ */ o("span", { children: l(a ? "turnOff" : "turnOn") })
            ]
          }
        )
      ]
    }
  );
}
export {
  Gt as default
};
