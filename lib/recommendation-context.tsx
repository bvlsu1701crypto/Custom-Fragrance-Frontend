"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
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

const RecommendationContext = createContext<RecommendationContextValue | null>(null)

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<RecommendationOutput | null>(null)
  const [raw, setRaw] = useState<FinalOutput | null>(null)
  const [inputs, setInputs] = useState<RecommendationInputs | null>(null)

  const setRecommendation = useCallback(
    (r: RecommendationOutput, rawOutput: FinalOutput, ins: RecommendationInputs) => {
      setResult(r)
      setRaw(rawOutput)
      setInputs(ins)
    },
    [],
  )

  const clear = useCallback(() => {
    setResult(null)
    setRaw(null)
    setInputs(null)
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
