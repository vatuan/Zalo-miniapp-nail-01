const COMBINING_DIACRITICS = /[̀-ͯ]/g

export function normalizeText(value: string): string {
  return value.toLowerCase().normalize('NFD').replace(COMBINING_DIACRITICS, '').replace(/đ/g, 'd')
}
