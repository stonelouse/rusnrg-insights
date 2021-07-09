export interface Co2EmissionPrognosisRecord {
  readonly minutes5UTC: Date;
  readonly co2Emission: number;
  readonly priceArea: 'DK1' | 'DK2';
}

export type Co2EmissionPrognosisRecords = readonly Co2EmissionPrognosisRecord[];