import { MdiIcon, registerCardTranslations, useCardConfig, useDashboard, useStyles, useT } from '@oikos/sdk'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-consumo-dispositivo', { it, en })

const DEFAULT = {
  entityId: '',
  label: '',
  icon: '',
  threshold: 5,
  visibilityMode: 'active',
}

function toWatts(state, unit) {
  const value = Number.parseFloat(state)
  if (!Number.isFinite(value)) return null
  return String(unit || '').toLocaleLowerCase() === 'kw' ? value * 1000 : value
}

function formatPower(value) {
  if (!Number.isFinite(value)) return '—'
  if (value >= 10000) return `${(value / 1000).toFixed(1)} kW`
  return `${Math.round(value)} W`
}

export default function CasaEsConsumoDispositivo({ cardId = 'casa-es-consumo-dispositivo' }) {
  const s = useStyles()
  const { t } = useT('card-casa-es-consumo-dispositivo')
  const { getState, getAttr, openMoreInfo } = useDashboard()
  const [config] = useCardConfig(cardId, DEFAULT, { version: 1 })

  if (!config.entityId) {
    return <div style={{ ...s.card, ...s.body, color: s.tokens.color.muted, textAlign: 'center' }}>{t('configure')}</div>
  }

  const watts = toWatts(getState(config.entityId), getAttr(config.entityId, 'unit_of_measurement'))
  const threshold = Math.max(0, Number(config.threshold) || 0)
  const active = Number.isFinite(watts) && watts > threshold
  if (config.visibilityMode === 'active' && !active) return null

  const accent = !active
    ? s.tokens.color.muted
    : watts > 1200
      ? s.tokens.color.red
      : watts > 500
        ? s.tokens.color.amber
        : s.tokens.color.blue
  const name = config.label || getAttr(config.entityId, 'friendly_name') || config.entityId
  const icon = config.icon || getAttr(config.entityId, 'icon') || 'mdi:power-plug'

  return (
    <button
      type="button"
      onClick={() => openMoreInfo(config.entityId)}
      style={{
        ...s.card,
        width: '100%',
        minWidth: 0,
        minHeight: 120,
        padding: s.tokens.space.lg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: s.tokens.space.md,
        textAlign: 'left',
        color: s.tokens.color.primary,
        cursor: 'pointer',
        border: `1px solid color-mix(in srgb, ${accent} 46%, ${s.tokens.color.border})`,
        background: `radial-gradient(circle at top left, color-mix(in srgb, ${accent} 26%, transparent), var(--bg-card))`,
      }}
    >
      <span style={{ ...s.rowBetween, width: '100%', gap: s.tokens.space.sm }}>
        <MdiIcon name={icon} size={34} color={accent} />
        <strong style={{ ...s.value, color: accent, whiteSpace: 'nowrap' }}>{formatPower(watts)}</strong>
      </span>
      <span style={{ ...s.title, width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
    </button>
  )
}
