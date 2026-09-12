import {
  EntityField,
  Field,
  PackageSection,
  Pills,
  Section,
  SettingsRow,
  Toggle,
  registerCardTranslations,
  useCardConfig,
  usePackageInstaller,
  useT,
} from '@oikos/sdk'
import TPL from '../template.yaml?raw'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-raccolta', { it, en })

const DEFAULT = {
  calendarId: 'calendar.raccolta_rifiuti',
  sensorId: 'sensor.casa_es_raccolta_differenziata',
  days: 7,
  compact: false,
}

export default function CasaEsRaccoltaSettings({ cardId }) {
  const { t } = useT('card-casa-es-raccolta')
  const [config, setConfig] = useCardConfig(cardId, DEFAULT, { version: 1 })
  const pkg = usePackageInstaller({ name: 'casa_es_raccolta_differenziata', yaml: TPL })
  const set = (key, value) => setConfig(previous => ({ ...previous, [key]: value }))
  const dayOptions = [
    { value: 3, label: t('days3') },
    { value: 7, label: t('days7') },
    { value: 14, label: t('days14') },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <PackageSection
        pkg={pkg}
        label={t('packageLabel')}
        description={t('packageDescription')}
      />
      <Section title={t('settingsTitle')}>
        <Field label={t('calendarLabel')} hint={t('calendarHint')}>
          <EntityField
            field="calendarId"
            config={config}
            setConfig={setConfig}
            filterDomain="calendar"
          />
        </Field>
        <Field label={t('sensorLabel')} hint={t('sensorHint')}>
          <EntityField
            field="sensorId"
            config={config}
            setConfig={setConfig}
            filterDomain="sensor"
          />
        </Field>
        <Field label={t('rangeLabel')}>
          <Pills options={dayOptions} value={config.days} onChange={value => set('days', value)} />
        </Field>
        <SettingsRow label={t('compactLabel')} hint={t('compactHint')}>
          <Toggle value={config.compact} onChange={value => set('compact', value)} />
        </SettingsRow>
      </Section>
    </div>
  )
}
