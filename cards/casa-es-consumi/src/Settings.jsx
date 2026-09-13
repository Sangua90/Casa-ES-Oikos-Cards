import {
  EntityField,
  Field,
  NumberField,
  Pills,
  Section,
  TextField,
  registerCardTranslations,
  useCardConfig,
  useT,
} from '@oikos/sdk'
import { DEFAULT_CONFIG, DEVICE_DEFINITIONS } from './devices'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-consumi', { it, en })

export default function CasaEsConsumiSettings({ cardId }) {
  const { t } = useT('card-casa-es-consumi')
  const [config, setConfig] = useCardConfig(cardId, DEFAULT_CONFIG, { version: 1 })
  const set = (key, value) => setConfig(previous => ({ ...previous, [key]: value }))
  const visibilityOptions = [
    { value: 'active', label: t('activeOnly') },
    { value: 'all', label: t('showAll') },
  ]

  return (
    <>
      <Section title={t('generalSettings')}>
        <Field label={t('totalEntity')} hint={t('totalEntityHint')}>
          <EntityField field="totalEntity" config={config} setConfig={setConfig} filterDomain="sensor" />
        </Field>
        <Field label={t('totalLabel')}>
          <TextField value={config.totalLabel} onChange={value => set('totalLabel', value)} />
        </Field>
        <Field label={t('visibility')} hint={t('visibilityHint')}>
          <Pills options={visibilityOptions} value={config.visibilityMode} onChange={value => set('visibilityMode', value)} />
        </Field>
      </Section>

      {DEVICE_DEFINITIONS.map(device => {
        const entityField = `${device.key}Entity`
        const labelField = `${device.key}Label`
        const thresholdField = `${device.key}Threshold`
        return (
          <Section key={device.key} title={config[labelField] || device.name}>
            <Field label={t('deviceEntity')}>
              <EntityField field={entityField} config={config} setConfig={setConfig} filterDomain="sensor" />
            </Field>
            <Field label={t('deviceLabel')}>
              <TextField value={config[labelField]} onChange={value => set(labelField, value)} />
            </Field>
            <Field label={t('threshold')} hint={t('thresholdHint')}>
              <NumberField value={config[thresholdField]} onChange={value => set(thresholdField, value)} min={0} max={5000} step={1} />
            </Field>
          </Section>
        )
      })}
    </>
  )
}
