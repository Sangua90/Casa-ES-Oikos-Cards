import { useMemo } from 'react'
import {
  Droplets,
  Flame,
  House,
  Monitor,
  Plug,
  Thermometer,
  WashingMachine,
  Waves,
  Wind,
  Zap,
} from 'lucide-react'
import {
  registerCardTranslations,
  useCardConfig,
  useDashboard,
  useStyles,
  useT,
} from '@oikos/sdk'
import { DEFAULT_CONFIG, DEVICE_DEFINITIONS } from './devices'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-consumi', { it, en })

const ICONS = {
  droplets: Droplets,
  flame: Flame,
  monitor: Monitor,
  plug: Plug,
  thermometer: Thermometer,
  washer: WashingMachine,
  waves: Waves,
  wind: Wind,
  zap: Zap,
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

function deviceAccent(value, tokens) {
  if (value > 1200) return tokens.color.red
  if (value > 500) return tokens.color.amber
  return tokens.color.blue
}

function totalAccent(value, tokens) {
  if (!Number.isFinite(value)) return tokens.color.muted
  if (value > 5500) return tokens.color.red
  if (value > 3000) return tokens.color.amber
  return tokens.color.blue
}

export default function CasaEsConsumi({ cardId = 'casa-es-consumi' }) {
  const s = useStyles()
  const { t } = useT('card-casa-es-consumi')
  const { getState, getAttr, openMoreInfo } = useDashboard()
  const [config] = useCardConfig(cardId, DEFAULT_CONFIG, { version: 1 })

  const total = config.totalEntity
    ? toWatts(getState(config.totalEntity), getAttr(config.totalEntity, 'unit_of_measurement'))
    : null
  const totalColor = totalAccent(total, s.tokens)

  const devices = useMemo(() => DEVICE_DEFINITIONS
    .map(device => {
      const entityId = config[`${device.key}Entity`]
      const value = entityId
        ? toWatts(getState(entityId), getAttr(entityId, 'unit_of_measurement'))
        : null
      const threshold = Math.max(0, Number(config[`${device.key}Threshold`]) || 0)
      return {
        ...device,
        entityId,
        label: config[`${device.key}Label`] || device.name,
        value,
        threshold,
        active: Number.isFinite(value) && value > threshold,
      }
    })
    .filter(device => device.entityId && Number.isFinite(device.value) && (config.visibilityMode === 'all' || device.active))
    .sort((a, b) => b.value - a.value), [config, getAttr, getState])

  return (
    <div style={{ ...s.card, display: 'flex', flexDirection: 'column', gap: s.tokens.space.md, minWidth: 0 }}>
      <button
        type="button"
        onClick={() => config.totalEntity && openMoreInfo(config.totalEntity)}
        style={{
          ...s.cardInset,
          width: '100%',
          minWidth: 0,
          padding: s.tokens.space.lg,
          border: `1px solid color-mix(in srgb, ${totalColor} 48%, ${s.tokens.color.border})`,
          background: `radial-gradient(circle at top left, color-mix(in srgb, ${totalColor} 24%, transparent), var(--bg-card))`,
          color: s.tokens.color.primary,
          cursor: config.totalEntity ? 'pointer' : 'default',
        }}
      >
        <span style={{ ...s.rowBetween, width: '100%', gap: s.tokens.space.md }}>
          <span style={{ ...s.row, minWidth: 0, gap: s.tokens.space.md }}>
            <span style={{ ...s.iconBox, color: totalColor }}><House size={30} /></span>
            <span style={{ minWidth: 0, textAlign: 'left' }}>
              <span style={{ ...s.title, display: 'block' }}>{config.totalLabel || t('total')}</span>
              <span style={{ ...s.hint, color: totalColor }}>{t('live')}</span>
            </span>
          </span>
          <strong style={{ ...s.value, color: totalColor, whiteSpace: 'nowrap' }}>{formatPower(total)}</strong>
        </span>
      </button>

      {devices.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: s.tokens.space.sm, minWidth: 0 }}>
          {devices.map(device => {
            const Icon = ICONS[device.icon] || Zap
            const accent = device.active ? deviceAccent(device.value, s.tokens) : s.tokens.color.muted
            return (
              <button
                key={device.key}
                type="button"
                onClick={() => openMoreInfo(device.entityId)}
                style={{
                  ...s.cardInset,
                  minWidth: 0,
                  minHeight: 108,
                  padding: s.tokens.space.md,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: s.tokens.space.md,
                  textAlign: 'left',
                  color: s.tokens.color.primary,
                  cursor: 'pointer',
                  border: `1px solid color-mix(in srgb, ${accent} 42%, ${s.tokens.color.border})`,
                  background: `radial-gradient(circle at top left, color-mix(in srgb, ${accent} 20%, transparent), var(--bg-card))`,
                }}
              >
                <span style={{ ...s.rowBetween, width: '100%', gap: s.tokens.space.sm }}>
                  <Icon size={24} color={accent} />
                  <strong style={{ ...s.title, color: accent, whiteSpace: 'nowrap' }}>{formatPower(device.value)}</strong>
                </span>
                <span style={{ ...s.body, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                  {device.label}
                </span>
              </button>
            )
          })}
        </div>
      ) : (
        <div style={{ ...s.cardInset, ...s.body, color: s.tokens.color.muted, textAlign: 'center' }}>{t('nothingActive')}</div>
      )}
    </div>
  )
}
