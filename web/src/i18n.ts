// i18n configuration for FreelanceBot
const translations = {
    en: { appName: 'FreelanceBot', description: 'Generates winning personalized freelance proposals' },
    de: { appName: 'FreelanceBot', description: 'Generates winning personalized freelance proposals (DE)' },
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const supportedLocales = Object.keys(translations) as Locale[]

export function t(key: keyof typeof translations.en, locale: Locale = defaultLocale): string {
    return translations[locale]?.[key] ?? translations.en[key] ?? key
}

export default translations
