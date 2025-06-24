/**
 * Represents the possible values for the language schema.
 * @enum {string}
 */
/**
 * Enum representing the available language codes.
 */
type LanguagesSchema =
  | 'all' // All
  | 'en' // English
  | 'sp' // Spanish
  | 'fr' // French
  | 'de' // German
  | 'it' // Italian
  | 'pt' // Portuguese
  | 'ja' // Japanese
  | 'ko' // Korean

export default LanguagesSchema

export const languagesOptions: {
  label: string
  value: LanguagesSchema
}[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Spanish',
    value: 'sp',
  },
  {
    label: 'French',
    value: 'fr',
  },
  {
    label: 'German',
    value: 'de',
  },
  {
    label: 'Italian',
    value: 'it',
  },
  {
    label: 'Portuguese',
    value: 'pt',
  },
  {
    label: 'Japanese',
    value: 'ja',
  },
  {
    label: 'Korean',
    value: 'ko',
  },
]
