const { jsxs: c, jsx: e } = window.__OIKOS_SDK__.jsxRuntime, u = `# oikos:package_id: casa_es_raccolta_differenziata
# oikos:package_version: 1.0.0
template:
  - trigger:
      - platform: homeassistant
        event: start
      - platform: time_pattern
        minutes: "/30"
    action:
      - action: calendar.get_events
        target:
          entity_id: calendar.raccolta_rifiuti
        data:
          start_date_time: "{{ now().isoformat() }}"
          end_date_time: "{{ (now() + timedelta(days=15)).isoformat() }}"
        response_variable: raccolte_agenda
    sensor:
      - name: "Casa ES Raccolta Differenziata"
        unique_id: casa_es_raccolta_differenziata
        state: >-
          {% if raccolte_agenda is defined %}
            {{ raccolte_agenda.get('calendar.raccolta_rifiuti', {}).get('events', []) | count }}
          {% else %}
            0
          {% endif %}
        attributes:
          calendar_entity: "calendar.raccolta_rifiuti"
          updated_at: "{{ now().isoformat() }}"
          events: >-
            {% if raccolte_agenda is defined %}
              {{ raccolte_agenda.get('calendar.raccolta_rifiuti', {}).get('events', []) }}
            {% else %}
              {{ [] }}
            {% endif %}
`, f = "Raccolta Differenziata", y = "Oggi", _ = "Domani", b = "Tra {{count}} giorni", C = "Prossima raccolta", L = "Nessuna raccolta prevista", H = "Controlla il calendario o installa il package Home Assistant dalle impostazioni.", h = "Vista limitata al prossimo evento", v = "+{{count}} altre", k = "Calendario e visualizzazione", $ = "Calendario rifiuti", D = "Calendario Home Assistant che contiene le raccolte.", w = "Sensore agenda", z = "Creato automaticamente dal package per leggere più eventi futuri.", T = "Intervallo visualizzato", x = "Layout compatto", I = "Riduce gli spazi per mostrare più giorni.", S = "Supporto calendario Home Assistant", A = "Installa il sensore che legge tutti gli eventi futuri da calendar.raccolta_rifiuti.", R = "3 giorni", O = "7 giorni", P = "14 giorni", E = {
  title: f,
  today: y,
  tomorrow: _,
  inDays: b,
  nextCollection: C,
  noCollections: L,
  noCollectionsHint: H,
  limitedMode: h,
  moreCount: v,
  settingsTitle: k,
  calendarLabel: $,
  calendarHint: D,
  sensorLabel: w,
  sensorHint: z,
  rangeLabel: T,
  compactLabel: x,
  compactHint: I,
  packageLabel: S,
  packageDescription: A,
  days3: R,
  days7: O,
  days14: P
}, K = "Recycling Collection", M = "Today", j = "Tomorrow", F = "In {{count}} days", N = "Next collection", q = "No collection scheduled", U = "Check the calendar or install the Home Assistant package in settings.", V = "Limited to the next calendar event", W = "+{{count}} more", B = "Calendar and display", G = "Waste calendar", J = "Home Assistant calendar containing the collections.", Q = "Agenda sensor", X = "Automatically created by the package to read multiple future events.", Y = "Displayed range", Z = "Compact layout", aa = "Reduces spacing to show more days.", ea = "Home Assistant calendar support", ta = "Installs the sensor that reads future events from calendar.raccolta_rifiuti.", na = "3 days", oa = "7 days", sa = "14 days", ia = {
  title: K,
  today: M,
  tomorrow: j,
  inDays: F,
  nextCollection: N,
  noCollections: q,
  noCollectionsHint: U,
  limitedMode: V,
  moreCount: W,
  settingsTitle: B,
  calendarLabel: G,
  calendarHint: J,
  sensorLabel: Q,
  sensorHint: X,
  rangeLabel: Y,
  compactLabel: Z,
  compactHint: aa,
  packageLabel: ea,
  packageDescription: ta,
  days3: na,
  days7: oa,
  days14: sa
}, { EntityField: l, Field: s, PackageSection: ca, Pills: la, Section: ra, SettingsRow: da, Toggle: ga, registerCardTranslations: ma, useCardConfig: pa, usePackageInstaller: ua, useT: fa } = window.__OIKOS_SDK__;
ma("card-casa-es-raccolta", { it: E, en: ia });
const ya = {
  calendarId: "calendar.raccolta_rifiuti",
  sensorId: "sensor.casa_es_raccolta_differenziata",
  days: 7,
  compact: !1
};
function _a({ cardId: r }) {
  const { t: a } = fa("card-casa-es-raccolta"), [n, o] = pa(r, ya, { version: 1 }), d = ua({ name: "casa_es_raccolta_differenziata", yaml: u }), i = (t, m) => o((p) => ({ ...p, [t]: m })), g = [
    { value: 3, label: a("days3") },
    { value: 7, label: a("days7") },
    { value: 14, label: a("days14") }
  ];
  return /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ e(
      ca,
      {
        pkg: d,
        label: a("packageLabel"),
        description: a("packageDescription")
      }
    ),
    /* @__PURE__ */ c(ra, { title: a("settingsTitle"), children: [
      /* @__PURE__ */ e(s, { label: a("calendarLabel"), hint: a("calendarHint"), children: /* @__PURE__ */ e(
        l,
        {
          field: "calendarId",
          config: n,
          setConfig: o,
          filterDomain: "calendar"
        }
      ) }),
      /* @__PURE__ */ e(s, { label: a("sensorLabel"), hint: a("sensorHint"), children: /* @__PURE__ */ e(
        l,
        {
          field: "sensorId",
          config: n,
          setConfig: o,
          filterDomain: "sensor"
        }
      ) }),
      /* @__PURE__ */ e(s, { label: a("rangeLabel"), children: /* @__PURE__ */ e(la, { options: g, value: n.days, onChange: (t) => i("days", t) }) }),
      /* @__PURE__ */ e(da, { label: a("compactLabel"), hint: a("compactHint"), children: /* @__PURE__ */ e(ga, { value: n.compact, onChange: (t) => i("compact", t) }) })
    ] })
  ] });
}
export {
  _a as default
};
