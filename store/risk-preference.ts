import { createStore } from 'zustand/vanilla'

export type RiskPreferenceState = {
  riskPreference: string
}

export type RiskPreferenceActions = {
  updateRiskPreference: (risk: string) => void
}

export type RiskPreferenceStore = RiskPreferenceState & RiskPreferenceActions

export const defaultInitState: RiskPreferenceState = {
  riskPreference: '',
}

export const createRiskPreferenceStore = (
  initState: RiskPreferenceState = defaultInitState,
) => {
  return createStore<RiskPreferenceStore>()((set) => ({
    ...initState,
    updateRiskPreference: (risk: string) => set(() => ({ riskPreference: risk })),
  }))
}