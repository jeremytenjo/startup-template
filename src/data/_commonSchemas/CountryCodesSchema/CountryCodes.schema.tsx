type CountryCodesSchema =
  | 'all' // All
  | 'us' // United States
  | 'ca' // Canada
  | 'mx' // Mexico
  | 'gb' // United Kingdom
  | 'fr' // France
  | 'de' // Germany
  | 'it' // Italy
  | 'es' // Spain
  | 'pt' // Portugal
  | 'jp' // Japan
  | 'cn' // China
  | 'kr' // South Korea
  | 'in' // India
  | 'au' // Australia
  | 'nz' // New Zealand
  | 'br' // Brazil
  | 'ar' // Argentina
  | 'cl' // Chile
  | 'co' // Colombia
  | 'pe' // Peru
  | 've' // Venezuela
  | 'ec' // Ecuador
  | 'bo' // Bolivia
  | 'py' // Paraguay
  | 'uy' // Uruguay
  | 'cr' // Costa Rica
  | 'pa' // Panama

export default CountryCodesSchema

export const allCountryCodes: {
  label: string
  value: CountryCodesSchema
}[] = [
  { label: 'All', value: 'all' },
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Mexico', value: 'mx' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'France', value: 'fr' },
  { label: 'Germany', value: 'de' },
  { label: 'Italy', value: 'it' },
  { label: 'Spain', value: 'es' },
  { label: 'Portugal', value: 'pt' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' },
  { label: 'South Korea', value: 'kr' },
  { label: 'India', value: 'in' },
  { label: 'Australia', value: 'au' },
  { label: 'New Zealand', value: 'nz' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Chile', value: 'cl' },
  { label: 'Colombia', value: 'co' },
  { label: 'Peru', value: 'pe' },
  { label: 'Venezuela', value: 've' },
  { label: 'Ecuador', value: 'ec' },
  { label: 'Bolivia', value: 'bo' },
  { label: 'Paraguay', value: 'py' },
  { label: 'Uruguay', value: 'uy' },
  { label: 'Costa Rica', value: 'cr' },
  { label: 'Panama', value: 'pa' },
]
