import {
  EntityField,
  Field,
  NumberField,
  Section,
  TextField,
  registerCardTranslations,
  useCardConfig,
  useT,
} from '@oikos/sdk'
import it from './i18n/it.json'
import en from './i18n/en.json'

registerCardTranslations('card-casa-es-consumo-casa', { it, en })

const DEFAULT = {
  entityId: 'sensor.inverter_solarman_load_power',
  label: 'Consumo Casa',
  warningThreshold: 3000,
  dangerThreshold: 5500,
}

export default function CasaEsConsumoCasaSettings({ cardId }) {
  const { t } = useT('card-casa-es-consumo-casa')
  const [config, setConfig] = useCardConfig(cardId, DEFAULT, { version: 1 })
  const set = (key, value) => setConfig(previous => ({ ...previous, [key]: value }))

  return (
    <Section title={t('settings')}>
      <Field label={t('entity')} hint={t('entityHint')}>
        <EntityField field="entityId" config={config} setConfig={setConfig} filterDomain="sensor" />
      </Field>
      <Field label={t('label')}><TextField value={config.label} onChange={value => set('label', value)} /></Field>
      <Field label={t('warning')} hint={t('warningHint')}>
        <NumberField value={config.warningThreshold} onChange={value => set('warningThreshold', value)} min={0} max={20000} step={100} />
      </Field>
      <Field label={t('danger')} hint={t('dangerHint')}>
        <NumberField value={config.dangerThreshold} onChange={value => set('dangerThreshold', value)} min={0} max={20000} step={100} />
      </Field>
    </Section>
  )
}
