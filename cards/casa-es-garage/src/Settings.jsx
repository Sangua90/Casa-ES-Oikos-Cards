import {
  EntityField,
  Field,
  Section,
  SettingsRow,
  TextField,
  Toggle,
  registerCardTranslations,
  useCardConfig,
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

export default function CasaEsGarageSettings({ cardId }) {
  const { t } = useT('card-casa-es-garage')
  const [config, setConfig] = useCardConfig(cardId, DEFAULT, { version: 1 })
  const set = (key, value) => setConfig(previous => ({ ...previous, [key]: value }))

  return (
    <>
      <Section title={t('settingsTitle')}>
        <Field label={t('entityLabel')} hint={t('entityHint')}>
          <EntityField
            field="entityId"
            config={config}
            setConfig={setConfig}
            filterDomain="cover"
          />
        </Field>
        <Field label={t('labelLabel')} hint={t('labelHint')}>
          <TextField
            value={config.label}
            onChange={value => set('label', value)}
            placeholder={t('labelPlaceholder')}
          />
        </Field>
      </Section>
      <Section title={t('safetyTitle')}>
        <SettingsRow label={t('confirmOpenSetting')} hint={t('confirmOpenHint')}>
          <Toggle value={config.confirmOpen} onChange={value => set('confirmOpen', value)} />
        </SettingsRow>
        <SettingsRow label={t('confirmCloseSetting')} hint={t('confirmCloseHint')}>
          <Toggle value={config.confirmClose} onChange={value => set('confirmClose', value)} />
        </SettingsRow>
      </Section>
    </>
  )
}
