const { jsxs: c, jsx: e, Fragment: b } = window.__OIKOS_SDK__.jsxRuntime, S = "Configura l'entità switch della ventola", d = "Configura gli script Accendi e Spegni della stufetta", u = "Ventola", y = "Stufetta", H = "Accesa", O = "Spenta", L = "Non disponibile", v = "Stato sconosciuto", m = "Accendi", $ = "Spegni", g = "Dispositivo", F = "Entità", T = "Seleziona la ventola o la stufetta da controllare.", E = "Tipo", w = "Imposta icona e colore della card.", A = "Ventola", C = "Stufetta", U = "Nome personalizzato", _ = "Lascia vuoto per usare il nome di Home Assistant.", D = "Es. Ventola P1", P = "Script Accendi", I = "Script Home Assistant che accende la stufetta.", k = "Script Spegni", x = "Script Home Assistant che spegne la stufetta.", z = "Entità stato reale (facoltativa)", K = "Seleziona l'entità che vale on quando la stufetta è accesa. Se la lasci vuota, la card ricorda l'ultimo comando.", V = {
  noFanEntity: S,
  noHeaterScripts: d,
  defaultFanLabel: u,
  defaultHeaterLabel: y,
  stateOn: H,
  stateOff: O,
  stateUnavailable: L,
  stateUnknown: v,
  turnOn: m,
  turnOff: $,
  settingsTitle: g,
  entityLabel: F,
  entityHint: T,
  typeLabel: E,
  typeHint: w,
  typeFan: A,
  typeHeater: C,
  labelLabel: U,
  labelHint: _,
  labelPlaceholder: D,
  heaterOnScriptLabel: P,
  heaterOnScriptHint: I,
  heaterOffScriptLabel: k,
  heaterOffScriptHint: x,
  heaterStateLabel: z,
  heaterStateHint: K
}, j = "Configure the fan switch entity", N = "Configure the heater On and Off scripts", q = "Fan", R = "Heater", B = "On", G = "Off", J = "Unavailable", M = "Unknown state", Q = "Turn on", W = "Turn off", X = "Device", Y = "Entity", Z = "Select the fan or heater to control.", tt = "Type", et = "Sets the card icon and active color.", at = "Fan", nt = "Heater", it = "Custom name", lt = "Leave empty to use the Home Assistant name.", st = "E.g. Upstairs fan", ot = "Turn-on script", ct = "Home Assistant script that turns the heater on.", rt = "Turn-off script", ft = "Home Assistant script that turns the heater off.", ht = "Live state entity (optional)", pt = "Select the entity that is on while the heater is running. If left empty, the card remembers the last command.", bt = {
  noFanEntity: j,
  noHeaterScripts: N,
  defaultFanLabel: q,
  defaultHeaterLabel: R,
  stateOn: B,
  stateOff: G,
  stateUnavailable: J,
  stateUnknown: M,
  turnOn: Q,
  turnOff: W,
  settingsTitle: X,
  entityLabel: Y,
  entityHint: Z,
  typeLabel: tt,
  typeHint: et,
  typeFan: at,
  typeHeater: nt,
  labelLabel: it,
  labelHint: lt,
  labelPlaceholder: st,
  heaterOnScriptLabel: ot,
  heaterOnScriptHint: ct,
  heaterOffScriptLabel: rt,
  heaterOffScriptHint: ft,
  heaterStateLabel: ht,
  heaterStateHint: pt
}, { EntityField: s, Field: n, Pills: St, Section: dt, TextField: ut, registerCardTranslations: yt, useCardConfig: Ht, useT: Ot } = window.__OIKOS_SDK__;
yt("card-casa-es-ventole-stufetta", { it: V, en: bt });
const Lt = {
  entityId: "",
  label: "",
  deviceType: "fan",
  heaterOnScript: "",
  heaterOffScript: "",
  heaterStateEntity: "",
  heaterAssumedOn: !1
};
function vt({ cardId: r }) {
  const { t } = Ot("card-casa-es-ventole-stufetta"), [a, i] = Ht(r, Lt, { version: 2 }), o = (l, h) => i((p) => ({ ...p, [l]: h })), f = [
    { value: "fan", label: t("typeFan") },
    { value: "heater", label: t("typeHeater") }
  ];
  return /* @__PURE__ */ c(dt, { title: t("settingsTitle"), children: [
    /* @__PURE__ */ e(n, { label: t("typeLabel"), hint: t("typeHint"), children: /* @__PURE__ */ e(St, { options: f, value: a.deviceType, onChange: (l) => o("deviceType", l) }) }),
    a.deviceType === "heater" ? /* @__PURE__ */ c(b, { children: [
      /* @__PURE__ */ e(n, { label: t("heaterOnScriptLabel"), hint: t("heaterOnScriptHint"), children: /* @__PURE__ */ e(s, { field: "heaterOnScript", config: a, setConfig: i, filterDomain: "script" }) }),
      /* @__PURE__ */ e(n, { label: t("heaterOffScriptLabel"), hint: t("heaterOffScriptHint"), children: /* @__PURE__ */ e(s, { field: "heaterOffScript", config: a, setConfig: i, filterDomain: "script" }) }),
      /* @__PURE__ */ e(n, { label: t("heaterStateLabel"), hint: t("heaterStateHint"), children: /* @__PURE__ */ e(s, { field: "heaterStateEntity", config: a, setConfig: i }) })
    ] }) : /* @__PURE__ */ e(n, { label: t("entityLabel"), hint: t("entityHint"), children: /* @__PURE__ */ e(s, { field: "entityId", config: a, setConfig: i, filterDomain: "switch" }) }),
    /* @__PURE__ */ e(n, { label: t("labelLabel"), hint: t("labelHint"), children: /* @__PURE__ */ e(ut, { value: a.label, onChange: (l) => o("label", l), placeholder: t("labelPlaceholder") }) })
  ] });
}
export {
  vt as default
};
