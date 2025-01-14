'use client';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '../ui/button';

export type RiskLevel = 'Low' | 'Middle' | 'High' | 'Stable';

export const levelColorStyle = {
  Low: 'bg-green-100 text-green-800',
  Middle: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
  Stable: 'bg-blue-100 text-blue-800',
}

export default function Dashboard({
  back
}: {
  back: () => void
}) {
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const protocols = [{
    name: 'USDC/WETH',
    link: 'https://pancakeswap.finance/liquidity/pool/eth/0x1ac1A8FEaAEa1900C4166dEeed0C11cC10669D36',
    chain: 'Ethereum',
    contract: '0x1ac1A8FEaAEa1900C4166dEeed0C11cC10669D36',
    risk: 'Low',
  },
  {
    name: 'WETH/USDT',
    link: 'https://pancakeswap.finance/liquidity/pool/eth/0xaCDb27b266142223e1e676841C1E809255Fc6d07',
    chain: 'Ethereum',
    contract: '0xaCDb27b266142223e1e676841C1E809255Fc6d07',
    risk: 'High',
  },
  {
    name: 'CAKE/WETH',
    link: 'https://pancakeswap.finance/liquidity/pool/eth/0x517F451b0A9E1b87Dc0Ae98A05Ee033C3310F046',
    chain: 'Ethereum',
    contract: '0x517F451b0A9E1b87Dc0Ae98A05Ee033C3310F046',
    risk: 'Stable',
  }, {
    name: 'WETH/USDT',
    link: 'https://pancakeswap.finance/liquidity/pool/arb/0x389938CF14Be379217570D8e4619E51fBDafaa21',
    chain: 'Arbitrum',
    contract: '0x389938CF14Be379217570D8e4619E51fBDafaa21',
    risk: 'Middle',
  }]
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    chart.setOption({
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['product', '1', '2', '3', '4', '5', '6'],
          ['Stable', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
          ['Low Risk', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
          ['Middle Risk', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
          ['High Risk', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '6',
            tooltip: '6'
          }
        }
      ]
    });
  }, []);

  return <div className='block p-5 space-y-5'>
    <h2 className='text-2xl font-bold'>Your investment be like</h2>
    <div className='min-h-[600px] h-1/2' ref={chartRef}></div>
    <h2 className='text-2xl font-bold'>Proposal Protocols</h2>
    <div className='space-y-5'>
      {
        protocols.map((protocol) => {
          return (
            <div className="flex items-center w-full space-x-2 rounded-md p-2 border-2" key={protocol.contract}>
              <Checkbox id={protocol.contract} onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedProtocols([...selectedProtocols, protocol.contract]);
                } else {
                  setSelectedProtocols(selectedProtocols.filter((item) => item !== protocol.contract));
                }
              }} />
              <label
                htmlFor={protocol.contract}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {protocol.name}
              </label>
              <div><a className='text-cyan-600' href={protocol.link}>Website</a></div>
              <div>{protocol.chain}</div>
              <div className={`py-[2px] px-[4px] rounded-md ${levelColorStyle[protocol.risk as RiskLevel]}`}>
                {protocol.risk}
              </div>
            </div>
          )
        })
      }
    </div>
    <div className='mt-5 space-x-5'>
      <Button disabled={!selectedProtocols.length}>Generate Your Intention</Button>
      <Button onClick={back} variant='outline'>Re-analysis</Button>
    </div>
  </div>
}