import {
  EntityField,
  Field,
  PackageSection,
  Section,
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
}

export default function CasaEsRaccoltaSettings({ cardId }) {
  const { t } = useT('card-casa-es-raccolta')
  const [config, setConfig] = useCardConfig(cardId, DEFAULT, { version: 1 })
  const pkg = usePackageInstaller({ name: 'casa_es_raccolta_differenziata', yaml: TPL })
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
      </Section>
    </div>
  )
}
