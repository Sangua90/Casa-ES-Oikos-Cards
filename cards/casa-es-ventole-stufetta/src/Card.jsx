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
  heaterOnScript: '',
  heaterOffScript: '',
  heaterStateEntity: '',
  heaterAssumedOn: false,
}

const ON_STATES = ['on', 'true', 'home', 'heat', 'heating', 'active', 'running']

export default function CasaEsVentoleStufetta({ cardId = 'casa-es-ventole-stufetta' }) {
  const s = useStyles()
  const { t } = useT('card-casa-es-ventole-stufetta')
  const { getState, getAttr, callService, openMoreInfo } = useDashboard()
  const [config, setConfig] = useCardConfig(cardId, DEFAULT, { version: 2 })
  const [busy, setBusy] = useState(false)

  const isHeater = config.deviceType === 'heater'
  const fanState = config.entityId ? getState(config.entityId) : null
  const heaterState = config.heaterStateEntity ? getState(config.heaterStateEntity) : null
  const friendlyName = !isHeater && config.entityId ? getAttr(config.entityId, 'friendly_name') : null
  const normalizedHeaterState = String(heaterState ?? '').toLowerCase()
  const hasLiveHeaterState = Boolean(config.heaterStateEntity) && !['', 'unknown', 'unavailable'].includes(normalizedHeaterState)
  const isOn = isHeater
    ? hasLiveHeaterState
      ? ON_STATES.includes(normalizedHeaterState)
      : Boolean(config.heaterAssumedOn)
    : fanState === 'on'
  const fanUnavailable = !isHeater && (fanState === 'unavailable' || fanState === 'unknown' || fanState == null)
  const configured = isHeater
    ? Boolean(config.heaterOnScript && config.heaterOffScript)
    : Boolean(config.entityId)

  if (!configured) {
    return (
      <div style={{ ...s.card, color: s.tokens.color.muted, ...s.tokens.font.hint, fontStyle: 'italic' }}>
        {t(isHeater ? 'noHeaterScripts' : 'noFanEntity')}
      </div>
    )
  }

  const DeviceIcon = isHeater ? Heater : Fan
  const activeColor = isHeater
    ? isOn ? s.tokens.color.green : s.tokens.color.red
    : isOn ? s.tokens.color.blue : s.tokens.color.muted
  const accent = fanUnavailable ? s.tokens.color.muted : activeColor
  const label = config.label || friendlyName || t(isHeater ? 'defaultHeaterLabel' : 'defaultFanLabel')
  const stateLabel = fanUnavailable
    ? t(fanState === 'unavailable' ? 'stateUnavailable' : 'stateUnknown')
    : t(isOn ? 'stateOn' : 'stateOff')
  const moreInfoEntity = isHeater ? config.heaterStateEntity || config.heaterOnScript : config.entityId

  const runFan = async () => {
    if (busy || fanUnavailable) return
    setBusy(true)
    try {
      await Promise.resolve(callService('switch', isOn ? 'turn_off' : 'turn_on', config.entityId))
    } catch (error) {
      console.error('[VentoleStufetta]', error)
    } finally {
      window.setTimeout(() => setBusy(false), 450)
    }
  }

  const runHeater = async nextOn => {
    if (busy) return
    const scriptEntity = nextOn ? config.heaterOnScript : config.heaterOffScript
    if (!scriptEntity) return
    setBusy(true)
    try {
      await Promise.resolve(callService('script', 'turn_on', scriptEntity))
      setConfig(previous => ({ ...previous, heaterAssumedOn: nextOn }))
    } catch (error) {
      console.error('[VentoleStufetta]', error)
    } finally {
      window.setTimeout(() => setBusy(false), 450)
    }
  }

  const controlStyle = (selected, color) => ({
    ...s.buttonGhost,
    width: '100%',
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.tokens.space.sm,
    cursor: busy ? 'not-allowed' : 'pointer',
    opacity: busy ? 0.5 : 1,
    color,
    borderColor: selected ? color : s.tokens.color.border,
    background: selected ? `color-mix(in srgb, ${color} 13%, transparent)` : undefined,
  })

  return (
    <div
      style={{
        ...s.card,
        width: '100%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: s.tokens.space.lg,
        background: `color-mix(in srgb, ${accent} ${isHeater ? 14 : isOn ? 9 : 4}%, var(--bg-card))`,
        borderColor: `color-mix(in srgb, ${accent} ${isHeater ? 64 : isOn ? 48 : 24}%, ${s.tokens.color.border})`,
        boxShadow: `0 0 0 1px color-mix(in srgb, ${accent} ${isHeater ? 20 : isOn ? 16 : 5}%, transparent)`,
        transition: 'background 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
      }}
    >
      <div style={s.rowBetween}>
        <button
          type="button"
          onClick={() => openMoreInfo(moreInfoEntity)}
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
            <DeviceIcon size={26} style={isOn && !isHeater ? { animation: 'spin 2.4s linear infinite' } : undefined} />
          </span>
          <span style={{ ...s.grow, minWidth: 0 }}>
            <span style={{ ...s.title, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
            boxShadow: `0 0 12px ${accent}`,
            opacity: fanUnavailable ? 0.45 : 1,
          }}
        />
      </div>

      {isHeater ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: s.tokens.space.sm }}>
          <button type="button" onClick={() => runHeater(true)} disabled={busy} style={controlStyle(isOn, s.tokens.color.green)}>
            {busy ? <Loader2 size={16} style={{ animation: 'spin 1.2s linear infinite' }} /> : <Power size={16} />}
            <span>{t('turnOn')}</span>
          </button>
          <button type="button" onClick={() => runHeater(false)} disabled={busy} style={controlStyle(!isOn, s.tokens.color.red)}>
            <Power size={16} />
            <span>{t('turnOff')}</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={runFan}
          disabled={busy || fanUnavailable}
          style={{
            ...(isOn ? s.buttonGhost : s.buttonPrimary),
            width: '100%',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: s.tokens.space.sm,
            cursor: busy || fanUnavailable ? 'not-allowed' : 'pointer',
            opacity: busy || fanUnavailable ? 0.5 : 1,
            color: isOn ? s.tokens.color.blue : undefined,
            borderColor: isOn ? s.tokens.color.blue : undefined,
          }}
        >
          {busy ? <Loader2 size={16} style={{ animation: 'spin 1.2s linear infinite' }} /> : <Power size={16} />}
          <span>{t(isOn ? 'turnOff' : 'turnOn')}</span>
        </button>
      )}
    </div>
  )
}
