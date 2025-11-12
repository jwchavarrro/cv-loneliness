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

/**
 * @enum SharePlatform
 * @description Enum for the share platform
 */
export enum Enum_SHARE_PLATFORM {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  WHATSAPP = 'whatsapp',
  NATIVE = 'native'
}

/**
 * @type SharePlatform
 * @description Type for the share platform
 */
export type Type_SHARE_PLATFORM = Enum_SHARE_PLATFORM;