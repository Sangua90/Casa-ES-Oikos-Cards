import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowDown,
  ArrowUp,
  DoorClosed,
  DoorOpen,
  Loader2,
  Octagon,
  TriangleAlert,
} from 'lucide-react'
import {
  getOverlayRoot,
  registerCardTranslations,
  useCardConfig,
  useDashboard,
  useStyles,
  useT,
} from '@oikos/sdk'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-garage', { it, en })

const DEFAULT = {
  entityId: 'cover.portone_garage',
  label: '',
  confirmOpen: true,
  confirmClose: true,
}

export default function CasaEsGarage({ cardId = 'casa-es-garage' }) {
  const s = useStyles()
  const { t } = useT('card-casa-es-garage')
  const { getState, getAttr, callService, openMoreInfo } = useDashboard()
  const [config] = useCardConfig(cardId, DEFAULT, { version: 1 })
  const [busyAction, setBusyAction] = useState('')
  const [pendingAction, setPendingAction] = useState('')

  const rawState = config.entityId ? getState(config.entityId) : null
  const friendlyName = config.entityId ? getAttr(config.entityId, 'friendly_name') : null

  if (!config.entityId) {
    return (
      <div style={{ ...s.card, color: s.tokens.color.muted, ...s.tokens.font.hint, fontStyle: 'italic' }}>
        {t('noEntity')}
      </div>
    )
  }

  const state = rawState || 'unknown'
  const isOpen = state === 'open'
  const isClosed = state === 'closed'
  const isOpening = state === 'opening'
  const isClosing = state === 'closing'
  const isMoving = isOpening || isClosing
  const isUnavailable = state === 'unavailable' || state === 'unknown'
  const label = config.label || friendlyName || t('defaultLabel')

  const stateKey = {
    open: 'stateOpen',
    closed: 'stateClosed',
    opening: 'stateOpening',
    closing: 'stateClosing',
    unavailable: 'stateUnavailable',
    unknown: 'stateUnknown',
  }[state] || 'stateUnknown'

  const accent = isOpen
    ? s.tokens.color.red
    : isClosed
      ? s.tokens.color.green
      : isMoving
        ? s.tokens.color.amber
        : s.tokens.color.muted

  const runAction = async action => {
    if (busyAction || isUnavailable) return
    const service = {
      open: 'open_cover',
      stop: 'stop_cover',
      close: 'close_cover',
    }[action]
    if (!service) return

    setPendingAction('')
    setBusyAction(action)
    try {
      await Promise.resolve(callService('cover', service, config.entityId))
        .catch(error => console.error('[PortoneGarage]', error))
    } finally {
      window.setTimeout(() => setBusyAction(''), 450)
    }
  }

  const requestAction = action => {
    const needsConfirmation =
      (action === 'open' && config.confirmOpen) ||
      (action === 'close' && config.confirmClose)

    if (needsConfirmation) {
      setPendingAction(action)
      return
    }
    runAction(action)
  }

  const controlStyle = (active, disabled) => ({
    ...s.buttonGhost,
    width: '100%',
    minWidth: 0,
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: active ? accent : s.tokens.color.primary,
    borderColor: active ? accent : s.tokens.color.border,
    background: active ? `color-mix(in srgb, ${accent} 12%, transparent)` : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.tokens.space.xs,
  })

  const confirmation = pendingAction
    ? createPortal(
        <div
          onClick={() => setPendingAction('')}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99996,
            background: 'var(--overlay-scrim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: s.tokens.space.xl,
            pointerEvents: 'auto',
          }}
        >
          <div
            onClick={event => event.stopPropagation()}
            style={{
              ...s.card,
              width: '100%',
              maxWidth: 420,
              display: 'flex',
              flexDirection: 'column',
              gap: s.tokens.space.lg,
            }}
          >
            <div style={{ ...s.row, alignItems: 'flex-start' }}>
              <TriangleAlert size={22} color={s.tokens.color.amber} />
              <div style={{ ...s.grow, minWidth: 0 }}>
                <div style={s.title}>
                  {t(pendingAction === 'open' ? 'confirmOpenTitle' : 'confirmCloseTitle')}
                </div>
                <div style={{ ...s.body, color: s.tokens.color.muted, marginTop: s.tokens.space.xs }}>
                  {t(pendingAction === 'open' ? 'confirmOpenText' : 'confirmCloseText')}
                </div>
              </div>
            </div>
            <div style={{ ...s.row, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button style={s.buttonGhost} onClick={() => setPendingAction('')}>
                {t('cancel')}
              </button>
              <button style={s.buttonPrimary} onClick={() => runAction(pendingAction)}>
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>,
        getOverlayRoot(),
      )
    : null

  const MainIcon = isClosed ? DoorClosed : DoorOpen

  return (
    <>
      <div
        style={{
          ...s.card,
          width: '100%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: s.tokens.space.lg,
          background: `color-mix(in srgb, ${accent} 8%, var(--bg-card))`,
          borderColor: `color-mix(in srgb, ${accent} 48%, ${s.tokens.color.border})`,
          boxShadow: `0 0 0 1px color-mix(in srgb, ${accent} 16%, transparent)`,
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
              {isMoving
                ? <Loader2 size={26} style={{ animation: 'spin 1.2s linear infinite' }} />
                : <MainIcon size={26} />}
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
                {t(stateKey)}
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
              opacity: isUnavailable ? 0.45 : 1,
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: s.tokens.space.sm }}>
          <button
            type="button"
            onClick={() => requestAction('open')}
            disabled={busyAction !== '' || isUnavailable || isOpen || isOpening}
            style={controlStyle(isOpen || isOpening, busyAction !== '' || isUnavailable || isOpen || isOpening)}
          >
            {busyAction === 'open' ? <Loader2 size={16} /> : <ArrowUp size={16} />}
            <span>{t('open')}</span>
          </button>
          <button
            type="button"
            onClick={() => runAction('stop')}
            disabled={busyAction !== '' || isUnavailable || !isMoving}
            style={controlStyle(isMoving, busyAction !== '' || isUnavailable || !isMoving)}
          >
            {busyAction === 'stop' ? <Loader2 size={16} /> : <Octagon size={16} />}
            <span>{t('stop')}</span>
          </button>
          <button
            type="button"
            onClick={() => requestAction('close')}
            disabled={busyAction !== '' || isUnavailable || isClosed || isClosing}
            style={controlStyle(isClosed || isClosing, busyAction !== '' || isUnavailable || isClosed || isClosing)}
          >
            {busyAction === 'close' ? <Loader2 size={16} /> : <ArrowDown size={16} />}
            <span>{t('close')}</span>
          </button>
        </div>
      </div>
      {confirmation}
    </>
  )
}
