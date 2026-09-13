import { useMemo } from 'react'
import {
  CalendarDays,
  CircleDashed,
  GlassWater,
  Leaf,
  Newspaper,
  Recycle,
  Trash2,
} from 'lucide-react'
import {
  registerCardTranslations,
  useCardConfig,
  useDashboard,
  useStyles,
  useT,
} from '@oikos/sdk'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-raccolta', { it, en })

const DEFAULT = {
  calendarId: 'calendar.raccolta_rifiuti',
  sensorId: 'sensor.casa_es_raccolta_differenziata',
}

function parseEvents(value) {
  if (Array.isArray(value)) return value
  if (typeof value !== 'string' || !value.trim()) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function localDate(value) {
  if (!value) return null
  const plain = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (plain) return new Date(Number(plain[1]), Number(plain[2]) - 1, Number(plain[3]), 12)
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function dayStart(value) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
}

function dayDiff(date, today) {
  return Math.round((dayStart(date).getTime() - today.getTime()) / 86400000)
}

function splitWasteSummary(summary) {
  return String(summary || '')
    .split(/\s*(?:[·•,;\/]|\n)\s*/u)
    .map(value => value.trim())
    .filter(Boolean)
}

function wasteKind(summary) {
  const value = String(summary || '').toLocaleLowerCase('it')
  if (value.includes('umido') || value.includes('organico')) return 'organic'
  if (value.includes('carta') || value.includes('cartone')) return 'paper'
  if (value.includes('vetro')) return 'glass'
  if (value.includes('plastica') || value.includes('metall')) return 'plastic'
  if (value.includes('sterpag') || value.includes('verde') || value.includes('sfalc')) return 'green'
  if (value.includes('indiffer') || value.includes('secco')) return 'general'
  return 'other'
}

function getVisual(kind, tokens) {
  const visuals = {
    organic: { Icon: Recycle, color: tokens.color.amber },
    paper: { Icon: Newspaper, color: tokens.color.blue },
    glass: { Icon: GlassWater, color: tokens.color.green },
    plastic: { Icon: Recycle, color: tokens.color.amber },
    green: { Icon: Leaf, color: tokens.color.green },
    general: { Icon: Trash2, color: tokens.color.muted },
    other: { Icon: CircleDashed, color: tokens.color.purple },
  }
  return visuals[kind] || visuals.other
}

export default function CasaEsRaccolta({ cardId = 'casa-es-raccolta' }) {
  const s = useStyles()
  const { t } = useT('card-casa-es-raccolta')
  const { getState, getAttr, openMoreInfo } = useDashboard()
  const [config] = useCardConfig(cardId, DEFAULT, { version: 1 })

  const sensorState = config.sensorId ? getState(config.sensorId) : null
  const sensorEvents = config.sensorId ? getAttr(config.sensorId, 'events') : null
  const calendarSummary = config.calendarId ? getAttr(config.calendarId, 'message') : null
  const calendarStart = config.calendarId ? getAttr(config.calendarId, 'start_time') : null

  const model = useMemo(() => {
    const today = dayStart(new Date())
    const parsed = parseEvents(sensorEvents)
    const source = parsed.length
      ? parsed
      : calendarSummary && calendarStart
        ? [{ summary: calendarSummary, start: calendarStart }]
        : []

    const events = source
      .flatMap(event => {
        const start = localDate(event.start || event.start_time)
        return splitWasteSummary(event.summary || event.message)
          .map(summary => ({ summary, start }))
      })
      .filter(event => event.summary && event.start)
      .map(event => ({ ...event, offset: dayDiff(event.start, today) }))
      .filter(event => event.offset >= 1 && event.offset <= 15)
      .sort((a, b) => a.start.getTime() - b.start.getTime() || a.summary.localeCompare(b.summary))

    const groups = []
    for (const event of events) {
      const key = `${event.start.getFullYear()}-${event.start.getMonth()}-${event.start.getDate()}`
      let group = groups.find(item => item.key === key)
      if (!group) {
        group = { key, date: event.start, offset: event.offset, events: [] }
        groups.push(group)
      }
      const normalised = event.summary.toLocaleLowerCase('it')
      if (!group.events.some(item => item.summary.toLocaleLowerCase('it') === normalised)) {
        group.events.push(event)
      }
    }

    return {
      tonight: groups.find(group => group.offset === 1) || null,
      upcoming: groups.filter(group => group.offset > 1).slice(0, 1),
      limited: !parsed.length && Boolean(calendarSummary && calendarStart),
    }
  }, [calendarStart, calendarSummary, sensorEvents, sensorState])

  const collectionDate = date => date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return (
    <div
      style={{
        ...s.card,
        width: '100%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: s.tokens.space.md,
      }}
    >
      <button
        type="button"
        onClick={() => config.calendarId && openMoreInfo(config.calendarId)}
        style={{ ...s.iconButton, ...s.rowBetween, width: '100%', minWidth: 0, color: s.tokens.color.primary }}
      >
        <span style={{ ...s.row, minWidth: 0 }}>
          <CalendarDays size={16} color={s.tokens.color.green} />
          <span style={{ ...s.title, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {t('title')}
          </span>
        </span>
        {model.tonight && <span style={s.badgeGreen}>{t('tonight')}</span>}
      </button>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: s.tokens.space.md,
          padding: s.tokens.space.md,
          borderRadius: s.tokens.radius.lg,
          background: 'var(--bg-card)',
          border: `1px solid ${s.tokens.color.border}`,
          minWidth: 0,
        }}
      >
        <span style={s.label}>{t('exposeTonight')}</span>

        {model.tonight ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(132px, 1fr))',
              gap: s.tokens.space.sm,
              minWidth: 0,
            }}
          >
            {model.tonight.events.map((event, index) => {
              const visual = getVisual(wasteKind(event.summary), s.tokens)
              const Icon = visual.Icon
              return (
                <div
                  key={`${event.summary}-${index}`}
                  style={{
                    ...s.row,
                    minWidth: 0,
                    padding: s.tokens.space.md,
                    borderRadius: s.tokens.radius.md,
                    color: visual.color,
                    background: `color-mix(in srgb, ${visual.color} 12%, transparent)`,
                  }}
                >
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: s.tokens.radius.md,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `color-mix(in srgb, ${visual.color} 14%, transparent)`,
                    }}
                  >
                    <Icon size={22} />
                  </span>
                  <span style={{ ...s.title, color: visual.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {event.summary}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <span style={{ ...s.body, color: s.tokens.color.muted }}>{t('nothingTonight')}</span>
        )}

        {model.upcoming.length > 0 && (
          <div
            aria-label={t('upcomingCollections')}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(104px, 1fr))',
              gap: s.tokens.space.sm,
              paddingTop: s.tokens.space.md,
              borderTop: `1px solid ${s.tokens.color.border}`,
              minWidth: 0,
            }}
          >
            {model.upcoming.map(group => (
              <div key={group.key} style={{ ...s.colTight, minWidth: 0 }}>
                <span style={{ ...s.hint, textTransform: 'capitalize' }}>{collectionDate(group.date)}</span>
                <span style={{ ...s.row, flexWrap: 'wrap', gap: s.tokens.space.xs, minWidth: 0 }}>
                  {group.events.map((event, index) => {
                    const visual = getVisual(wasteKind(event.summary), s.tokens)
                    return (
                      <span
                        key={`${event.summary}-${index}`}
                        style={{
                          ...s.badgeGreen,
                          color: visual.color,
                          background: `color-mix(in srgb, ${visual.color} 12%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${visual.color} 28%, transparent)`,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                      >
                        {event.summary}
                      </span>
                    )
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {model.limited && <span style={{ ...s.hint, color: s.tokens.color.amber }}>{t('limitedMode')}</span>}
    </div>
  )
}
