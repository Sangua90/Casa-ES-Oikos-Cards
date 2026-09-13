export const DEVICE_DEFINITIONS = [
  { key: 'boiler', name: 'Boiler', entity: 'sensor.boiler_power', threshold: 3, icon: 'thermometer' },
  { key: 'dryer', name: 'Asciugatrice', entity: 'sensor.asciugatrice_samsung_power', threshold: 7, icon: 'wind' },
  { key: 'dishwasher', name: 'Lavastoviglie', entity: 'sensor.presa_lavastoviglie_power', threshold: 10, icon: 'droplets' },
  { key: 'oven', name: 'Forno', entity: 'sensor.presa_forno_power', threshold: 30, icon: 'flame' },
  { key: 'climaP1', name: 'Climatizzatore P1', entity: 'sensor.clima_p1_power', threshold: 20, icon: 'wind' },
  { key: 'climaPt', name: 'Climatizzatore PT', entity: 'sensor.salotto_clima_salotto_potenza', threshold: 14, icon: 'wind' },
  { key: 'climaEster', name: 'Clima Ester', entity: 'sensor.clima_ester_power', threshold: 10, icon: 'wind' },
  { key: 'dehumidifier', name: 'Deumidificatore', entity: 'sensor.presa_deumidificatore_power', threshold: 3, icon: 'droplets' },
  { key: 'island', name: 'Isola', entity: 'sensor.isola_power', threshold: 5, icon: 'plug' },
  { key: 'washer', name: 'Lavatrice Samsung', entity: 'sensor.lavatrice_samsung_power', threshold: 15, icon: 'washer' },
  { key: 'washerDryer', name: 'Lavasciuga Samsung', entity: 'sensor.lava_asciuga_samsung_power', threshold: 16, icon: 'washer' },
  { key: 'microwave', name: 'Microonde', entity: 'sensor.microonde_power', threshold: 2, icon: 'zap' },
  { key: 'pc', name: 'PC', entity: 'sensor.pc_power', threshold: 10, icon: 'monitor' },
  { key: 'hob', name: 'Piano Cottura', entity: 'sensor.piano_cottura_power_ab', threshold: 5, icon: 'flame' },
  { key: 'pellet', name: 'Stufa Pellet', entity: 'sensor.stufa_pellet_power', threshold: 10, icon: 'flame' },
  { key: 'heater', name: 'Stufetta', entity: 'sensor.stufetta_power', threshold: 5, icon: 'thermometer' },
  { key: 'spa', name: 'SPA', entity: 'sensor.giardino_meter_spa_potenza', threshold: 8, icon: 'waves' },
]

export const DEFAULT_CONFIG = DEVICE_DEFINITIONS.reduce((config, device) => ({
  ...config,
  [`${device.key}Entity`]: device.entity,
  [`${device.key}Label`]: device.name,
  [`${device.key}Threshold`]: device.threshold,
}), {
  totalEntity: 'sensor.inverter_solarman_load_power',
  totalLabel: 'Consumo Casa',
  visibilityMode: 'active',
})
