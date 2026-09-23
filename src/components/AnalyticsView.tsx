import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Globe,
  PieChart,
} from 'lucide-react';
import { AnalyticsData } from '../types/crm';

interface AnalyticsViewProps {
  analytics: AnalyticsData | null;
  isLoading: boolean;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics, isLoading }) => {
  if (isLoading || !analytics) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center text-xs text-neutral-400">
        Loading pipeline analytics...
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Inbound Leads',
      value: analytics.totalLeads,
      isMoney: false,
      subtext: `${analytics.newLeads} uncontacted leads`,
      trend: '+18% this month',
    },
    {
      label: 'Client Conversion Rate',
      value: `${analytics.conversionRate}%`,
      isMoney: false,
      subtext: `${analytics.convertedLeads} won deals`,
      trend: 'Goal: >20%',
    },
    {
      label: 'Total Pipeline Value',
      value: `$${analytics.totalPipelineValue.toLocaleString()}`,
      isMoney: true,
      subtext: `Avg deal $${analytics.totalLeads > 0 ? Math.round(analytics.totalPipelineValue / analytics.totalLeads).toLocaleString() : 0}`,
      trend: 'Across active stages',
    },
    {
      label: 'Closed Revenue Won',
      value: `$${analytics.convertedPipelineValue.toLocaleString()}`,
      isMoney: true,
      subtext: `${analytics.convertedLeads} converted clients`,
      trend: '100% contract signed',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-100/60 p-6 md:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
            Pipeline Analytics & Lead Performance
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time conversion metrics calculated from active and historical inbound leads.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs space-y-1.5"
            >
              <div className="text-[11px] font-medium text-neutral-500 tracking-tight">
                {card.label}
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
                {card.value}
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-100">
                <span>{card.subtext}</span>
                <span className="text-emerald-600 font-medium">{card.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Column Grid: Sources & Status Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Status Distribution Funnel (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-neutral-900">
                Lead Pipeline Funnel & Stage Distribution
              </h3>
              <span className="text-[11px] font-mono text-neutral-400">
                {analytics.totalLeads} total records
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {analytics.leadsByStatus.map((item) => {
                const pct =
                  analytics.totalLeads > 0
                    ? Math.round((item.count / analytics.totalLeads) * 100)
                    : 0;

                const colorClass =
                  item.status === 'new'
                    ? 'bg-amber-500'
                    : item.status === 'contacted'
                    ? 'bg-sky-500'
                    : item.status === 'in_progress'
                    ? 'bg-indigo-500'
                    : item.status === 'converted'
                    ? 'bg-emerald-500'
                    : 'bg-neutral-400';

                return (
                  <div key={item.status} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-700 font-medium">{item.label}</span>
                      <div className="flex items-center gap-2 font-mono tabular-nums text-[11px]">
                        <span className="font-semibold text-neutral-900">{item.count}</span>
                        <span className="text-neutral-400">({pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inbound Source Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-semibold text-neutral-900">
              Acquisition Sources
            </h3>

            <div className="space-y-3 pt-1">
              {analytics.leadsBySource.map((sourceItem) => (
                <div key={sourceItem.source} className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-100 last:border-0">
                  <div className="min-w-0 pr-2">
                    <div className="font-medium text-neutral-800 truncate">{sourceItem.source}</div>
                  </div>
                  <div className="flex items-center gap-2 font-mono tabular-nums text-[11px] shrink-0">
                    <span className="font-semibold text-neutral-900">{sourceItem.count}</span>
                    <span className="text-neutral-400 w-10 text-right">({sourceItem.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Feed: Recent Actions Across CRM */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-semibold text-neutral-900">
            Recent Audit & Follow-Up Log
          </h3>

          <div className="divide-y divide-neutral-100 max-h-64 overflow-y-auto">
            {analytics.recentActivities.map((act, i) => (
              <div key={i} className="py-2.5 flex items-start justify-between text-xs gap-4">
                <div className="min-w-0">
                  <span className="font-semibold text-neutral-900 mr-2">
                    {act.leadName}
                  </span>
                  <span className="text-neutral-600">{act.event.description}</span>
                  {act.event.actor && (
                    <span className="text-neutral-400 ml-1.5">by {act.event.actor}</span>
                  )}
                </div>
                <span className="font-mono tabular-nums text-[11px] text-neutral-400 shrink-0">
                  {new Date(act.event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
