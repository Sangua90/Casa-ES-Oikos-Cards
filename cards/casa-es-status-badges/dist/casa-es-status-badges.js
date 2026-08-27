const SDK = window.__OIKOS_SDK__;
const React = SDK.React.default ?? SDK.React;
const { useCardConfig, useDashboard, useStyles, MdiIcon } = SDK;
const h = React.createElement;

const DEF = {
  alarm: 'alarm_control_panel.alarmo',
  garage: 'cover.portone_garage',
  guests: 'input_boolean.modalita_ospite',
  batterySoc: 'sensor.inverter_solarman_battery_state_of_charge',
  boilerHeating: 'binary_sensor.ariston_is_heating',
  grid: 'sensor.inverter_solarman_grid_power'
};

function pill(s, icon, label, value, accent, active, onClick) {
  return h('button', {
    type: 'button',
    onClick,
    style: {
      minHeight: 38,
      borderRadius: 999,
      padding: '8px 12px',
      border: `1px solid ${active ? accent : 'var(--border-subtle, rgba(255,255,255,.08))'}`,
      background: active ? `color-mix(in srgb, ${accent} 10%, var(--bg-secondary))` : 'var(--bg-secondary)',
      color: s.tokens.color.primary,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap'
    }
  },
  h(MdiIcon, { name: icon, size: 16, color: active ? accent : s.tokens.color.muted }),
  h('span', { style: { fontSize: 12, fontWeight: 700 } }, label),
  h('span', { style: { fontSize: 12, fontWeight: 800, color: active ? accent : s.tokens.color.muted } }, value));
}

export default function Card({ cardId = 'casa-es-status-badges' }) {
  const s = useStyles();
  const d = useDashboard();
  const [c] = useCardConfig(cardId, DEF);

  const alarm = d.getState(c.alarm);
  const garage = d.getState(c.garage);
  const guests = d.getState(c.guests);
  const soc = d.getFloat(c.batterySoc);
  const boilerHeating = d.getState(c.boilerHeating) === 'on';
  const grid = d.getFloat(c.grid);

  const alarmOn = alarm && alarm !== 'disarmed';
  const garageOpen = garage && garage !== 'closed';
  const guestOn = guests === 'on';
  const lowBattery = Number.isFinite(soc) && soc < 40;
  const gridImport = Number.isFinite(grid) && grid > 100;

  const alarmLabel = ({disarmed:'Disinserito',armed_home:'Casa',armed_night:'Notte',armed_away:'Fuori',triggered:'ALLARME'})[alarm] || alarm || '—';
  const garageLabel = garage === 'closed' ? 'Chiuso' : garage === 'open' ? 'Aperto' : (garage || '—');

  return h('div', {
    style: {
      ...s.card,
      padding: s.tokens.space.sm,
      display: 'flex',
      alignItems: 'center',
      gap: s.tokens.space.xs,
      flexWrap: 'wrap',
      minHeight: 54
    }
  },
  pill(s, 'mdi:shield-home', 'Allarme', alarmLabel, alarm === 'triggered' ? '#ff453a' : s.tokens.color.amber, alarmOn, () => d.openMoreInfo(c.alarm)),
  pill(s, 'mdi:garage', 'Garage', garageLabel, s.tokens.color.amber, garageOpen, () => d.openMoreInfo(c.garage)),
  pill(s, 'mdi:account-star', 'Ospiti', guestOn ? 'Attivi' : 'Off', s.tokens.color.purple, guestOn, () => d.openMoreInfo(c.guests)),
  pill(s, 'mdi:battery', 'Batteria', Number.isFinite(soc) ? `${Math.round(soc)}%` : '—', lowBattery ? '#ff453a' : s.tokens.color.green, lowBattery, () => d.openMoreInfo(c.batterySoc)),
  pill(s, 'mdi:water-boiler', 'Boiler', boilerHeating ? 'Scalda' : 'Pronto', s.tokens.color.amber, boilerHeating, () => d.openMoreInfo(c.boilerHeating)),
  pill(s, 'mdi:transmission-tower', 'Rete', Number.isFinite(grid) ? `${Math.round(grid)} W` : '—', s.tokens.color.blue, gridImport, () => d.openMoreInfo(c.grid))
  );
}
