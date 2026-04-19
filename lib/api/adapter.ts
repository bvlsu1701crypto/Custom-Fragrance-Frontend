import {
  ACTIVITY_LEVELS,
  CONCENTRATION_OPTIONS,
  OCCASIONS,
  SCENT_FAMILIES,
  SEASONS,
  SILLAGE_OPTIONS,
  TIME_OPTIONS,
  WEATHER_CONDITIONS,
  type BiometricData,
  type EnvironmentData,
  type RecommendationOutput,
  type UserPreferences,
} from '@/lib/types'
import { lookupCity } from './cities'
import {
  type Agent1Input,
  type FinalOutput,
} from './schemas'
import {
  toZhActivity,
  toZhConcentration,
  toZhOccasion,
  toZhScent,
  toZhSillage,
  toZhTimeOfDay,
} from './translations'

function uniq<T>(values: T[]): T[] {
  return Array.from(new Set(values))
}

function pickZhName<T extends { id: string; nameZh: string }>(list: T[], id: string): string {
  return list.find((x) => x.id === id)?.nameZh ?? id
}

function pickDisplayName<T extends { id: string; name: string; nameZh: string }>(list: T[], id: string, lang: string): string {
  const item = list.find((x) => x.id === id)
  if (!item) return id
  return lang === 'zh' ? item.nameZh : item.name
}

function findByZh<T extends { nameZh: string }>(list: T[], zh: string | undefined): T | undefined {
  if (!zh) return undefined
  return list.find((x) => x.nameZh === zh)
}

export function toAgent1Input(
  preferences: UserPreferences,
  biometrics: BiometricData,
  environment: EnvironmentData,
): Agent1Input {
  const coords = lookupCity(environment.city)
  if (!coords) {
    throw new Error(`Unrecognized city: ${environment.city}`)
  }

  const scentPreference = uniq(preferences.scent_preference.map(toZhScent))
  if (scentPreference.length === 0) {
    scentPreference.push('花香')
  }

  // longevity / budget_level 已从问卷删除，这里固定默认值以满足后端 Literal 校验
  return {
    user_text: preferences.free_description || '',
    watch_data: {
      body_temperature: biometrics.body_temperature,
      latitude: coords.lat,
      longitude: coords.lng,
      heart_rate: biometrics.heart_rate,
      activity_level: toZhActivity(biometrics.activity_level),
    },
    questionnaire: {
      occasion: toZhOccasion(preferences.occasion || 'daily'),
      scent_preference: scentPreference,
      longevity: '4-6小时',
      sillage: toZhSillage(preferences.sillage || 'close'),
      concentration: toZhConcentration(preferences.concentration || 'edp'),
      budget_level: '中档',
      avoided_notes: uniq(preferences.avoided_notes.map(toZhScent)),
      time_of_day: toZhTimeOfDay(preferences.time_of_day || 'morning'),
    },
    // weather 省略：后端按 watch_data.latitude/longitude 自动获取
  }
}

export function fromFinalOutput(
  final: FinalOutput,
  preferences: UserPreferences,
  biometrics: BiometricData,
  environment: EnvironmentData,
  language: string = 'zh',
): RecommendationOutput {
  const coords = lookupCity(environment.city)
  const snap = final.weather_snapshot

  const conditionZh = snap?.condition ?? '—'
  const seasonZh    = snap?.season ?? '—'

  const pick = <T extends { id: string; name: string; nameZh: string }>(list: T[], id: string) =>
    pickDisplayName(list, id, language)

  const conditionItem = findByZh(WEATHER_CONDITIONS, conditionZh)
  const seasonItem = findByZh(SEASONS, seasonZh)

  return {
    occasion: pick(OCCASIONS, preferences.occasion || 'daily'),
    scent_preference: preferences.scent_preference.map((id) => pick(SCENT_FAMILIES, id)),
    sillage: pick(SILLAGE_OPTIONS, preferences.sillage || 'close'),
    concentration: pick(CONCENTRATION_OPTIONS, preferences.concentration || 'edp'),
    avoided_notes: preferences.avoided_notes.map((id) => pick(SCENT_FAMILIES, id)),
    time_of_day: pick(TIME_OPTIONS, preferences.time_of_day || 'morning'),
    body_temperature: biometrics.body_temperature,
    heart_rate: biometrics.heart_rate,
    activity_level: pick(ACTIVITY_LEVELS, biometrics.activity_level),
    temperature: snap?.temperature ?? 0,
    humidity: snap?.humidity ?? 0,
    condition: conditionItem ? (language === 'zh' ? conditionItem.nameZh : conditionItem.name) : conditionZh,
    season: seasonItem ? (language === 'zh' ? seasonItem.nameZh : seasonItem.name) : seasonZh,
    city: language === 'zh' ? (snap?.city || coords?.zhName || environment.city) : environment.city,
    analysis_summary: language === 'zh'
      ? (final.selection_rationale || final.scent_description)
      : (final.selection_rationale_en || final.selection_rationale || final.scent_description),
    fragrance_notes: {
      topNotes: final.formula.top_notes.map((n) => language === 'zh' ? n.name : (n.name_en || n.name)),
      middleNotes: final.formula.middle_notes.map((n) => language === 'zh' ? n.name : (n.name_en || n.name)),
      baseNotes: final.formula.base_notes.map((n) => language === 'zh' ? n.name : (n.name_en || n.name)),
    },
    fragrance_description: {
      zh: final.scent_description,
      en: final.scent_description_en,
    },
    similar_perfumes: (final.similar_perfumes ?? []).map((p) => ({
      name: language === 'zh' ? (p.name || p.name_en || '') : (p.name_en || p.name || ''),
      brand: language === 'zh' ? (p.brand || p.brand_en || '') : (p.brand_en || p.brand || ''),
      reason: language === 'zh' ? (p.reason || p.reason_en || '') : (p.reason_en || p.reason || ''),
    })),
  }
}
