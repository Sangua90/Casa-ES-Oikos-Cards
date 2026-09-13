import {
  EntityField,
  Field,
  Pills,
  Section,
  TextField,
  registerCardTranslations,
  useCardConfig,
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

export default function CasaEsVentoleStufettaSettings({ cardId }) {
  const { t } = useT('card-casa-es-ventole-stufetta')
  const [config, setConfig] = useCardConfig(cardId, DEFAULT, { version: 2 })
  const set = (key, value) => setConfig(previous => ({ ...previous, [key]: value }))
  const typeOptions = [
    { value: 'fan', label: t('typeFan') },
    { value: 'heater', label: t('typeHeater') },
  ]

  return (
    <Section title={t('settingsTitle')}>
      <Field label={t('typeLabel')} hint={t('typeHint')}>
        <Pills options={typeOptions} value={config.deviceType} onChange={value => set('deviceType', value)} />
      </Field>

      {config.deviceType === 'heater' ? (
        <>
          <Field label={t('heaterOnScriptLabel')} hint={t('heaterOnScriptHint')}>
            <EntityField field="heaterOnScript" config={config} setConfig={setConfig} filterDomain="script" />
          </Field>
          <Field label={t('heaterOffScriptLabel')} hint={t('heaterOffScriptHint')}>
            <EntityField field="heaterOffScript" config={config} setConfig={setConfig} filterDomain="script" />
          </Field>
          <Field label={t('heaterStateLabel')} hint={t('heaterStateHint')}>
            <EntityField field="heaterStateEntity" config={config} setConfig={setConfig} />
          </Field>
        </>
      ) : (
        <Field label={t('entityLabel')} hint={t('entityHint')}>
          <EntityField field="entityId" config={config} setConfig={setConfig} filterDomain="switch" />
        </Field>
      )}

      <Field label={t('labelLabel')} hint={t('labelHint')}>
        <TextField value={config.label} onChange={value => set('label', value)} placeholder={t('labelPlaceholder')} />
      </Field>
    </Section>
  )
}
