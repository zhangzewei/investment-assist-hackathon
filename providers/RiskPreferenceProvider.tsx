// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type RiskPreferenceStore,
  createRiskPreferenceStore,
} from '@/store/risk-preference'

export type RiskPreferenceStoreApi = ReturnType<typeof createRiskPreferenceStore>

export const RiskPreferenceStoreContext = createContext<RiskPreferenceStoreApi | undefined>(
  undefined,
)

export interface RiskPreferenceStoreProviderProps {
  children: ReactNode
}

export const RiskPreferenceStoreProvider = ({
  children,
}: RiskPreferenceStoreProviderProps) => {
  const storeRef = useRef<RiskPreferenceStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createRiskPreferenceStore()
  }

  return (
    <RiskPreferenceStoreContext.Provider value={storeRef.current}>
      {children}
    </RiskPreferenceStoreContext.Provider>
  )
}

export const useRiskPreferenceStore = <T,>(
  selector: (store: RiskPreferenceStore) => T,
): T => {
  const riskPreferenceStoreContext = useContext(RiskPreferenceStoreContext)

  if (!riskPreferenceStoreContext) {
    throw new Error(`useRiskPreferenceStore must be used within RiskPreferenceProvider`)
  }

  return useStore(riskPreferenceStoreContext, selector)
}
