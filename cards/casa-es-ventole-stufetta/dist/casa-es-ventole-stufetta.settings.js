const { jsxs: f, jsx: e } = window.__OIKOS_SDK__.jsxRuntime, d = "Configura un'entità switch nelle impostazioni della card", y = "Ventola", u = "Stufetta", p = "Accesa", H = "Spenta", L = "Non disponibile", h = "Stato sconosciuto", O = "Accendi", v = "Spegni", $ = "Dispositivo", g = "Entità", T = "Seleziona la ventola o la stufetta da controllare.", F = "Tipo", S = "Imposta icona e colore della card.", m = "Ventola", w = "Stufetta", U = "Nome personalizzato", E = "Lascia vuoto per usare il nome di Home Assistant.", C = "Es. Ventola P1", _ = {
  noEntity: d,
  defaultFanLabel: y,
  defaultHeaterLabel: u,
  stateOn: p,
  stateOff: H,
  stateUnavailable: L,
  stateUnknown: h,
  turnOn: O,
  turnOff: v,
  settingsTitle: $,
  entityLabel: g,
  entityHint: T,
  typeLabel: F,
  typeHint: S,
  typeFan: m,
  typeHeater: w,
  labelLabel: U,
  labelHint: E,
  labelPlaceholder: C
}, P = "Configure a switch entity in the card settings", D = "Fan", k = "Heater", x = "On", A = "Off", I = "Unavailable", z = "Unknown state", K = "Turn on", V = "Turn off", j = "Device", N = "Entity", R = "Select the fan or heater to control.", q = "Type", B = "Sets the card icon and active color.", G = "Fan", J = "Heater", M = "Custom name", Q = "Leave empty to use the Home Assistant name.", W = "E.g. Upstairs fan", X = {
  noEntity: P,
  defaultFanLabel: D,
  defaultHeaterLabel: k,
  stateOn: x,
  stateOff: A,
  stateUnavailable: I,
  stateUnknown: z,
  turnOn: K,
  turnOff: V,
  settingsTitle: j,
  entityLabel: N,
  entityHint: R,
  typeLabel: q,
  typeHint: B,
  typeFan: G,
  typeHeater: J,
  labelLabel: M,
  labelHint: Q,
  labelPlaceholder: W
}, { EntityField: Y, Field: l, Pills: Z, Section: tt, TextField: et, registerCardTranslations: nt, useCardConfig: at, useT: lt } = window.__OIKOS_SDK__;
nt("card-casa-es-ventole-stufetta", { it: _, en: X });
const st = {
  entityId: "",
  label: "",
  deviceType: "fan"
};
function ot({ cardId: i }) {
  const { t } = lt("card-casa-es-ventole-stufetta"), [a, s] = at(i, st, { version: 1 }), o = (n, r) => s((b) => ({ ...b, [n]: r })), c = [
    { value: "fan", label: t("typeFan") },
    { value: "heater", label: t("typeHeater") }
  ];
  return /* @__PURE__ */ f(tt, { title: t("settingsTitle"), children: [
    /* @__PURE__ */ e(l, { label: t("entityLabel"), hint: t("entityHint"), children: /* @__PURE__ */ e(
      Y,
      {
        field: "entityId",
        config: a,
        setConfig: s,
        filterDomain: "switch"
      }
    ) }),
    /* @__PURE__ */ e(l, { label: t("typeLabel"), hint: t("typeHint"), children: /* @__PURE__ */ e(Z, { options: c, value: a.deviceType, onChange: (n) => o("deviceType", n) }) }),
    /* @__PURE__ */ e(l, { label: t("labelLabel"), hint: t("labelHint"), children: /* @__PURE__ */ e(
      et,
      {
        value: a.label,
        onChange: (n) => o("label", n),
        placeholder: t("labelPlaceholder")
      }
    ) })
  ] });
}
export {
  ot as default
};
