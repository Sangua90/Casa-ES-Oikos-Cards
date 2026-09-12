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
  days: 7,
  compact: false,
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
    const range = Number(config.days) || 7
    const parsed = parseEvents(sensorEvents)
    const source = parsed.length
      ? parsed
      : calendarSummary && calendarStart
        ? [{ summary: calendarSummary, start: calendarStart }]
        : []

    const events = source
      .map(event => ({
        summary: event.summary || event.message || '',
        start: localDate(event.start || event.start_time),
      }))
      .filter(event => event.summary && event.start)
      .map(event => ({ ...event, offset: dayDiff(event.start, today) }))
      .filter(event => event.offset >= 0 && event.offset < range)
      .sort((a, b) => a.start.getTime() - b.start.getTime() || a.summary.localeCompare(b.summary))

    const groups = []
    for (const event of events) {
      const key = `${event.start.getFullYear()}-${event.start.getMonth()}-${event.start.getDate()}`
      let group = groups.find(item => item.key === key)
      if (!group) {
        group = { key, date: event.start, offset: event.offset, events: [] }
        groups.push(group)
      }
      group.events.push(event)
    }
    return { groups, limited: !parsed.length && Boolean(calendarSummary && calendarStart) }
  }, [calendarStart, calendarSummary, config.days, sensorEvents, sensorState])

  const dayLabel = group => {
    if (group.offset === 0) return t('today')
    if (group.offset === 1) return t('tomorrow')
    return group.date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
  }

  const countdown = offset => {
    if (offset === 0) return t('today')
    if (offset === 1) return t('tomorrow')
    return t('inDays', { count: offset })
  }

  const first = model.groups[0]?.events[0]
  const firstVisual = getVisual(wasteKind(first?.summary), s.tokens)
  const FirstIcon = firstVisual.Icon
  const gap = config.compact ? s.tokens.space.sm : s.tokens.space.md

  return (
    <div
      style={{
        ...s.card,
        width: '100%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap,
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
        {model.groups.length > 0 && <span style={s.badgeGreen}>{countdown(model.groups[0].offset)}</span>}
      </button>

      {first ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: s.tokens.space.md,
            padding: s.tokens.space.md,
            borderRadius: s.tokens.radius.md,
            background: `color-mix(in srgb, ${firstVisual.color} 12%, var(--bg-card))`,
            border: `1px solid color-mix(in srgb, ${firstVisual.color} 35%, ${s.tokens.color.border})`,
          }}
        >
          <span
            style={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: s.tokens.radius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: firstVisual.color,
              background: `color-mix(in srgb, ${firstVisual.color} 14%, transparent)`,
            }}
          >
            <FirstIcon size={24} />
          </span>
          <span style={{ ...s.grow, minWidth: 0 }}>
            <span style={{ ...s.label, display: 'block', marginBottom: s.tokens.space.xs, color: firstVisual.color }}>
              {t('nextCollection')}
            </span>
            <span style={{ ...s.title, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {model.groups[0].events.map(event => event.summary).join(' · ')}
            </span>
          </span>
        </div>
      ) : (
        <div style={{ ...s.colTight, color: s.tokens.color.muted }}>
          <span style={s.title}>{t('noCollections')}</span>
          <span style={s.hint}>{t('noCollectionsHint')}</span>
        </div>
      )}

      {model.groups.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: s.tokens.space.xs }}>
          {model.groups.map(group => (
            <div key={group.key} style={{ ...s.rowBetween, gap: s.tokens.space.sm, minWidth: 0 }}>
              <span style={{ ...s.hint, minWidth: 72, color: group.offset < 2 ? s.tokens.color.primary : s.tokens.color.muted }}>
                {dayLabel(group)}
              </span>
              <span style={{ ...s.row, justifyContent: 'flex-end', flexWrap: 'wrap', minWidth: 0 }}>
                {group.events.map((event, index) => {
                  const visual = getVisual(wasteKind(event.summary), s.tokens)
                  const Icon = visual.Icon
                  return (
                    <span
                      key={`${event.summary}-${index}`}
                      style={{
                        ...s.badgeGreen,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: s.tokens.space.xs,
                        color: visual.color,
                        background: `color-mix(in srgb, ${visual.color} 11%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${visual.color} 28%, transparent)`,
                      }}
                    >
                      <Icon size={12} />
                      {event.summary}
                    </span>
                  )
                })}
              </span>
            </div>
          ))}
        </div>
      )}

      {model.limited && <span style={{ ...s.hint, color: s.tokens.color.amber }}>{t('limitedMode')}</span>}
    </div>
  )
}
