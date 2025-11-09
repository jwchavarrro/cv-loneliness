/**
 * @fileoverview Types for the application
 * @description Types for the application
 */

/**
 * @enum Language
 * @description Enum for the language
 */
export enum Enum_APP_LANGUAGE {
  ES = 'es',
  EN = 'en'
}
/**
 * @type Language
 * @description Type for the language
 */
export type Type_APP_LANGUAGE = Enum_APP_LANGUAGE.ES | Enum_APP_LANGUAGE.EN;