import { useEffect, useRef } from "react";
import * as echarts from 'echarts';
import { levelColorStyle, RiskLevel } from "../Dashboard";
import Link from "next/link";

export default function ReportItem({
  protocol
}: {
  protocol: {
    name: string;
    chain: string;
    contract: string;
    risk: string;
    auditStatus: string;
    link: string;
    auditReport: {
      summary: string;
      details: string;
    },
    trendData: number[];
  }
}) {
  const auditStatusStyle = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
  }
  const recommendType = ['Recommend', 'Not Recommend', 'May Have a Try']
  const getRecommendType = (auditStatus: string) => {
    if (auditStatus === 'success') {
      return recommendType[0]
    } else if (auditStatus === 'danger') {
      return recommendType[1]
    } else {
      return recommendType[2]
    }
  }

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
          ['1', '2', '3', '4', '5', '6'],
          protocol.trendData
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
      ]
    });
  }, []);
  return <div className="">
    <div className="grid grid-cols-4 w-full py-4">
      <div>
        <h3 className="text-lg font-bold">Protocol Name</h3>
        <Link href={protocol.link} target="_blank" className="text-cyan-500 font-medium">{protocol.chain} - {protocol.name}</Link>
      </div>
      <div>
        <h3 className="text-lg font-bold">Contract</h3>
        <div>{protocol.contract}</div>
      </div>
      <div>
        <h3 className="text-lg font-bold">Protocol Risk</h3>
        <div className={`py-[2px] px-[4px] rounded-md inline-block ${levelColorStyle[protocol.risk as RiskLevel]}`}>
          {protocol.risk}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold">Audit Recommendation</h3>
        <div className={`py-[2px] px-[4px] rounded-md inline-block ${auditStatusStyle[protocol.auditStatus as keyof typeof auditStatusStyle]}`}>
          {getRecommendType(protocol.auditStatus)}
        </div>
      </div>
    </div>
    <div className="space-y-5">
      <h3 className="text-2xl">Audit Report</h3>
      <div className="space-y-5">
        <h4 className="text-xl">Summary</h4>
        <p>{protocol.auditReport.summary}</p>
        <h4 className="text-xl">Details</h4>
        <p>{protocol.auditReport.details}</p>
      </div>

      <div>
        <h3 className="text-2xl">Investment Trend</h3>
        <div className='min-h-[400px]' ref={chartRef}></div>
      </div>
    </div>
  </div>
}