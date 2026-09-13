import {
  EntityField,
  Field,
  MdiIconPicker,
  NumberField,
  Pills,
  Section,
  TextField,
  registerCardTranslations,
  useCardConfig,
  useT,
} from '@oikos/sdk'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-consumo-dispositivo', { it, en })

const DEFAULT = {
  entityId: '',
  label: '',
  icon: '',
  threshold: 5,
  visibilityMode: 'active',
}

export default function CasaEsConsumoDispositivoSettings({ cardId }) {
  const { t } = useT('card-casa-es-consumo-dispositivo')
  const [config, setConfig] = useCardConfig(cardId, DEFAULT, { version: 1 })
  const set = (key, value) => setConfig(previous => ({ ...previous, [key]: value }))
  const visibilityOptions = [
    { value: 'active', label: t('activeOnly') },
    { value: 'always', label: t('always') },
  ]

  return (
    <Section title={t('settings')}>
      <Field label={t('entity')} hint={t('entityHint')}>
        <EntityField field="entityId" config={config} setConfig={setConfig} filterDomain="sensor" />
      </Field>
      <Field label={t('label')} hint={t('labelHint')}>
        <TextField value={config.label} onChange={value => set('label', value)} placeholder={t('automatic')} />
      </Field>
      <Field label={t('icon')} hint={t('iconHint')}>
        <MdiIconPicker value={config.icon} onChange={value => set('icon', value)} />
      </Field>
      <Field label={t('threshold')} hint={t('thresholdHint')}>
        <NumberField value={config.threshold} onChange={value => set('threshold', value)} min={0} max={5000} step={1} />
      </Field>
      <Field label={t('visibility')} hint={t('visibilityHint')}>
        <Pills options={visibilityOptions} value={config.visibilityMode} onChange={value => set('visibilityMode', value)} />
      </Field>
    </Section>
  )
}
