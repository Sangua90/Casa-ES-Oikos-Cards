import { House, Zap } from 'lucide-react'
import {
  registerCardTranslations,
  useCardConfig,
  useDashboard,
  useStyles,
  useT,
} from '@oikos/sdk'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-consumo-casa', { it, en })

const DEFAULT = {
  entityId: 'sensor.inverter_solarman_load_power',
  label: 'Consumo Casa',
  warningThreshold: 3000,
  dangerThreshold: 5500,
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

export default function CasaEsConsumoCasa({ cardId = 'casa-es-consumo-casa' }) {
  const s = useStyles()
  const { t } = useT('card-casa-es-consumo-casa')
  const { getState, getAttr, openMoreInfo } = useDashboard()
  const [config] = useCardConfig(cardId, DEFAULT, { version: 1 })

  const watts = config.entityId
    ? toWatts(getState(config.entityId), getAttr(config.entityId, 'unit_of_measurement'))
    : null
  const warning = Math.max(0, Number(config.warningThreshold) || 3000)
  const danger = Math.max(warning, Number(config.dangerThreshold) || 5500)
  const accent = !Number.isFinite(watts)
    ? s.tokens.color.muted
    : watts > danger
      ? s.tokens.color.red
      : watts > warning
        ? s.tokens.color.amber
        : s.tokens.color.blue

  return (
    <button
      type="button"
      onClick={() => config.entityId && openMoreInfo(config.entityId)}
      style={{
        ...s.card,
        width: '100%',
        minWidth: 0,
        minHeight: 150,
        padding: s.tokens.space.lg,
        display: 'flex',
        alignItems: 'center',
        color: s.tokens.color.primary,
        cursor: config.entityId ? 'pointer' : 'default',
        border: `1px solid color-mix(in srgb, ${accent} 48%, ${s.tokens.color.border})`,
        background: `radial-gradient(circle at top left, color-mix(in srgb, ${accent} 28%, transparent), var(--bg-card))`,
      }}
    >
      <span style={{ ...s.rowBetween, width: '100%', gap: s.tokens.space.lg }}>
        <span style={{ ...s.row, minWidth: 0, gap: s.tokens.space.md }}>
          <span style={{ ...s.iconBox, color: accent }}><House size={34} /></span>
          <span style={{ minWidth: 0, textAlign: 'left' }}>
            <span style={{ ...s.title, display: 'block' }}>{config.label || t('title')}</span>
            <span style={{ ...s.row, ...s.hint, color: accent, gap: s.tokens.space.xs }}><Zap size={14} />{t('live')}</span>
          </span>
        </span>
        <strong style={{ ...s.value, color: accent, whiteSpace: 'nowrap' }}>{formatPower(watts)}</strong>
      </span>
    </button>
  )
}
