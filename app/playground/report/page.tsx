'use client'

import Loading from "@/components/Loading";
import ReportItem from "@/components/ReportItem"
import { useRiskPreferenceStore } from "@/providers/RiskPreferenceProvider";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const {
    riskPreference
  } = useRiskPreferenceStore((state) => state);
  console.log(riskPreference)
  const [islLoading, setIsLoading] = useState(true);
  const protocols = [{
    name: 'USDC/WETH',
    link: 'https://pancakeswap.finance/liquidity/pool/eth/0x1ac1A8FEaAEa1900C4166dEeed0C11cC10669D36',
    chain: 'Ethereum',
    contract: '0x1ac1A8FEaAEa1900C4166dEeed0C11cC10669D36',
    risk: 'Low',
    auditStatus: 'warning',
    auditReport: {
      summary: 'There is no critical issue found in this protocol.',
      details: 'There is no critical issue found in this'
    },
    trendData: [51.1, 51.4, 55.1, 53.3, 73.8, 68.7]
  },
  {
    name: 'WETH/USDT',
    link: 'https://pancakeswap.finance/liquidity/pool/eth/0xaCDb27b266142223e1e676841C1E809255Fc6d07',
    chain: 'Ethereum',
    contract: '0xaCDb27b266142223e1e676841C1E809255Fc6d07',
    risk: 'High',
    auditStatus: 'danger',
    auditReport: {
      summary: 'There are some critical issues found in this protocol.',
      details: 'There are some critical issues found in this'
    },
    trendData: [25.2, 37.1, 41.2, 18, 33.9, 49.1]
  },
  {
    name: 'CAKE/WETH',
    link: 'https://pancakeswap.finance/liquidity/pool/eth/0x517F451b0A9E1b87Dc0Ae98A05Ee033C3310F046',
    chain: 'Ethereum',
    contract: '0x517F451b0A9E1b87Dc0Ae98A05Ee033C3310F046',
    risk: 'Stable',
    auditStatus: 'success',
    auditReport: {
      summary: 'There is no critical issue found in this protocol.',
      details: 'There is no critical issue found in this'
    },
    trendData: [56.5, 82.1, 88.7, 70.1, 53.4, 85.1]
  }, {
    name: 'WETH/USDT',
    link: 'https://pancakeswap.finance/liquidity/pool/arb/0x389938CF14Be379217570D8e4619E51fBDafaa21',
    chain: 'Arbitrum',
    contract: '0x389938CF14Be379217570D8e4619E51fBDafaa21',
    risk: 'Middle',
    auditStatus: 'warning',
    auditReport: {
      summary: 'There is no critical issue found in this protocol.',
      details: 'There is no critical issue found in this'
    },
    trendData: [40.1, 62.2, 69.5, 36.4, 45.2, 32.5]
  }]

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 4000);
  })

  if (islLoading) {
    return <div className='h-full flex items-center'><Loading text="Analyzing..." /></div>
  }
  return <div className="space-y-5 p-5">
    <h1 className="text-3xl font-bold">Final Report</h1>
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Protocols</h2>
      <div className="space-y-5 divide-y-2">
        {
          protocols.map((protocol) => (<ReportItem key={protocol.contract} protocol={protocol} />))
        }
      </div>
    </div>
  </div>
}