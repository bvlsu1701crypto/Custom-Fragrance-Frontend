"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { FinalOutput } from "@/lib/api/schemas"
import type { BiometricData, EnvironmentData, RecommendationOutput, UserPreferences } from "@/lib/types"

export interface RecommendationInputs {
  preferences: UserPreferences
  biometrics: BiometricData
  environment: EnvironmentData
}

interface RecommendationContextValue {
  result: RecommendationOutput | null
  raw: FinalOutput | null
  inputs: RecommendationInputs | null
  setRecommendation: (result: RecommendationOutput, raw: FinalOutput, inputs: RecommendationInputs) => void
  clear: () => void
}

const STORAGE_KEY = "scentmind_recommendation"

function loadFromSession(): { raw: FinalOutput; inputs: RecommendationInputs; result: RecommendationOutput } | null {
  if (typeof window === "undefined") return null
  try {
    const s = sessionStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : null
  } catch {
    return null
  }
}

const RecommendationContext = createContext<RecommendationContextValue | null>(null)

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const cached = loadFromSession()
  const [result, setResult] = useState<RecommendationOutput | null>(cached?.result ?? null)
  const [raw, setRaw] = useState<FinalOutput | null>(cached?.raw ?? null)
  const [inputs, setInputs] = useState<RecommendationInputs | null>(cached?.inputs ?? null)

  const setRecommendation = useCallback(
    (r: RecommendationOutput, rawOutput: FinalOutput, ins: RecommendationInputs) => {
      setResult(r)
      setRaw(rawOutput)
      setInputs(ins)
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ raw: rawOutput, inputs: ins, result: r }))
      } catch {}
    },
    [],
  )

  const clear = useCallback(() => {
    setResult(null)
    setRaw(null)
    setInputs(null)
    try { sessionStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  const value = useMemo<RecommendationContextValue>(
    () => ({ result, raw, inputs, setRecommendation, clear }),
    [result, raw, inputs, setRecommendation, clear],
  )

  return <RecommendationContext.Provider value={value}>{children}</RecommendationContext.Provider>
}

export function useRecommendation(): RecommendationContextValue {
  const ctx = useContext(RecommendationContext)
  if (!ctx) {
    throw new Error("useRecommendation must be used inside <RecommendationProvider>")
  }
  return ctx
}
