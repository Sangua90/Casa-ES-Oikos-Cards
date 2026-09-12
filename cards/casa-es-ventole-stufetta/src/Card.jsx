import { useState } from 'react'
import { Fan, Heater, Loader2, Power } from 'lucide-react'
import {
  registerCardTranslations,
  useCardConfig,
  useDashboard,
  useStyles,
  useT,
} from '@oikos/sdk'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-ventole-stufetta', { it, en })

const DEFAULT = {
  entityId: '',
  label: '',
  deviceType: 'fan',
}

export default function CasaEsVentoleStufetta({ cardId = 'casa-es-ventole-stufetta' }) {
  const s = useStyles()
  const { t } = useT('card-casa-es-ventole-stufetta')
  const { getState, getAttr, callService, openMoreInfo } = useDashboard()
  const [config] = useCardConfig(cardId, DEFAULT, { version: 1 })
  const [busy, setBusy] = useState(false)

  const rawState = config.entityId ? getState(config.entityId) : null
  const friendlyName = config.entityId ? getAttr(config.entityId, 'friendly_name') : null

  if (!config.entityId) {
    return (
      <div style={{ ...s.card, color: s.tokens.color.muted, ...s.tokens.font.hint, fontStyle: 'italic' }}>
        {t('noEntity')}
      </div>
    )
  }

  const isOn = rawState === 'on'
  const isUnavailable = rawState === 'unavailable' || rawState === 'unknown' || rawState == null
  const isHeater = config.deviceType === 'heater'
  const DeviceIcon = isHeater ? Heater : Fan
  const activeColor = isHeater ? s.tokens.color.amber : s.tokens.color.blue
  const accent = isUnavailable ? s.tokens.color.muted : isOn ? activeColor : s.tokens.color.muted
  const label = config.label || friendlyName || t(isHeater ? 'defaultHeaterLabel' : 'defaultFanLabel')
  const stateLabel = isUnavailable
    ? t(rawState === 'unavailable' ? 'stateUnavailable' : 'stateUnknown')
    : t(isOn ? 'stateOn' : 'stateOff')

  const toggle = async () => {
    if (busy || isUnavailable) return
    setBusy(true)
    try {
      await Promise.resolve(callService('switch', isOn ? 'turn_off' : 'turn_on', config.entityId))
        .catch(error => console.error('[VentoleStufetta]', error))
    } finally {
      window.setTimeout(() => setBusy(false), 450)
    }
  }

  return (
    <div
      style={{
        ...s.card,
        width: '100%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: s.tokens.space.lg,
        background: isOn
          ? `color-mix(in srgb, ${activeColor} 9%, var(--bg-card))`
          : 'var(--bg-card)',
        borderColor: isOn
          ? `color-mix(in srgb, ${activeColor} 48%, ${s.tokens.color.border})`
          : s.tokens.color.border,
        boxShadow: isOn
          ? `0 0 0 1px color-mix(in srgb, ${activeColor} 16%, transparent)`
          : undefined,
        transition: 'background 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
      }}
    >
      <div style={s.rowBetween}>
        <button
          type="button"
          onClick={() => openMoreInfo(config.entityId)}
          style={{
            ...s.iconButton,
            display: 'flex',
            alignItems: 'center',
            gap: s.tokens.space.md,
            minWidth: 0,
            color: s.tokens.color.primary,
            textAlign: 'left',
          }}
        >
          <span
            style={{
              width: 48,
              height: 48,
              flexShrink: 0,
              borderRadius: s.tokens.radius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accent,
              background: `color-mix(in srgb, ${accent} 13%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
            }}
          >
            <DeviceIcon
              size={26}
              style={isOn && !isHeater ? { animation: 'spin 2.4s linear infinite' } : undefined}
            />
          </span>
          <span style={{ ...s.grow, minWidth: 0 }}>
            <span
              style={{
                ...s.title,
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
            <span style={{ ...s.label, display: 'block', marginBottom: 0, marginTop: s.tokens.space.xs, color: accent }}>
              {stateLabel}
            </span>
          </span>
        </button>

        <span
          aria-hidden="true"
          style={{
            width: 12,
            height: 12,
            flexShrink: 0,
            borderRadius: '50%',
            background: accent,
            boxShadow: isOn ? `0 0 12px ${accent}` : undefined,
            opacity: isUnavailable ? 0.45 : 1,
          }}
        />
      </div>

      <button
        type="button"
        onClick={toggle}
        disabled={busy || isUnavailable}
        style={{
          ...(isOn ? s.buttonGhost : s.buttonPrimary),
          width: '100%',
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: s.tokens.space.sm,
          cursor: busy || isUnavailable ? 'not-allowed' : 'pointer',
          opacity: busy || isUnavailable ? 0.5 : 1,
          color: isOn ? activeColor : undefined,
          borderColor: isOn ? activeColor : undefined,
        }}
      >
        {busy ? <Loader2 size={16} style={{ animation: 'spin 1.2s linear infinite' }} /> : <Power size={16} />}
        <span>{t(isOn ? 'turnOff' : 'turnOn')}</span>
      </button>
    </div>
  )
}
