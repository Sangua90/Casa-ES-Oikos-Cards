const { jsxs: o, jsx: t } = window.__OIKOS_SDK__.jsxRuntime, r = `# oikos:package_id: casa_es_raccolta_differenziata
# oikos:package_version: 1.1.0
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
              {{ raccolte_agenda.get('calendar.raccolta_rifiuti', {}).get('events', []) | to_json }}
            {% else %}
              {{ [] | to_json }}
            {% endif %}
`, d = "Raccolta Differenziata", g = "Questa sera", p = "Da esporre questa sera", u = "Nessun rifiuto da esporre questa sera", _ = "Raccolta successiva", f = "Nessuna raccolta prevista", m = "Controlla il calendario o installa il package Home Assistant dalle impostazioni.", h = "Vista limitata al prossimo evento", C = "Calendario e visualizzazione", k = "Calendario rifiuti", b = "Calendario Home Assistant che contiene le raccolte.", H = "Sensore agenda", v = "Creato automaticamente dal package per leggere più eventi futuri.", L = "Supporto calendario Home Assistant", T = "Installa il sensore che legge tutti gli eventi futuri da calendar.raccolta_rifiuti.", $ = {
  title: d,
  tonight: g,
  exposeTonight: p,
  nothingTonight: u,
  upcomingCollections: _,
  noCollections: f,
  noCollectionsHint: m,
  limitedMode: h,
  settingsTitle: C,
  calendarLabel: k,
  calendarHint: b,
  sensorLabel: H,
  sensorHint: v,
  packageLabel: L,
  packageDescription: T
}, D = "Recycling Collection", x = "Tonight", y = "Put out tonight", z = "Nothing to put out tonight", S = "Next collection", A = "No collection scheduled", I = "Check the calendar or install the Home Assistant package in settings.", w = "Limited to the next calendar event", R = "Calendar and display", j = "Waste calendar", N = "Home Assistant calendar containing the collections.", E = "Agenda sensor", K = "Automatically created by the package to read multiple future events.", M = "Home Assistant calendar support", O = "Installs the sensor that reads future events from calendar.raccolta_rifiuti.", P = {
  title: D,
  tonight: x,
  exposeTonight: y,
  nothingTonight: z,
  upcomingCollections: S,
  noCollections: A,
  noCollectionsHint: I,
  limitedMode: w,
  settingsTitle: R,
  calendarLabel: j,
  calendarHint: N,
  sensorLabel: E,
  sensorHint: K,
  packageLabel: M,
  packageDescription: O
}, { EntityField: i, Field: s, PackageSection: q, Section: F, registerCardTranslations: Q, useCardConfig: U, usePackageInstaller: V, useT: W } = window.__OIKOS_SDK__;
Q("card-casa-es-raccolta", { it: $, en: P });
const B = {
  calendarId: "calendar.raccolta_rifiuti",
  sensorId: "sensor.casa_es_raccolta_differenziata"
};
function G({ cardId: c }) {
  const { t: e } = W("card-casa-es-raccolta"), [n, a] = U(c, B, { version: 1 }), l = V({ name: "casa_es_raccolta_differenziata", yaml: r });
  return /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ t(
      q,
      {
        pkg: l,
        label: e("packageLabel"),
        description: e("packageDescription")
      }
    ),
    /* @__PURE__ */ o(F, { title: e("settingsTitle"), children: [
      /* @__PURE__ */ t(s, { label: e("calendarLabel"), hint: e("calendarHint"), children: /* @__PURE__ */ t(
        i,
        {
          field: "calendarId",
          config: n,
          setConfig: a,
          filterDomain: "calendar"
        }
      ) }),
      /* @__PURE__ */ t(s, { label: e("sensorLabel"), hint: e("sensorHint"), children: /* @__PURE__ */ t(
        i,
        {
          field: "sensorId",
          config: n,
          setConfig: a,
          filterDomain: "sensor"
        }
      ) })
    ] })
  ] });
}
export {
  G as default
};
