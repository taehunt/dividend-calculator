"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PulseHistoryPoint, PulseLang } from "@/lib/income-pulse";

type Props = {
  history: PulseHistoryPoint[];
  lang: PulseLang;
  title: string;
  subtitle: string;
  emptyHint: string;
  scoreLabel: string;
};

function formatTick(date: string, lang: PulseLang): string {
  try {
    const d = new Date(`${date}T00:00:00Z`);
    return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return date;
  }
}

export default function PulseHistoryChart({
  history,
  lang,
  title,
  subtitle,
  emptyHint,
  scoreLabel,
}: Props) {
  const points = history
    .filter((h) => h.score != null)
    .map((h) => ({
      date: h.date,
      score: h.score as number,
      label: formatTick(h.date, lang),
    }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-8">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500 mt-1 mb-5">{subtitle}</p>

      {points.length < 2 ? (
        <div className="h-[220px] flex items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-200 px-6 text-center">
          <p className="text-sm text-slate-500 leading-relaxed max-w-md">
            {emptyHint}
            {points.length === 1 && (
              <span className="block mt-2 font-semibold text-indigo-600">
                {points[0].label}: {points[0].score}
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={points}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="pulseScoreFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={8}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)",
                }}
                formatter={(value: any) => [Number(value), scoreLabel]}
                labelFormatter={(_label: any, payload: any) => {
                  const row = payload?.[0]?.payload as
                    | { date?: string; label?: string }
                    | undefined;
                  return row?.date || row?.label || "";
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
                fill="url(#pulseScoreFill)"
                activeDot={{ r: 5, strokeWidth: 0, fill: "#4f46e5" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
